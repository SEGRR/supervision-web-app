import {
    Box,
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StickyHeadTable from "../../../components/StickyHeadTable";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Close as CloseIcon } from "@mui/icons-material";
import AddSubjectForm from "./AddSubjectForm";
import FeedbackMessageModal from "../../../components/FeedbackMessageModal ";
import ConfirmationModal from "../../../components/ConfirmationModal";
import LoadingModal from "../../../components/LoadingModal";
import EditSubjectForm from "./EditSubjectForm";
import { fetchCourseData, removeSubjectById } from "../../../api/utility.api";

const columns = [
    { id: "code", label: "Branch", minWidth: 100 },
    {
        id: "name",
        label: "Semester",
        minWidth: 170,
        align: "left",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
    },
    {
        id: "abr",
        label: "Year",
        minWidth: 80,
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

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
};

export default function ViewSubject({ selectedSubject, onClose }) {
    const [selectedRow, setSelectedRow] = useState();
    const [courseData, setCourseData] = useState();

    const [addOpen, setAddOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);

    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({
        title: "",
        message: "",
    });
    const [feedbackType, setFeedbackType] = useState("");

    const handleAddOpen = () => setAddOpen(true);
    const handleAddClose = () => setAddOpen(false);
    const handleFeedbackClose = () => setFeedbackOpen(false);
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleDeleteOpen = () => setDeleteOpen(true);
    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        handleDeleteOpen();
    };

    const handleEditClick = (row) => {
        console.log(row);
        setSelectedRow(row);
        handleEditOpen();
    };
    const handleDeleteConfirm = async () => {
        try {
            await removeSubjectById(selectedSubject._id, selectedRow.code);
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
            fetchCourse();
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    async function fetchCourse() {
        setLoading(true);
        const subjectList = await fetchCourseData(selectedSubject._id);
        if (subjectList) {
            console.log(subjectList);
            setCourseData(subjectList);
            setLoading(false);
        } else {
            setFeedbackMessage({
                title: "Error!",
                message: "An error occurred during fetching",
            });
            setFeedbackType("error");
            setFeedbackOpen(true);
            setLoading(false);
            // onClose();
        }
    }
    return (
        <>
            <form>
                <Typography variant="h6" align="center">
                    Subject Data
                </Typography>
                <IconButton
                    style={{ position: "absolute", top: "0", right: "0" }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                <Box height={10} />
                {courseData && <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Branch"
                            defaultValue={courseData ? courseData.branch : ""}
                            size="small"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label={"Semester"}
                            size="small"
                            defaultValue={courseData ? courseData.semester : ""}
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Year"
                            defaultValue={courseData ? courseData.year : ""}
                            size="small"
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography>Subjects :</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <StickyHeadTable
                            columns={columns}
                            rows={courseData.subjects}
                            handleDeleteClick={handleDeleteClick}
                            handleEditClick={handleEditClick}
                            maxHeight={300}
                            tablePagination
                        />
                    </Grid>
                </Grid>}
                <Grid
                    container
                    spacing={2}
                    marginTop={1}
                    sx={{ justifyContent: "center" }}
                    direction={"row"}
                >
                    <Grid item xs={3}>
                        <Button variant="contained" color="warning" onClick={handleAddOpen}>
                            Add Subject
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary"onClick={onClose}>
                            Ok
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Modal
                open={addOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddSubjectForm
                        onClose={handleAddClose}
                        selectedSubject={selectedSubject}
                        onSuccess={() => {
                            setFeedbackMessage({
                                title: "Added!",
                                message: "Data has been added successfully",
                            });
                            setFeedbackType("success");
                            setFeedbackOpen(true);
                            fetchCourse();

                        }}
                        onError={(message) => {
                            setFeedbackMessage({
                                title: "Error!!",
                                message: "An error occurred during editing <br/>" + message,
                            });
                            setFeedbackType("error");
                            setFeedbackOpen(true);
                            fetchCourse();

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
                    <EditSubjectForm
                        onClose={handleEditClose}
                        selectedData={selectedRow}
                        selectedSubject={selectedSubject}
                        setLoading={setLoading}
                        onSuccess={() => {
                            setFeedbackMessage({
                                title: "Edited!",
                                message: "Data has been edited successfully",
                            });
                            setFeedbackType("success");
                            setFeedbackOpen(true);
                            fetchCourse();

                        }}
                        onError={(message) => {
                            setFeedbackMessage({
                                title: "Error!",
                                message: "An error occurred during editing <br/>" + message,
                            });
                            setFeedbackType("error");
                            setFeedbackOpen(true);
                            fetchCourse();

                        }}
                    />
                </Box>
            </Modal>

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
                message={"Are you sure you want Delete Subject"}
            />
            <LoadingModal open={loading} />
        </>
    );
}
