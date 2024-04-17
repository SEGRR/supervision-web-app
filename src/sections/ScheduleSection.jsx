import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useNavigate } from "react-router-dom";
import StickyHeadTable from "../components/StickyHeadTable";
import { fetchAllSchedules, getScheduleById, removeScheduleById } from "../api/schedule.api";
import LoadingModal from "../components/LoadingModal";
import FeedbackMessageModal from "../components/FeedbackMessageModal ";
import { fetchAllTeachers } from "../api/teacher.api";
import { generateSchedulePdfFile } from "../api/pdf.module";

const columns = [
  { id: "id", label: "Sr No.", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 200 },
  { id: "selectedYears", label: "Year", minWidth: 100 },
  { id: "createdOn", label: "Date", minWidth: 100, },
  {
    id: "actions",
    label: "Actions",
    minWidth: 200,
    align: "center",
    format: (value, row, onDeleteClick, _ ,onExportClick) => (
      <div>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick(row);
          }}
        >

          <DeleteIcon />
        </IconButton>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onExportClick(row);
          }}
        >

          <GetAppIcon />
        </IconButton>
      </div>
    ),
  },
];

export default function ScheduleSection() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ title: "", message: "" });
  const [feedbackType, setFeedbackType] = useState("");
  const navigate = useNavigate();


  const handleFeedbackClose = () => setFeedbackOpen(false);

  useEffect(() => {
    fetchSchedule();
  }, [])


  function fetchSchedule() {
    setLoading(true)
    const resp = fetchAllSchedules();
    resp.then((data) => {
      console.log(data);
      if(data){
      setRows(data);}
      else{
        setLoading(false);
        setFeedbackMessage({
          title: "Error!",
          message: "An error occurred during fetching "
        });
        setFeedbackType("error");
        setFeedbackOpen(true);
      }
      setLoading(false);
    }).catch((err) => {
      
      // console.log(err);
      setRows([]);
      setLoading(false);
    });
  }
  const handleDeleteClick = async (row) => {
    setLoading(true)
    const resp = await removeScheduleById(row._id);
    if (resp) {
      setFeedbackMessage({
        title: "Deleted!",
        message: "Data has been deleted successfully"
      });
      setFeedbackType("success");
      setFeedbackOpen(true);
      fetchSchedule();
    }
    else {
      // console.error("Error deleting data:", error);
      setFeedbackMessage({
        title: "Error!",
        message: "An error occurred during deletion"
      });
      setFeedbackType("error");
      setFeedbackOpen(true);
      fetchSchedule();
    }
  };



  const handleExportClick = async (row) => {
    setLoading(true);
    console.log("Export clicked:", row._id);
    const data = await getScheduleById(row._id);
    const teachers = await fetchAllTeachers();
    console.log(teachers);
    generateSchedulePdfFile(data, teachers);
    setLoading(false);
  };

  const handleOpenModal = () => {
    navigate("/schedule/create");
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Create Supervisions
        </Button>
      </div>
      <div>
        <StickyHeadTable
          columns={columns}
          rows={rows}
          handleDeleteClick={handleDeleteClick}
          handleExportClick={handleExportClick}
        />
      </div>
      <LoadingModal open={loading} />
      <FeedbackMessageModal
        open={feedbackOpen}
        onClose={handleFeedbackClose}
        data={feedbackMessage}
        feedbackType={feedbackType}
      />
    </div>
  );
}
