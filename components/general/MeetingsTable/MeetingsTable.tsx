import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { withAdmin } from "ProtectedRoutes/AdminRoute";
import { GPCContext } from "Providers/GPC_Provider";
import { useMeeting } from "components/MeetingContext";
import { createMeeting, endMeeting, getToken } from "controllers/meeting";
import { arrayUnion, doc, getDoc, increment, updateDoc, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import * as React from "react";
import { useContext, useMemo, useState } from "react";
import { db } from "../../firebase/firebase-config";
import DetailsDialog from "../TableComponents/DetailsDialog";
import EnhancedTableHead from "../TableComponents/EnhancedTableHead";
import EnhancedTableToolbar from "../TableComponents/EnhancedTableToolbar";
import { Data, HeadCell, Order } from "../TableComponents/Table.interface";
import { getComparator, stableSort } from "../TableComponents/Table.utils";


const headCells: readonly HeadCell[] = [
  {
    id: "displayName",
    numeric: false,
    disablePadding: false,
    label: "Patient Name",
    align: "left",
  },
  {
    // @ts-ignore
    id: "patientDetails",
    numeric: true,
    disablePadding: false,
    label: "Patient Details",
    align: "right",
  },
  {
    // @ts-ignore
    id: "meeting status",
    numeric: true,
    disablePadding: false,
    label: "Meeting Status",
    align: "right",
  },
  {
    id: "slot",
    numeric: true,
    disablePadding: false,
    label: "Meeting Time",
    align: "right",
  },
  {
    id: "meetingId",
    numeric: true,
    disablePadding: false,
    label: "Meeting ID",
    align: "right",
  },
  {
    // @ts-ignore
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
    align: "center",
  },
];

function MeetingsTable(props: { rows: Data[] }) {
  const [rows, setRows] = useState<Data[]>(props.rows);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("displayName");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [detialsCase, setDetailsCase] = useState<Data | null>(null);
  const router = useRouter();
  const { updateToken, updateMeetingId } = useMeeting();
  const [filter, setFilter] = useState<"all" | "success" | "scheduled">("all"); // ["all", "success", "failed"]
  const { showDialog, showBackdrop, showError, closeBackdrop } = useContext(GPCContext);

  const handleMeetingSuccess = async (
    userId: string,
    meetingId: string,
    createdAt: string,
    caseId: string
  ) => {
    const meetingRef = doc(db, "Meetings", meetingId);
    const userRef = doc(db, "Userdata", userId);
    const caseRef = doc(db, "Userdata", userId, "cases", caseId);
    

    try {
      const batch = writeBatch(db);
      batch.update(meetingRef, { status: "success" });
      batch.update(caseRef, { meeting: null, meetingId: "" });
      batch.update(userRef, {
        meetings: arrayUnion(meetingId),
        sessionCount: increment(-1),
      });

      await batch.commit();
      // end the meeting
      const token = await getToken();
      const res = await endMeeting({ roomId: meetingId, token });
      updateToken(token);
      setRows((prev) =>
        prev.map((row) => {
          if (row.meetingId === meetingId) {
            return { ...row, status: "success" };
          }
          return row;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleDialog = () => {
    setOpen(!open);
  };

  //   console.log(rows.map((meeting) => meeting))

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      //   @ts-ignore
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleDetailsClick = (event: React.MouseEvent<unknown>, row: any) => {
    setDetailsCase(row);
    handleToggleDialog();
  };

  const handleJoinMeetClick = async (meetingId: string) => {
    try {
      showBackdrop("Joining meeting");
      const meetingSnap = await getDoc(doc(db, "Meetings", meetingId));

      if (!meetingSnap.exists()) {
        throw new Error("Meeting does not exist");
      }
      const meetingData = meetingSnap.data();
      if (meetingData.status === "success") {
        throw new Error("Meeting has already ended");
      }

      const date = new Date();
      const meetingDate = new Date(meetingData.meeting.seconds * 1000);
      // @ts-ignore
      const diff = Math.abs(date - meetingDate) / (1000 * 60 * 60);
      if (diff > 3) {
        throw new Error(
          "You can only join a meeting 3 hours before it starts"
        );
      }

      const activeMeetingId = meetingData?.activeMeetingId;
      if (activeMeetingId) {
        router.push(`/meeting?meetId=${activeMeetingId}`);
      } else {
        const token = await getToken();
        const _meetingId = await createMeeting({ token });
        updateToken(token);
        updateMeetingId(_meetingId);
        const meetingRef = doc(db, "Meetings", meetingId);
        console.log(meetingId, _meetingId)
        await updateDoc(meetingRef, {
          activeMeetingId: _meetingId,
        });
        router.push(`/meeting?meetId=${_meetingId}`);
      }
    } catch (err: any) {
      showError(err.message);
      closeBackdrop();
      console.log(err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          title="Meetings"
          filter={filter}
          setFilter={setFilter}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              //   @ts-ignore
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                if (filter === "success" && row.status !== "success")
                  return null;
                if (filter === "scheduled" && row.status !== "scheduled")
                  return null;

                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.meetingId}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.patientName}
                    </TableCell>
                    <TableCell align="right">
                      {/* @ts-ignore */}
                      <Button
                        sx={{
                          backgroundColor: "black!important",
                          color: "white",
                        }}
                        onClick={(e) => handleDetailsClick(e, row)}
                      >
                        Details
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {row.status === "success" ? (
                        <span style={{ color: "green" }}>Success</span>
                      ) : row.status === "failed" ? (
                        <span style={{ color: "red" }}>Failed</span>
                      ) : (
                        <span style={{ color: "orange" }}>Scheduled</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.meeting === null ? (
                        <span style={{ color: "red" }}>null</span>
                      ) : (
                        /* @ts-ignore */
                        new Date(row.meeting.seconds * 1000).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            year: "numeric",
                            minute: "numeric",
                            hour12: true,
                            timeZone: "Asia/Kolkata",
                          }
                        )
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.meetingId === "" ? (
                        <span style={{ color: "red" }}>null</span>
                      ) : (
                        row.meetingId
                      )}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={
                        row.status === "success"
                          ? {}
                          : {
                              display: "flex",
                              gap: "1rem",
                              flexWrap: "wrap",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                            }
                      }
                    >
                      {row.status === "success" ? (
                        <span>none</span>
                      ) : (
                        <>
                          <Button
                            sx={{
                              backgroundColor: "rgb(250 184 0)!important",
                              color: "white",
                              minWidth: "40%",
                            }}
                            onClick={()=>handleJoinMeetClick(row.meetingId)}
                          >
                            Join&nbsp;Meet
                          </Button>
                          {/* @ts-ignore */}
                          <Button
                            onClick={() =>
                              showDialog(
                                "Are you sure you want to mark this meeting as successfull?",
                                "This will change the status of the meeting to successfull and will deduct one meeting from the user's account.",
                                "No",
                                "Yes",
                                () =>
                                  handleMeetingSuccess(
                                    row.userId,
                                    row.meetingId,
                                    row.createdAt,
                                    row.caseId
                                  )
                              )
                            }
                            sx={{
                              backgroundColor: "rgb(250 184 0)!important",
                              color: "white",
                              minWidth: "40%",
                            }}
                          >
                            Success
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        sx={{ color: "black" }}
        label="Dense padding"
      />

      <DetailsDialog
        open={open}
        handleToggleDialog={handleToggleDialog}
        detailsCase={detialsCase}
      />
    </Box>
  );
}

export default withAdmin(MeetingsTable);
