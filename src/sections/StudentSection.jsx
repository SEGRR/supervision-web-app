
import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GetAppIcon from '@mui/icons-material/GetApp';
import { Autocomplete, Box, TextField, Button, Stack, Typography } from "@mui/material";

import { getSeatingArrangementList } from "../api/seating-arrangement-data.js";

import StickyHeadTable from "../components/StickyHeadTable.jsx";
import ConfirmationModal from "../components/ConfirmationModal.jsx";
import FeedbackMessageModal from "../components/FeedbackMessageModal .jsx";
import LoadingModal from "../components/LoadingModal.jsx";
import { fetchAllSeatingArrangement, getSeatingById, removeSeatingById } from "../api/seating.arragement.api.js";
import { generateSeatingPdfFile } from "../api/pdf.module.js";

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
  { id: "id", label: "Sr. No.", minWidth: 80 },
  { id: "title", label: "Title", minWidth: 120 },

  {
    id: "selectedDepartment",
    label: "Department",
    minWidth: 120,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "selectedAcademicYear",
    label: "Academic Year",
    minWidth: 120,
    align: "left",
    format: (value) => (value ? value.toLocaleString("en-US") : ""),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    format: (value, row, onDeleteClick, onEditClick, onExportClick) => (
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

        <IconButton onClick={(e) => {
          e.stopPropagation();
          onExportClick(row)
        }}>
          <GetAppIcon />
        </IconButton>
      </div>
    ),
  },
];

export default function StudentSection() {

  const navigate = useNavigate();
  const [seatingArrangementList, setSeatingArrangementList] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedSeating, setSelectedSeating] = useState();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ title: "", message: "" });
  const [feedbackType, setFeedbackType] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchSeatings(params) {
    const seatingArrangementList = await fetchAllSeatingArrangement(); // TODO: Add fetch Seating 

    if (seatingArrangementList) {
      console.log(seatingArrangementList);
      setSeatingArrangementList(seatingArrangementList);
      setRows(seatingArrangementList);
      setLoading(false);
    }
    else{
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during fetching"
      });
      setFeedbackType("error");
      setFeedbackOpen(true);
      setLoading(false);

    }
  }

  useEffect(() => {
    fetchSeatings();
  }, []);

  const handleAddOpen = () => {
    navigate('/seating-arrangement/add')
  };

  const handleEditOpen = () => {
    console.log("Edit click");
  }

  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleFeedbackClose = () => setFeedbackOpen(false);

  const handleDeleteClick = (row) => {
    console.log(row);
    setSelectedSeating(row);

    handleDeleteOpen();
  };

  const handleDeleteConfirm = async (row) => {
    try {
      setLoading(true);
      // Perform your deletion logic here...
      await removeSeatingById(row._id);
      // Show Feedback modal if deletion is successfull
      setFeedbackMessage({
        title: "Deleted!",
        message: "Data has been deleted successfully"
      });
      setFeedbackType("success");
      setFeedbackOpen(true);
      fetchSeatings();
    } catch (error) {
      console.error("Error deleting data:", error);
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during deletion"
      });
      setFeedbackType("error");
      setFeedbackOpen(true);
      fetchSeatings();
    } finally {
      handleDeleteClose();
    }
  };

  const handleExportClick = async (row) => {
    setLoading(true);
    console.log("Export clicked:", row);
    const data = await getSeatingById(row._id);
    generateSeatingPdfFile(data);
    setLoading(false);
  };

  const handleSearchClick = (value) => {

    if (!value) {
      setRows(seatingArrangementList);
      return;
    }
    if (typeof value === "object") {
      const filteredSeatingArrangementList = seatingArrangementList.filter((seatingArrangementList) =>
        seatingArrangementList.title.toLowerCase().includes(value.title.toLowerCase())
      );
      setRows(filteredSeatingArrangementList);
    }
  };

  return (
    <div>
      <Typography component="h6" variant="h6" align="center">
        Seating Arrangement
      </Typography>


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
            options={seatingArrangementList}
            sx={{ width: 300 }}
            onChange={(e, v) => handleSearchClick(v)}
            getOptionLabel={(rows) => rows.title || ""}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Search" />
            )}
          ></Autocomplete>
          <Button
            variant="outlined"
            endIcon={<AddCircleIcon />}
            onClick={handleAddOpen}
          >
            Create
          </Button>
        </Stack>

        <Box height={10} />

        <StickyHeadTable
          columns={columns}
          rows={rows}
          handleDeleteClick={handleDeleteClick}
          handleExportClick={handleExportClick}
        />
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
      <LoadingModal open={loading} />
    </div>
  );
}
