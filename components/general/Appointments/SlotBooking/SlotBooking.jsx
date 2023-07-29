import { Button } from "@mui/material";
import Badge from "@mui/material/Badge";
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { GPCContext } from "Providers/GPC_Provider";
import { db } from "components/firebase/firebase-config.js";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import Image from "next/image";
import { useContext, useState } from "react";
import { timeMiner } from "utils/ExtendedUtils";
import calander from "../../../../public/calander.png";
import { useUser } from "../../../UserContext";
import slotcss from "./SlotBooking.module.css";

export default function SlotBooking({
  id,
  setSlot,
}) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [date, setDate] = useState("");
  const [allSlots, setAllSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { showSnackbar, showDialog, showError } = useContext(GPCContext);

  const handleChange = async (e) => {
    setLoading(true);
    if (e == null) {
      setDate("");
      return;
    }
    const currdate = `${e.$D}-${e.$M + 1}-${e.$y}`;
    setDate(currdate);
    const refDoc = doc(db, "Slots", currdate);
    const findDoc = await getDoc(refDoc);
    if (findDoc.exists()) {
      const slots = findDoc.data();
      setAllSlots(slots.slots);
      setLoading(false);
    } else {
      console.log("Document not found");
      setAllSlots(["#"]);
      setLoading(false);
    }
  };


  const handleClick = async () => {

    const slotRef = doc(db, "Slots", date);
    const slotsDoc = await getDoc(slotRef);
    const caseRef = doc(db, `Userdata/${user.uid}/cases`, id);
    const caseData = await getDoc(caseRef);

    // find index of selected slot in slots array
    const index = slotsDoc.data().slots.findIndex((slot) => slot.split(" ")[0] === selectedSlot)
    if(index === -1) {
      setSlot(false);
      setOpen(false);
      showError("Sorry, the slot you selected is not available. Please try again");
      return
    }
    if(caseData.data().slot) {
      setSlot(false);
      setOpen(false);
      showError("Sorry, you have already booked a slot for this case. Please cancel the previous slot to book a new one");
      return
    }
    
    // update the slot in the slots array
    const slots = slotsDoc.data().slots;
    const noOfSlotsLeft = slots[index].split(" ")[1]-1;
    if(noOfSlotsLeft === 0) {
      slots.splice(index, 1)
    } else{
      slots[index] = `${selectedSlot} ${noOfSlotsLeft}`;
    }

    // create a batch and update the slots array and the case status
    const batch = writeBatch(db);
    batch.update(slotRef, { slots })
    batch.set(caseRef, { slot: `${date} ${selectedSlot}` }, { merge: true })
    try{
      await batch.commit()
      setOpen(false);
      setSlot(false);
      showSnackbar("Slot booked successfully");
    }
    catch(err) {
      console.log(err)
      setSlot(false);
      setOpen(false);
      showError("Sorry, something went wrong. Please try again");
      return
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    showDialog(
      "Are you sure you want to book this slot?",
      `Slot will be scheduled on ${date} between ${slot} ${timeMiner(slot)}`,
      "No",
      "Yes",
      handleClick
    );
  };



  return (
    <>
      <div
        style={{ height: "100%", width: "100%", color: "black" }}
        className={slotcss.container}
      >
        <div
          style={{
            justifyContent: "center",
          }}
          className={slotcss.innerContainer}
        >
          <div className={slotcss.left}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                className={slotcss.horizontalCalander}
                orientation="landscape"
                onChange={handleChange}
              />
              <StaticDatePicker
                className={slotcss.varticalCalander}
                sx={{ width: "150px" }}
                orientation="portrait"
                onChange={handleChange}
              />
            </LocalizationProvider>
          </div>
          <div className={slotcss.right}>
            <div className={slotcss.title}>Select slots</div>
            {loading && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </div>
            )}
            {allSlots.length === 0 && loading === false && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  width={250}
                  height={250}
                  style={{ marginTop: "2rem" }}
                  src={calander}
                />
                <div
                  style={{ color: "rgb(135, 135, 135)", fontSize: "1.5rem" }}
                >
                  Select slot
                </div>
              </div>
            )}
            {allSlots.length !== 0 &&
              allSlots[0] === "#" &&
              loading === false && (
                <div className={slotcss.noSlots}>No slots found</div>
              )}
            {allSlots.length !== 0 &&
              allSlots[0] !== "#" &&
              loading === false && (
                <div className={slotcss.slotBox}>
                  {allSlots.map((slot, index) => {
                    let slotArr = slot.split(" ");
                    return (
                      <Badge
                        className={slotcss.slotBtn}
                        key={`slotBtn_${index}`}
                        badgeContent={slotArr[1]}
                        color="primary"
                      >
                        <Button
                          onClick={() => {
                            handleSlotClick(slotArr[0]);
                          }}
                          style={{
                            width: "100%",
                            border: "1px solid blue",
                            borderRadius: "10px",
                            fontSize: "1.2rem",
                          }}
                        >
                          {slotArr[0]}
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}