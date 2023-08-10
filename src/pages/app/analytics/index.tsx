import { Grid, Paper, styled } from "@mui/material";
import { Chart, ChartTypeRegistry } from "chart.js/auto";
import React, { use, useEffect } from "react";
import style from "./more.module.css";
import { _DeepPartialArray } from "chart.js/dist/types/utils";
import { chartMaker } from "utils/ExtendedUtils";
import { collection, doc, getDocs, query } from "firebase/firestore";
import { db } from "components/general/firebase-config";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ChartDataTypes {
  age: { [key: number]: number };
  gender: number[];
  referredBy: number[];
  occupation: number[];
  surgicalHistory: number[];
  otherComplaints: number[];
  medicalHistory: number[];
  personalHistory: number[];
  familyHistory: number[];
}

function More() {
  useEffect(() => {
    (async function () {
      const allUserData = await getDocs(query(collection(db, "Userdata")));

      let chartDataObject: ChartDataTypes = {
        age: {},
        gender: [0, 0],
        referredBy: [0, 0, 0],
        occupation: [0, 0, 0, 0],
        surgicalHistory: [0, 0, 0, 0],
        otherComplaints: [0, 0, 0, 0, 0, 0, 0],
        medicalHistory: [0, 0, 0, 0],
        personalHistory: [0, 0, 0],
        familyHistory: [0, 0, 0],
      };

      allUserData.forEach((userData) => {
        const currentUserData = userData.data();

        if (currentUserData.age) {
          if (chartDataObject.age[parseInt(currentUserData.age)])
            chartDataObject.age[parseInt(currentUserData.age)]++;
          else chartDataObject.age[parseInt(currentUserData.age)] = 1;
        }

        if (currentUserData.gender) {
          if (currentUserData.gender === "male") {
            chartDataObject.gender[0]++;
          } else {
            chartDataObject.gender[1]++;
          }
        }

        if (currentUserData.referredBy) {
          switch (currentUserData.referredBy) {
            case "self":
              chartDataObject.referredBy[0]++;
              break;
            case "doctor":
              chartDataObject.referredBy[1]++;
              break;
            case "family":
              chartDataObject.referredBy[2]++;
              break;
          }
        }

        if (currentUserData.occupation) {
          switch (currentUserData.occupation) {
            case "service":
              chartDataObject.occupation[0]++;
              break;
            case "retired":
              chartDataObject.occupation[1]++;
              break;
            case "business":
              chartDataObject.occupation[2]++;
              break;
            case "housewife":
              chartDataObject.occupation[3]++;
              break;
          }
        }

        if (currentUserData.surgicalHistory) {
          currentUserData.surgicalHistory.forEach((element: string) => {
            switch (element) {
              case "kneeInjury":
                chartDataObject.surgicalHistory[0]++;
                break;
              case "kneeSurgery":
                chartDataObject.surgicalHistory[1]++;
                break;
              case "kneeReplacement":
                chartDataObject.surgicalHistory[2]++;
                break;
              default:
                chartDataObject.surgicalHistory[3]++;
                break;
            }
          });
        }
        if (currentUserData.otherComplaints) {
          currentUserData.otherComplaints.forEach((element: string) => {
            switch (element) {
              case "tingling":
                chartDataObject.otherComplaints[0]++;
                break;
              case "numbness":
                chartDataObject.otherComplaints[1]++;
                break;
              case "history":
                chartDataObject.otherComplaints[2]++;
                break;
              case "locking":
                chartDataObject.otherComplaints[3]++;
                break;
              case "imbalance":
                chartDataObject.otherComplaints[4]++;
                break;
              case "swelling":
                chartDataObject.otherComplaints[5]++;
                break;
              case "external":
                chartDataObject.otherComplaints[6]++;
                break;
            }
          });
        }

        if (currentUserData.medicalHistory) {
          currentUserData.medicalHistory.forEach((element: string) => {
            switch (element) {
              case "diabetes":
                chartDataObject.medicalHistory[0]++;
                break;
              case "bp":
                chartDataObject.medicalHistory[1]++;
                break;
              case "thyroid":
                chartDataObject.medicalHistory[2]++;
                break;
              default:
                chartDataObject.medicalHistory[3]++;
                break;
            }
          });
        }
        if (currentUserData.personalHistory) {
          currentUserData.personalHistory.forEach((element: string) => {
            switch (element) {
              case "smoking":
                chartDataObject.personalHistory[0]++;
                break;
              case "alcohol":
                chartDataObject.personalHistory[1]++;
                break;
              case "drugs":
                chartDataObject.personalHistory[2]++;
                break;
              default:
                chartDataObject.personalHistory[3]++;
                break;
            }
          });
        }
        if (currentUserData.familyHistory) {
          currentUserData.familyHistory.forEach((element: string) => {
            switch (element) {
              case "diabetes":
                chartDataObject.familyHistory[0]++;
                break;
              case "paralysis":
                chartDataObject.familyHistory[1]++;
                break;
              default:
                chartDataObject.familyHistory[3]++;
                break;
            }
          });
        }
      });

      chartMaker(
        "ageChart",
        "line",
        [Object.keys(chartDataObject.age), Object.values(chartDataObject.age)],
        "Age",
        "Age of patient"
      );

      chartMaker(
        "genderChart",
        "pie",
        [["male", "female"], chartDataObject?.gender, ["purple", "pink"]],
        "Gender",
        "Gender of patient"
      );

      chartMaker(
        "occupationChart",
        "bar",
        [
          ["service", "retired", "business", "housewife"],
          chartDataObject.occupation,
        ],
        "Occupation",
        "Occuation of patient"
      );

      chartMaker(
        "referredByChart",
        "doughnut",
        [["self", "doctor", "family"], chartDataObject.referredBy],
        "Reffered by",
        "Reference"
      );

      chartMaker(
        "medicalHistoryChart",
        "doughnut",
        [
          ["diabetes", "bp", "thyroid", "other"],
          chartDataObject.medicalHistory,
          ["#961D4E", "#A60067", "#6153CC", "#44FFD1"],
        ],
        "Medical History",
        "Medical History of patient"
      );

      chartMaker(
        "personalHistoryChart",
        "pie",
        [
          ["smoking", "alcohol", "drugs", "other"],
          chartDataObject.personalHistory,
          ["#EEE0CB", "#BAA898", "#BE9689", "#C2847A"],
        ],
        "Personal History",
        "Personal History of patient"
      );

      chartMaker(
        "familyHistoryChart",
        "doughnut",
        [
          ["diabetes", "paralysis", "other"],
          chartDataObject.familyHistory,
          ["#62B6CB", "#BEE9E8", "#CAE9FF"],
        ],
        "Family History",
        "Family History of patient"
      );

      chartMaker(
        "surgicalHistoryChart",
        "bar",
        [
          ["kneeInjury", "kneeSurgery", "kneeReplacement"],
          chartDataObject.surgicalHistory,
          ["#F4A5AE"],
        ],
        "Surgical History",
        "Surgical History of patient"
      );

      chartMaker(
        "otherComplaintsChart",
        "line",
        [
          [
            "tingling",
            "numbness",
            "history",
            "locking",
            "imbalance",
            "swelling",
            "external",
          ],
          chartDataObject.otherComplaints,
          ["#2F9C95"],
        ],
        "Other Complaints",
        "Other complaints of patient"
      );
    })();
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={8} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="ageChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={4} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="genderChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={4} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="referredByChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={8} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="occupationChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={6} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="surgicalHistoryChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={6} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="otherComplaintsChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={4} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="medicalHistoryChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={4} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="personalHistoryChart"></canvas>
          </Item>
        </Grid>

        <Grid item lg={4} md={12}>
          <Item className={style.item}>
            <canvas className={style.chart} id="familyHistoryChart"></canvas>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}

export default More;
