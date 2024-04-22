/*import React from "react";
import {
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Button,
  Box,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


export default function ScheduleBasicForm({
  activeStep,
  handleNext,
  handleBack,
  handleClose,
  formData,
  setFormData,
  steps,
}) {
  const handleYearSelect = (event) => {
    const { value, checked } = event.target;
    let selectedYears = [...formData.selectedYears];

    if (checked) {
      selectedYears.push(value);
    } else {
      selectedYears = selectedYears.filter((year) => year !== value);
    }

    const subjectsPerYear = { ...formData.subjectsPerYear };

    selectedYears.forEach((year) => {
      if (!(year in subjectsPerYear)) {
        subjectsPerYear[year] = "";
      }
    });
    for (const year in subjectsPerYear) {
      if (!selectedYears.includes(year)) {
        delete subjectsPerYear[year];
      }
    }

    setFormData({ ...formData, selectedYears, subjectsPerYear });
  };

  const handleSubjectsChange = (event, year) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setFormData({
        ...formData,
        subjectsPerYear: {
          ...formData.subjectsPerYear,
          [year]: value,
        },
      });
    }
  };

  const handleBlockChange = (event, year) => {
    const { value } = event.target;
    if (!isNaN(value)) {
      setFormData({
        ...formData,
        noOfBlocksPerYear: {
          ...formData.noOfBlocksPerYear,
          [year]: value,
        },
      });
    }
  };

  const handlePaperSlotsChange = (event) => {
    const { value } = event.target;
    const paperTimeSlots = Array.from(
      { length: parseInt(value, 10) },
      () => ""
    );
    if (!isNaN(value) && value < 4) {
      setFormData({ ...formData, paperSlotsPerDay: value, paperTimeSlots });
    }
  };

  const handleTimeSlotChange = (event, index) => {
    const { name, value } = event.target;
    const updatedTimeSlots = [...formData.paperTimeSlots];
    updatedTimeSlots[index] = { ...updatedTimeSlots[index], [name]: value };
    setFormData({ ...formData, paperTimeSlots: updatedTimeSlots });
  };

  return (
    <div>
      <form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <FormLabel required>Title</FormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FormLabel required>Year</FormLabel>
            <br />
            {["FE", "SE", "TE", "BE"].map((year) => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    checked={formData.selectedYears.includes(year)}
                    onChange={handleYearSelect}
                    value={year}
                  />
                }
                label={year}
              />
            ))}
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={3} key={year}>
              <FormLabel required>{`Subjects for ${year}`}</FormLabel>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                name={`subjects_${year}`}
                value={formData.subjectsPerYear[year]}
                onChange={(e) => handleSubjectsChange(e, year)}
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={3} key={year}>
              <FormLabel required>{`Blocks for ${year}`}</FormLabel>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                value={formData.noOfBlocksPerYear[year]}
                onChange={(e) => handleBlockChange(e, year)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <FormLabel required>Paper Slots Per Day</FormLabel>
            <TextField
              fullWidth
              type="text"
              name="paperSlotsPerDay"
              variant="outlined"
              size="small"
              value={formData.paperSlotsPerDay}
              onChange={handlePaperSlotsChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.paperTimeSlots.map((timeSlot, index) => (
            <Grid item container xs={6} key={index} spacing={1}>
              <Grid item xs={10} textAlign={"start"}>
                <Typography required>Time Slot {index + 1}</Typography>
              </Grid>

              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormLabel required>Start</FormLabel>
                  <TextField
                    fullWidth
                    type="time"
                    variant="outlined"
                    size="small"
                    name={`startTime`}
                    value={formData.paperTimeSlots[index].startTime}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={5}>
                <FormLabel required>To</FormLabel>
                <TextField
                  fullWidth
                  type="time"
                  variant="outlined"
                  size="small"
                  name={`endTime`}
                  value={formData.paperTimeSlots[index].endTime}
                  onChange={(e) => handleTimeSlotChange(e, index)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              handleClose();
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Close
          </Button>

          {activeStep !== steps && (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps - 1 ? "Submit" : "Next"}
            </Button>
          )}
        </Box>
      </form>
    </div>
  );
}*/


import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  FormLabel,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MultiSelect from "../../components/MultiSelect";
import { fetchAllBlocks, fetchAllSubjects } from "../../api/utility.api";

export default function ScheduleBasicForm({
  activeStep,
  handleNext,
  handleBack,
  handleClose,
  formData,
  setFormData,
  steps,
}) {
  const [subjects, setSubjects] = useState();
  const [blocks, setBlocks] = useState();

  async function fetchSubject(params) {
    const data = await fetchAllSubjects();
    console.log(data);
    setSubjects(data)
  }
  async function fetchBlocks() {
    const data = await fetchAllBlocks();
    setBlocks(data);
    // console.log();
  }
  useEffect(() => {
    fetchSubject();
    fetchBlocks();
  }, [])

  const handleYearSelect = (event) => {
    const { value, checked } = event.target;
    let selectedYears = [...formData.selectedYears];
    if (checked) {
      selectedYears.push(value);
    } else {
      selectedYears = selectedYears.filter((year) => year !== value);
    }

    const subjectsPerYear = { ...formData.subjectsPerYear };

    selectedYears.forEach((year) => {
      if (!(year in subjectsPerYear)) {
        subjectsPerYear[year] = "";
      }
    });
    for (const year in subjectsPerYear) {
      if (!selectedYears.includes(year)) {
        delete subjectsPerYear[year];
      }
    }

    setFormData({ ...formData, selectedYears, subjectsPerYear });
  };

  const handleBlockChange = (event, year) => {
    console.log(event, year);
    setFormData({
      ...formData,
      noOfBlocksPerYear: {
        ...formData.noOfBlocksPerYear,
        [year]: event,
      },
    });


  };

  const handlePaperSlotsChange = (event) => {
    const { value } = event.target;
    const paperTimeSlots = Array.from(
      { length: parseInt(value, 10) },
      () => ""
    );
    if (!isNaN(value) && value < 4) {
      setFormData({ ...formData, paperSlotsPerDay: value, paperTimeSlots });
    }
  };

  const handleTimeSlotChange = (event, index) => {
    const { name, value } = event.target;
    const updatedTimeSlots = [...formData.paperTimeSlots];
    updatedTimeSlots[index] = { ...updatedTimeSlots[index], [name]: value };
    setFormData({ ...formData, paperTimeSlots: updatedTimeSlots });
  };

  const handleDepartmentChange = (event) => {
    const { value } = event.target;

    setFormData({ ...formData, department: value });



  };

  function handelSubjectChange(subject, year) {
    setFormData({ ...formData, subjectsPerYear: { ...formData.subjectsPerYear, [year]: subject } })
    console.log(subject, year);
  }

  function handleSubmit() {

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6">Form</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={6} >
                <FormLabel required>Title</FormLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl required sx={{ width: "100%" }}>
                  <FormLabel required>Department</FormLabel>
                  <Select
                    variant="outlined"
                    size="small"

                    value={formData.department}
                    onChange={handleDepartmentChange}

                    id="department-select"
                  >
                    {["FE", "IT", "CE", "ENTC"].map((department, index) => (
                      <MenuItem key={index} value={department}>
                        {department}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

              </Grid>
              <Grid item xs={3}>

                <FormControl required sx={{ width: "100%" }}>
                  <FormLabel required>Semester</FormLabel>
                  <Select
                    variant="outlined"
                    size="small"
                    value={formData.semester}
                    onChange={(e) => {
                      setFormData({ ...formData, semester: e.target.value });
                      // setFormData({ ...formData,});
                    }}

                    id="department-select"
                  >
                    {["1", "2"].map((sem, index) => (
                      <MenuItem key={index} value={sem}>
                        {sem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FormLabel required>Year</FormLabel>
            <br />
            {["FE", "SE", "TE", "BE"].map((year) => (
              <FormControlLabel
                key={year}
                control={
                  <Checkbox
                    checked={formData.selectedYears.includes(year)}
                    onChange={handleYearSelect}
                    value={year}
                  />
                }
                label={year}
              />
            ))}
          </Grid>

        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={3} key={year}>
              <FormLabel required>{`Subjects for ${year}`}</FormLabel>
              <MultiSelect
                options={subjects ? (subjects.filter((subject) => {
                  return subject.branch == formData?.department && subject.semester == formData?.semester && subject.year == year
                })[0]?.subjects || []).map((d) => d.abr) : []}
                // value={formData.subjectsPerYear[year].map((subject) => subject)}
                value={formData.subjectsPerYear[year] || []}
                onChange={(e) => { handelSubjectChange(e, year) }}
                variant="outlined"
                size="small"
              />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.selectedYears.map((year) => (
            <Grid item xs={3} key={year}>
              <FormLabel required>{`Blocks for ${year}`}</FormLabel>
              <MultiSelect
                fullWidth
                type="text"
                variant="outlined"
                size="small"
                options={(blocks || []).map(block => block.name)}
                value={formData.noOfBlocksPerYear[year] || []}
                onChange={(e) => handleBlockChange(e, year)}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <FormLabel required>Paper Slots Per Day</FormLabel>
            <TextField
              fullWidth
              type="text"
              name="paperSlotsPerDay"
              variant="outlined"
              size="small"
              value={formData.paperSlotsPerDay}
              onChange={handlePaperSlotsChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ my: 1 }}>
          {formData.paperTimeSlots.map((timeSlot, index) => (
            <Grid item container xs={6} key={index} spacing={1}>
              <Grid item xs={10} textAlign={"start"}>
                <Typography required>Time Slot {index + 1}</Typography>
              </Grid>

              <Grid item xs={5}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormLabel required>Start</FormLabel>
                  <TextField
                    fullWidth
                    type="time"
                    variant="outlined"
                    size="small"
                    name={`startTime`}
                    value={formData.paperTimeSlots[index].startTime}
                    onChange={(e) => handleTimeSlotChange(e, index)}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={5}>
                <FormLabel required>To</FormLabel>
                <TextField
                  fullWidth
                  type="time"
                  variant="outlined"
                  size="small"
                  name={`endTime`}
                  value={formData.paperTimeSlots[index].endTime}
                  onChange={(e) => handleTimeSlotChange(e, index)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
              Back
            </Button>
          )}
          <Button
            onClick={() => {
              handleClose();
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Close
          </Button>

          {activeStep !== steps && (
            <Button
              variant="contained"
              onClick={(e) => {
                handleNext(e);
              }}
              sx={{ mt: 3, ml: 1 }}
            >
              {activeStep === steps - 1 ? "Submit" : "Next"}
            </Button>
          )}
        </Box>
        <Button onClick={() => {
          console.log(formData);
        }}>aa</Button>
      </form>
    </div >
  );
}
