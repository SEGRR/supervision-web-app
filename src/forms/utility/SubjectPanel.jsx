import { Autocomplete, Box, Button, IconButton, Modal, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle"

import StickyHeadTable from '../../components/StickyHeadTable';
import FeedbackMessageModal from '../../components/FeedbackMessageModal ';
import ConfirmationModal from '../../components/ConfirmationModal';
import LoadingModal from '../../components/LoadingModal';
import { fetchAllSubjects, removeCourseById, removeSubjectById } from '../../api/utility.api';
import EditSubjectForm from './subjects/EditSubjectForm';
import ViewSubject from './subjects/ViewSubject';
import AddCourseForm from './subjects/AddCourseForm';
import EditCourseForm from './subjects/EditCourseForm';
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
    { id: "branch", label: "Branch", minWidth: 100 },
    {
        id: "semester",
        label: "Semester",
        minWidth: 170,
        align: "left",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
    },
    {
        id: "year",
        label: "Year",
        minWidth: 170,
        align: "left",
        format: (value) => (value ? value.toLocaleString("en-US") : ""),
    },
    {
        id: "subjects",
        label: "Subjects",
        minWidth: 170,
        align: "left",
        format: (value) => (value ? value.reduce((acc, element) => { return acc + element.abr + ", " }, "") : ""),
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

export default function SubjectPanel() {
    const [rows, setRows] = useState();
    const [subjects, setSubjects] = useState();
    const [selectedSubject, setSelectedSubject] = useState();

    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState({ title: "", message: "" });
    const [feedbackType, setFeedbackType] = useState("");

    async function fetchSubjects() {
        setLoading(true);
        const subjectList = await fetchAllSubjects();
        if (subjectList) {
            console.log(subjectList);
            setSubjects(subjectList);
            setRows(subjectList);
            setLoading(false);
        }
        else {
            setFeedbackMessage({
                title: "Error!",
                message: "An error occurred during fetching"
            });
            setSubjects([]);
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
    const handleViewOpen = () => setViewOpen(true);
    const handleViewClose = () => setViewOpen(false);
    const handleDeleteClose = () => setDeleteOpen(false);
    const handleDeleteOpen = () => setDeleteOpen(true);

    const handleFeedbackClose = () => setFeedbackOpen(false);

    const handleDeleteClick = (row) => {
        setSelectedSubject(row);
        handleDeleteOpen();
    };

    const handleDeleteConfirm = async () => {
        try {
            await removeCourseById(selectedSubject._id);
            setFeedbackMessage({
                title: "Deleted!",
                message: "Data has been deleted successfully"
            });
            setFeedbackType("success");
            setFeedbackOpen(true);
        } catch (error) {
            console.error("Error deleting data:", error);
            setFeedbackMessage({
                title: "Error!",
                message: "An error occurred during deletion <br>" + error.message
            });
            setFeedbackType("error");
            setFeedbackOpen(true);
        } finally {
            handleDeleteClose();
            fetchSubjects();

        }
    };

    const handleEditClick = (row) => {
        console.log(row);
        setSelectedSubject(row);
        handleEditOpen();
    };
    const handelDoubleClick = (row) => {
        console.log(row);
        setSelectedSubject(row);
        handleViewOpen();
    };

    const handleSearchClick = (value) => {

        if (!value) {
            setRows(subjects);
            return;
        }
        if (typeof value === "object") {
            const filteredSubjects = subjects.filter((subject) =>
                subject.name.toLowerCase().includes(value.name.toLowerCase())
            );
            // console.log("Filtered teachers:", filteredTeachers);
            setRows(filteredSubjects);
        }
    };

    useEffect(() => {
        // setLoading(false);
        fetchSubjects();
    }, [])

    return (
        <div>
            <div>
                <Modal
                    open={addOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddCourseForm
                            onClose={handleAddClose}

                            onSuccess={() => {
                                setFeedbackMessage({
                                    title: "Added!",
                                    message: "Data has been added successfully"
                                });
                                setFeedbackType("success");
                                setFeedbackOpen(true);
                                fetchSubjects();
                            }}
                            onError={(message) => {
                                setFeedbackMessage({
                                    title: "Error!!",
                                    message: "An error occurred during editing <br/>" + message
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
                        <EditCourseForm
                            onClose={handleEditClose}
                            selectedCourse={selectedSubject}
                            setLoading={setLoading}
                            onSuccess={() => {
                                setFeedbackMessage({
                                    title: "Edited!",
                                    message: "Data has been edited successfully"
                                });
                                setFeedbackType("success");
                                setFeedbackOpen(true);
                                fetchSubjects();
                            }}
                            onError={(message) => {
                                setFeedbackMessage({
                                    title: "Error!",
                                    message: "An error occurred during editing <br/>" + message
                                });
                                setFeedbackType("error");
                                setFeedbackOpen(true);
                                fetchSubjects();

                            }}
                        />
                    </Box>
                </Modal>
                <Modal
                    open={viewOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, width: '700px' }}>
                        <ViewSubject
                            onClose={() => {
                                fetchSubjects();
                                handleViewClose();
                            }}
                            selectedSubject={selectedSubject}

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

                {rows && <StickyHeadTable
                    columns={columns}
                    rows={rows}
                    handleDeleteClick={handleDeleteClick}
                    handleEditClick={handleEditClick}
                    handelDoubleClick={handelDoubleClick}
                    maxHeight={400}

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
            <LoadingModal open={loading} />
        </div>)
}
