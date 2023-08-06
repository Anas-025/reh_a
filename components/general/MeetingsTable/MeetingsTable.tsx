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
import { useMeeting } from "components/MeetingContext";
import { endMeeting, getToken } from "controllers/meeting";
import { Timestamp, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import * as React from "react";
import { useMemo, useState } from "react";
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
  },
  {
    // @ts-ignore
    id: "patientDetails",
    numeric: true,
    disablePadding: false,
    label: "Patient Details",
  },
  {
    id: "slot",
    numeric: true,
    disablePadding: false,
    label: "Meeting Time",
  },
  {
    id: "meetingId",
    numeric: true,
    disablePadding: false,
    label: "Meeting ID",
  },
  {
    // @ts-ignore
    id: "actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
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
  const { updateToken } = useMeeting();
  const [triggerRowChange, setTriggerRowChange] = useState(false);

  const handleMeetingSuccess = async (
    userId: string,
    meetingId: string,
    createdAt: string
  ) => {
    const data = {
      createdAt: createdAt,
      successAt: Timestamp.now(),
      meetingId: meetingId,
    };
    const docRef = doc(db, "Userdata", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const docData = docSnap.data();
      // if meetings field exists in docData append the cuurent timestamp in it if not create and append
      await setDoc(
        docRef,
        {
          meetings: docData.meetings ? [...docData.meetings, data] : [data],
          activeMeetingId: null,
        },
        { merge: true }
      );

      // await setDoc(docRef, { activeMeetingId: null }, { merge: true });
      await deleteDoc(doc(db, "Meetings", meetingId));
      rows.splice(
        rows.findIndex((row) => row.meetingId === meetingId),
        1
      );
      setRows([...rows]);

      // end the meeting
      const token = await getToken();
      const res = await endMeeting({ roomId: meetingId, token });
      updateToken(token);
    } else {
      console.log("No such document!");
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

  return (
    <Box sx={{ width: "100%", marginInline: "1rem" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar message="Meetings" />
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
                      {row.displayName}
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
                    <TableCell align="right">{row.slot}</TableCell>
                    <TableCell align="right">{row.meetingId}</TableCell>
                    <TableCell align="right">
                      <Button
                        sx={{
                          backgroundColor: "rgb(250 184 0)!important",
                          color: "white",
                          marginRight: "1rem",
                        }}
                        onClick={() =>
                          router.push(`/meeting?meetId=${row.meetingId}`)
                        }
                      >
                        Join Meet
                      </Button>
                      {/* @ts-ignore */}
                      <Button
                        onClick={() =>
                          handleMeetingSuccess(
                            row.userId,
                            row.meetingId,
                            row.createdAt
                          )
                        }
                        sx={{
                          backgroundColor: "rgb(250 184 0)!important",
                          color: "white",
                        }}
                      >
                        Success
                      </Button>
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
