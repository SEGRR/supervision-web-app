import React from "react";
import {

  Grid

} from "@mui/material";
import BasicDetails from "../../components/SeatingArrangementComponents/BasicDetails";
import ExamDetails from "../../components/SeatingArrangementComponents/ExamDetails";

export default function SeatingArrangementInfo({ formData, setFormData }) {

  return (
    <div>

      <Grid container spacing={2}>

        <BasicDetails formData={formData} setFormData={setFormData} />

        <ExamDetails formData={formData} setFormData={setFormData} />

      </Grid>
    </div>
  );
}
