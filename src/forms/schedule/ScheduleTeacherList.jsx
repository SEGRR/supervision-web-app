import React, { useEffect, useState } from "react";
import { Table, Paper, Box } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import { fetchAllTeachers } from "../../api/teacher.api";
import LoadingModal from "../../components/LoadingModal";

export default function ScheduleTeacherList({
  activeStep,
  handleNext,
  handleBack,
  handleClose,
  steps,
  teachers,
  setTeachers,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchTeacher() {
    setLoading(true);
    if (teachers.length === 0) {
      const data = await fetchAllTeachers();
      console.log(data);
      const teachersWithSelection = data.map((teacher) => ({
        ...teacher,
        selected: false,
      }));

      setTeachers(teachersWithSelection);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTeacher();
  }, []);

  const handleToggle = (_id) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher._id === _id
          ? { ...teacher, selected: !teacher.selected }
          : teacher
      )
    );
  };

  const handleSelectAll = () => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => ({ ...teacher, selected: true }))
    );
  };

  const handleUnselectAll = () => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => ({ ...teacher, selected: false }))
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} spacing={1}>
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            size="small"
            sx={{ m: 1 }}
            onClick={handleSelectAll}
          >
            Select All
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ m: 1 }}
            onClick={handleUnselectAll}
          >
            Unselect All
          </Button>
        </div>
      </Stack>
      <div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 330 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Teacher Name</TableCell>
                  <TableCell>Subjects</TableCell>
                  <TableCell>Select</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.
                    _id
                  }>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>
                      {teacher.teachTo.map((teach) => teach + " ")}
                    </TableCell>
                    <TableCell>
                      <Switch
                        onChange={() => handleToggle(teacher.
                          _id
                        )}
                        checked={teacher.selected}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
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
      </div>
      <LoadingModal open={loading} />
    </>
  );
}
