import React from "react";
import {
  TextField,
  Grid,
  Typography,
  FormLabel,

} from "@mui/material";

export default function ExamDetails({ formData, setFormData }) {
  const handleexamSlotsChange = (event) => {
    const { value } = event.target;
    const examTimeSlots = Array.from({ length: parseInt(value, 10) }, () => ({
      startTime: "",
      endTime: "",
    }));
    setFormData({ ...formData, examSlotsPerDay: value, examTimeSlots });
  };
  const handleTimeslotChange = (event, index, fieldName) => {
    const { value } = event.target;

    const updatedTimeSlots = [...formData.examTimeSlots];
    if (typeof updatedTimeSlots[index] !== 'object') {
      updatedTimeSlots[index] = { startTime: "", endTime: "" };
    }

    updatedTimeSlots[index][fieldName] = value;
    setFormData({
      ...formData,
      examTimeSlots: updatedTimeSlots,
    });
  };

  return (
    <Grid container item xs={12} spacing={2} sx={{ my: 1 }}>
      <Grid item xs={4}>
        <FormLabel required>Exam Slots Per Day</FormLabel>
        <TextField
          fullWidth
          type="number"
          name="examSlotsPerDay"
          InputProps={{
            inputProps: { min: 0 },
          }}
          variant="outlined"
          size="small"
          value={formData.examSlotsPerDay}
          onChange={handleexamSlotsChange}
        />
      </Grid>
      <Grid item xs={4} >
        <FormLabel required>No of Exam Days</FormLabel>
        <TextField
          fullWidth
          type="number"
          name="examDays"
          InputProps={{
            inputProps: { min: 0 },
          }}
          variant="outlined"
          size="small"
          value={formData.examdays}
          onChange={(e) =>
            setFormData({ ...formData, examdays: e.target.value })
          }
        />
      </Grid>


      <Grid container item spacing={4}>
        {formData.examTimeSlots.map((timeSlot, index) => (
          <Grid item container xs={6} key={index} spacing={4} sx={{ my: 1 }}>
            <Grid item xs={12} textAlign={"start"}>
              <Typography required>Time Slot {index + 1}</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormLabel required>Start</FormLabel>
              <TextField
                fullWidth
                type="time"
                variant="outlined"
                size="small"
                name={`examTimeSlot${index + 1}`}
                value={timeSlot.startTime || ""}
                onChange={(e) => handleTimeslotChange(e, index, "startTime")}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel required>To</FormLabel>
              <TextField
                fullWidth
                type="time"
                variant="outlined"
                size="small"
                name={`examTimeSlot${index + 1}`}
                value={timeSlot.endTime || ""}
                onChange={(e) => handleTimeslotChange(e, index, "endTime")}
              />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
