import React, { useEffect, useState } from "react";
import {

  Grid,

  FormControl,
  FormLabel,

} from "@mui/material";
import MultiSelect from "../MultiSelect";
import { fetchAllBlocks } from "../../api/utility.api";
export default function ClassroomsDetails({ formData, setFormData }) {

  const [classRoomData, setClassRoomData] = useState();

  async function fetchBlocks() {
    const data = await fetchAllBlocks();
    setClassRoomData(data);
  }
  useEffect(() => {
    fetchBlocks();
  }, [])

  const handleClassroomChange = (selectedClassrooms) => {
    const formattedClassrooms = selectedClassrooms.map(classroom => ({
      name: classroom.split(" - ")[0], // Extracting the name
      capacity: parseInt(classroom.split(" - ")[1]) // Extracting and parsing the capacity
    }));
    setFormData({ ...formData, selectedClassrooms: formattedClassrooms });
  };

  return (
    <Grid container item xs={12} sx={{ my: 2 }} >
      <FormLabel required>Select Classrooms</FormLabel>

      <FormControl required fullWidth>

        {classRoomData && <MultiSelect

          options={classRoomData.map((classroom) => `${classroom.name} - ${classroom.capacity}`)}
          value={formData.selectedClassrooms.map(classroom => `${classroom.name} - ${classroom.capacity}`)}
          onChange={handleClassroomChange}
          variant="outlined"
          size="small"
        />}

      </FormControl>
    </Grid>
  );
}
