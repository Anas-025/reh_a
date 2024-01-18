import { Input } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase-config";
import Cell from "./Cell/Cell";
import style from "./SlotGrid.module.css";

function SlotGrid({
  slotMatrix,
  daysOfWeek,
  dateArray,
}: {
  slotMatrix: Array<Array<number>>;
  daysOfWeek: string[];
  dateArray: string[];
}) {
  // create a timings array with 30mins difference starting from 8:00 to 20:00
  const timings = [
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];
  const [slots, setSlots] = useState<Array<Array<number>>>(slotMatrix);
  const [setterSlots, setSetterSlots] =
    useState<Array<Array<number>>>(slotMatrix);
  const [blocks, setBlocks] = useState([...Array(7)].map((e) => Array(0)));
  const [open, setOpen] = useState(false);

  const slotGenerator = () => {
    const newBlocks = [...Array(7)].map((e) => Array(0));
    slots.map((day, dayIndex) => {
      let block: any = [];
      day.map((slot, index) => {
        if (slot === 1) {
          block.push(index);
          if (index === day.length - 1) {
            newBlocks[dayIndex].push(
              `${timings[block[0]]}-${timings[block[block.length - 1] + 1]} 1`
            );
            setBlocks(newBlocks);
            block = [];
          }
        } else if (slot === 0) {
          if (block.length > 0) {
            newBlocks[dayIndex].push(
              `${timings[block[0]]}-${timings[block[block.length - 1] + 1]} 1`
            );
            setBlocks(newBlocks);
            block = [];
          }
        }
      });
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    // save the blocks elements to the Slots collection in the database with id as dateArray elements
    dateArray.map(async (date, index) => {
      const docRef = doc(db, "Slots", `${date}`);
      const docSnap = await getDoc(docRef);
      if (!docSnap.data()) {
        await setDoc(docRef, {
          slots: blocks[index],
        });
      } else {
        await updateDoc(docRef, {
          slots: blocks[index],
        });
      }
    });
    setSetterSlots([...slots]);
    setOpen(false);
  };

  return (
    <>
      <div className={style.table_container}>
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ borderRadius: "5px 0 0 0" }}>Time</th>
              {daysOfWeek.map((day, index) => (
                <th key={`daysOfWeek-${index}`}>{day}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {timings.map((time, column) => {
              if (column === timings.length - 1) {
                return;
              }

              return (
                <tr key={`column-${column}`}>
                  <td>{time}</td>
                  {daysOfWeek.map((day, row) => (
                    <Cell
                      key={`row-${row}`}
                      row={row}
                      column={column}
                      slots={slots}
                      setSlots={setSlots}
                      setterSlots={setterSlots}
                    />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={style.button_container}>
        <Button
          onClick={slotGenerator}
          className={style.button}
          style={{
            backgroundColor: "black",
            color: "white",
            marginTop: "1rem",
            padding: "0.5rem 2rem",
          }}
        >
          Save
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        {/* create a form using FormControl with blocks array to show the slots and besides every slot there will be a delete button seperated with day of the week  */}
        {/* Also create a input field with number to decide the second parameter of the array sting */}
        <DialogTitle>Number of Meetings Per Slot</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormGroup>
              {blocks.map((block, index) => {
                if (block.length > 0) {
                  return (
                    <div key={`Item-${index}`}>
                      <DialogTitle>{daysOfWeek[index]}:</DialogTitle>

                      <List style={{ marginLeft: "1rem" }}>
                        {block.map((slot, i) => {
                          const startTime = slot.split(" ")[0].split("-")[0];
                          const endTime = slot.split(" ")[0].split("-")[1];
                          return (
                            <ListItem
                              key={`ListItem-${index}${i}`}
                              disablePadding
                            >
                              <ListItemButton>
                                <ListItemIcon>{i + 1}.</ListItemIcon>
                                <ListItemText
                                  primary={`${startTime} to ${endTime}`}
                                  sx={{ paddingRight: "8rem" }}
                                />
                              </ListItemButton>
                              <Input
                                type="number"
                                defaultValue={parseInt(slot.split(" ")[1])}
                                style={{
                                  width: "5rem",
                                  paddingLeft: "0.8rem",
                                  marginLeft: "1rem",
                                }}
                                onChange={(e) => {
                                  if (parseInt(e.target.value) <= 0) {
                                    e.target.value = "1";
                                  }
                                  block[
                                    i
                                  ] = `${startTime}-${endTime} ${e.target.value}`;
                                  setBlocks([...blocks]);
                                }}
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </div>
                  );
                  {
                    /* <Button className={style.delete} onClick={() => {
                  block.splice(index, 1);
                  setBlocks([...blocks]);
                }}>X</Button> */
                  }
                }
              })}
            </FormGroup>

            <Button onClick={handleSave}>Save</Button>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SlotGrid;
