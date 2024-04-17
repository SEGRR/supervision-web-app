
import * as React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Autocomplete, Box, TextField, Button, Stack } from "@mui/material";
import Modal from "@mui/material/Modal";
import { fetchAllTeachers, removeTeacherById } from "../api/teacher.api.js";
import StickyHeadTable from "../components/StickyHeadTable.jsx";
import LoadingModal from "../components/LoadingModal.jsx";
import AddFacultyForm from "../forms/faculty/AddFacultyForm.jsx";
import FeedbackMessageModal from "../components/FeedbackMessageModal .jsx";
import EditFacultyForm from "../forms/faculty/EditFacultyForm.jsx";
import ConfirmationModal from "../components/ConfirmationModal.jsx";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const columns = [
  { id: "teacherId", label: "Sr. No.", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "designation",
    label: "Designation",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "joinDate",
    label: "Joining Date",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? new Date(value).toLocaleDateString('IND') : ""),
  },
  {
    id: "teachTo",
    label: "Teach To",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value, row, onDeleteClick, onEditClick) => (
      <div>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(row);
          }}
          title="Delete"
        >
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(row);
          }}
          title="Edit"
        >
          <EditIcon style={{ color: "#2DB532" }} />
        </IconButton>
      </div>
    ),
  },
];


export default function FacultySection() {
  const [teachers, setTeachers] = useState([]);
  const [rows, setRows] = useState();

  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTeacherData, setSelectedTeacherData] = useState();

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ title: "", message: "" });
  const [feedbackType, setFeedbackType] = useState("");

  async function fetchTeacher() {
    setLoading(true);
    const teacherList = await fetchAllTeachers();
    if(teacherList){
    console.log(teacherList);
    setTeachers(teacherList);
    setRows(teacherList);
    setLoading(false);  }
    else{
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during fetching"
      });
      setTeachers([]);
    setRows([]);
      setFeedbackType("error");
      setFeedbackOpen(true);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchTeacher();
  }, []);

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleFeedbackClose = () => setFeedbackOpen(false);

  const handleDeleteClick = (row) => {
    setSelectedTeacherData(row);
    handleDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeTeacherById(selectedTeacherData._id);
      setFeedbackMessage({
        title: "Deleted!",
        message: "Data has been deleted successfully"
      });
      setFeedbackType("success");
      setFeedbackOpen(true);
      fetchTeacher();
    } catch (error) {
      console.error("Error deleting data:", error);
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during deletion"
      });
      setFeedbackType("error");
      setFeedbackOpen(true);
      fetchTeacher();
    } finally {
      handleDeleteClose();
    }
  };

  const handleEditClick = (row) => {
    console.log(row);
    setSelectedTeacherData(row);
    handleEditOpen();
  };

  const handleSearchClick = (value) => {

    if (!value) {
      setRows(teachers);
      return;
    }
    if (typeof value === "object") {
      const filteredTeachers = teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(value.name.toLowerCase())
      );
      console.log("Filtered teachers:", filteredTeachers);
      setRows(filteredTeachers);
    }
  };

  return (
    <div>
      <div>
        <Modal
          open={addOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddFacultyForm
              onClose={handleAddClose}
              teacherId={rows ? rows.reduce((max, obj) => {
                return obj.teacherId > max.teacherId ? obj : max;
              }, rows[0]) : 0}
              onSuccess={() => {

                setFeedbackMessage({
                  title: "Added!",
                  message: "Data has been added successfully"
                });
                setFeedbackType("success");
                setFeedbackOpen(true);
                fetchTeacher();
              }}
              onError={() => {
                setFeedbackMessage({
                  title: "Error!!",
                  message: "An error occurred during editing"
                });
                setFeedbackType("error");
                setFeedbackOpen(true);
              }}
              loading={setLoading}
            />
          </Box>
        </Modal>

        <Modal
          open={editOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditFacultyForm
              onClose={handleEditClose}
              selectedTeacherData={selectedTeacherData}
              setLoading={setLoading}
              onSuccess={() => {
                setFeedbackMessage({
                  title: "Edited!",
                  message: "Data has been edited successfully"
                });
                setFeedbackType("success");
                setFeedbackOpen(true);
                fetchTeacher();
                setSelectedTeacherData({});
              }}
              onError={() => {
                setFeedbackMessage({
                  title: "Error!",
                  message: "An error occurred during editing"
                });
                setFeedbackType("success");
                setFeedbackOpen(true);
                fetchTeacher();
                setSelectedTeacherData({});

              }}
            />
          </Box>
        </Modal>
      </div>

      <div style={{ marginTop: "1%", padding: "1%" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          className="my-2 mb-2"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={teachers}
            sx={{ width: 300 }}
            onChange={(e, v) => handleSearchClick(v)}
            getOptionLabel={(rows) => rows.name || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search" />
            )}
          ></Autocomplete>
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={handleAddOpen}
          >
            Add
          </Button>
        </Stack>

        <Box height={10} />

        {rows && <StickyHeadTable
          columns={columns}
          rows={rows}
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
        />}
      </div>
    
      <FeedbackMessageModal
        open={feedbackOpen}
        onClose={handleFeedbackClose}
        data={feedbackMessage}
        feedbackType={feedbackType}
      />
      <ConfirmationModal
        open={deleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        message={"Are you sure you want Delete Faculty"}
      />
      <LoadingModal open={loading}/>
    </div>
  );
}


