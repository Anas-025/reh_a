import { Grid, Paper, styled } from "@mui/material";
import { useEffect } from "react";
import { chartMaker } from "utils/ExtendedUtils";
import style from "./more.module.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function More() {
  useEffect(() => {
    (async function () {
      chartMaker(
        "ageChart",
        "line",
        [
          ["2010", "2011", "2012", "2013", "2014", "2015", "2016"],
          [10, 20, 15, 25, 22, 30, 28],
        ],
        "Age",
        "Age of patient"
      );

      chartMaker(
        "genderChart",
        "pie",
        [
          ["male", "female"],
          [10, 20],
          ["purple", "pink"],
        ],
        "Gender",
        "Gender of patient"
      );

      chartMaker(
        "occupationChart",
        "bar",
        [
          ["self", "doctor", "family", "other"],
          [10, 20, 30, 5],
        ],
        "Occupation",
        "Occuation of patient"
      );

      chartMaker(
        "referredByChart",
        "doughnut",
        [
          ["self", "doctor", "family"],
          [10, 20, 30],
        ],
        "Reffered by",
        "Reference"
      );

      chartMaker(
        "medicalHistoryChart",
        "doughnut",
        [
          ["diabetes", "bp", "thyroid", "other"],
          [10, 20, 30, 5],
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
          [10, 20, 30, 5],
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
          [10, 20, 30],
          ["#62B6CB", "#BEE9E8", "#CAE9FF"],
        ],
        "Family History",
        "Family History of patient"
      );

      chartMaker(
        "surgicalHistoryChart",
        "bar",
        [["diabetes", "paralysis", "other"], [10, 20, 30], ["#F4A5AE"]],
        "Surgical History",
        "Surgical History of patient"
      );

      chartMaker(
        "otherComplaintsChart",
        "line",
        [["diabetes", "paralysis", "other"], [10, 20, 5], ["#2F9C95"]],
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
