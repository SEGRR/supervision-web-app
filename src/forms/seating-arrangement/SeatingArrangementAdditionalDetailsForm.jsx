import React from "react";
import {

  Grid

} from "@mui/material";
import YearDivisionDetails from "../../components/SeatingArrangementComponents/YearDivisionDetails";
import ClassroomsDetails from "../../components/SeatingArrangementComponents/ClassRoomsDetails";

export default function SeatingArrangementInfo({ formData, setFormData }) {

  return (
    <div>

      <Grid container spacing={2}>

        <YearDivisionDetails formData={formData} setFormData={setFormData} />
        
        <ClassroomsDetails formData={formData} setFormData={setFormData} />
      </Grid>
    </div>
  );
}
