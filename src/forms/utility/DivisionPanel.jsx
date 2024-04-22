import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import StickyHeadTable from "../../components/StickyHeadTable";
import FeedbackMessageModal from "../../components/FeedbackMessageModal ";
import ConfirmationModal from "../../components/ConfirmationModal";
import LoadingModal from "../../components/LoadingModal";
import { fetchAllDivisions, removeDivisionById } from "../../api/utility.api";
import AddDivisionForm from "./divisions/AddDivisionForm";
import EditDivisionForm from "./divisions/EditDivisionForm";

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
  { id: "id", label: "Sr. No.", minWidth: 170 },
  { id: "className", label: "Class Name", minWidth: 100 },
  {
    id: "startRollNo",
    label: "Start RollNo",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value : ""),
  },
  {
    id: "endRollNo",
    label: "End Roll No",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value : ""),
  },
  {
    id: "total",
    label: "Total",
    minWidth: 170,
    align: "left",
    format: (value) => (value ? value : ""),
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

export default function DivisionPanel() {
  const [rows, setRows] = useState();
  const [divisions, setDivisions] = useState();
  const [selectedDivision, setSelectedDivision] = useState();

  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({
    title: "",
    message: "",
  });
  const [feedbackType, setFeedbackType] = useState("");

  async function fetchDivisions() {
    setLoading(true);
    const divisionList = await fetchAllDivisions();
    if (divisionList) {
      console.log(divisionList);
      setDivisions(divisionList);
      setRows(divisionList);
      setLoading(false);
    } else {
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during fetching",
      });
      setDivisions([]);
      setRows([]);
      setFeedbackType("error");
      setFeedbackOpen(true);
      setLoading(false);
    }
  }

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleFeedbackClose = () => setFeedbackOpen(false);

  const handleDeleteClick = (row) => {
    setSelectedDivision(row);
    handleDeleteOpen();
  };

  const handleDeleteConfirm = async () => {
    try {
      await removeDivisionById(selectedDivision._id);
      setFeedbackMessage({
        title: "Deleted!",
        message: "Data has been deleted successfully",
      });
      setFeedbackType("success");
      setFeedbackOpen(true);
    } catch (error) {
      console.error("Error deleting data:", error);
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during deletion <br>" + error.message,
      });
      setFeedbackType("error");
      setFeedbackOpen(true);
    } finally {
      handleDeleteClose();
      fetchDivisions();

    }
  };

  const handleEditClick = (row) => {
    console.log(row);
    setSelectedDivision(row);
    handleEditOpen();
  };

  const handleSearchClick = (value) => {
    if (!value) {
      setRows(divisions);
      return;
    }
    if (typeof value === "object") {
      const filteredDivisions = divisions.filter((division) =>
        division.name.toLowerCase().includes(value.name.toLowerCase())
      );
      // console.log("Filtered teachers:", filteredTeachers);
      setRows(filteredDivisions);
    }
  };

  useEffect(() => {
    // setLoading(false);
    fetchDivisions();
  }, []);

  return (
    <div>
      <div>
        <Modal
          open={addOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddDivisionForm
              onClose={handleAddClose}
              onSuccess={() => {
                setFeedbackMessage({
                  title: "Added!",
                  message: "Data has been added successfully",
                });
                setFeedbackType("success");
                setFeedbackOpen(true);
                fetchDivisions();
              }}
              onError={(message) => {
                setFeedbackMessage({
                  title: "Error!!",
                  message: "An error occurred during editing <br/>" + message,
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
            <EditDivisionForm
              onClose={handleEditClose}
              selectedDivision={selectedDivision}
              setLoading={setLoading}
              onSuccess={() => {
                setFeedbackMessage({
                  title: "Edited!",
                  message: "Data has been edited successfully",
                });
                setFeedbackType("success");
                setFeedbackOpen(true);
                fetchDivisions();
              }}
              onError={(message) => {
                setFeedbackMessage({
                  title: "Error!",
                  message: "An error occurred during editing <br/>" + message,
                });
                setFeedbackType("error");
                setFeedbackOpen(true);
                fetchDivisions();
              }}
            />
          </Box>
        </Modal>
      </div>

      <div style={{}}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          className="my-2 mb-2"
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={rows}
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

        {rows && (
          <StickyHeadTable
            columns={columns}
            rows={rows}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            maxHeight={400}
          />
        )}
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
