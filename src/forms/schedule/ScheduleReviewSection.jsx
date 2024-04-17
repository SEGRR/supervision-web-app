import React, { useEffect, useState } from "react";
import {
    Paper,
    TextField,
    Box,
    Button,
    Typography, Grid
} from "@mui/material";
import { fetchAllTeachers } from "../../api/teacher.api";
import { saveSchedule, sendBasicInfo } from "../../api/schedule.api";
import YearSchedule from "../../components/YearSchedule";
import ConfirmationModal from "../../components/ConfirmationModal";
import LoadingModal from "../../components/LoadingModal";
import { generateSchedulePdfFile } from "../../api/pdf.module";
import { useNavigate } from "react-router-dom";


export default function ScheduleReviewSection({
    activeStep,
    handleNext,
    handleBack,
    handleClose,
    steps,
    formData,
    selectedTeachers,
}) {
    const navigate =  useNavigate();
    const [yearSchedule, setYearSchedule] = useState();
    const [teacherNames, setTeacherNames] = useState({});
    const [openConfirmationModal, setConfirmationModal] = useState(false);
    const [loading, setLoading] = useState(true);
//
    const handleConfirmationOpen = () => setConfirmationModal(true);
    const handleConfirmationClose = () => {
        setConfirmationModal(false);
        navigate("/schedule",{replace: true});
    };


    useEffect(() => {
        const newData = sendBasicInfo(formData);
        const techData = fetchAllTeachers();
        newData.then((data) => {
            let year = [];
            if (data) {
                console.log(data);
                formData.selectedYears.map((d, index) => {
                    console.log(formData.subjectsPerYear[d]);
                    data && (data[d].headers = {
                        days: [
                            ...Array(
                                Math.ceil(formData.subjectsPerYear[d].length / formData.paperSlotsPerDay)
                            ).keys()
                        ].map((k) => `Day ${k + 1}`),
                        subjects: [
                            ...formData.subjectsPerYear[d]
                        ],
                        blocks: Array(Math.ceil(((formData.subjectsPerYear[d].length / formData.paperSlotsPerDay)*formData.paperSlotsPerDay))).fill().flatMap(() => formData.noOfBlocksPerYear[d]),
                    });
                    console.log(data[d]);
                    return year.push(data[d]);
                });
                setYearSchedule(year);
                setLoading(false);

            } else {
                alert(`Error`);
                setLoading(false);

            }
        });
        techData.then((data) => {
            setTeacherNames(data);
        
            setLoading(false);
        });
    }, [formData]);

    const handleInputChange = (e, yearIndex, field, index) => {
        const oldData = [...yearSchedule];
        oldData[yearIndex].headers[field][index] = e.target.value;
        setYearSchedule(oldData);
        console.log(yearSchedule);


    };
    const handleInputChange1 = (e, year, yearIndex, teacherIndex, index) => {

        const oldData = [...yearSchedule];
        oldData[yearIndex].schedule[teacherIndex][index] = e.target.checked;
        setYearSchedule(oldData);
        console.log(yearSchedule);

    };
    async function handleSubmit(params) {
        console.log("data");
        setLoading(true);
        let data = { ...formData, yearSchedule: [...yearSchedule] };
        let res = await saveSchedule(data);
        handleConfirmationOpen();
        console.log('saved schedule', res);
    }


    const handleConfirmation = () => {
        setLoading(false);
        generateSchedulePdfFile({ ...formData, yearSchedule: [...yearSchedule] }, teacherNames);
        handleConfirmationClose();
    };

    return (
        <div>
            <Paper sx={{ p: 2, mb: 3 }} elevation={2}>
                <Typography variant="h5" m={2} align="center">
                    Review Details
                </Typography>

                <Grid container spacing={1} sx={{ alignItems: "center" }}>
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 19 }}>Title: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            defaultValue={formData.title}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} fullWidth>
                            <Grid item xs={2}>
                                <Typography sx={{ fontSize: 19 }}>Selected Years: </Typography>
                            </Grid>
                            {formData.selectedYears.map((data, index) => (
                                <Grid key={index} item xs={2}>
                                    <TextField size="small" defaultValue={data} disabled fullWidth />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>


                    {Object.entries(formData.subjectsPerYear).map(([year, subjects]) => (
                        <>
                            <Grid item xs={2}>
                                <Typography key={year} sx={{ fontSize: 19 }}>
                                    Subjects for {year}:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    defaultValue={subjects}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {" "}
                            </Grid>
                        </>
                    ))}
                    {Object.entries(formData.noOfBlocksPerYear).map(([year, subjects]) => (
                        <>
                            <Grid item xs={2}>
                                <Typography key={year} sx={{ fontSize: 19 }}>
                                    No of Blocks for {year}:
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    defaultValue={subjects}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                {" "}
                            </Grid>
                        </>
                    ))}
                    <Grid item xs={2}>
                        <Typography sx={{ fontSize: 19 }}>Slots Per Day: </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            size="small"
                            defaultValue={formData.paperSlotsPerDay}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        {" "}
                    </Grid>

                    {formData.paperTimeSlots.map((timeSlot, index) => (
                        <>
                            <Grid item xs={2}>
                                <Typography key={index} sx={{ fontSize: 19 }}>
                                    Time Slot {index + 1} :
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    defaultValue={timeSlot.startTime}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            -
                            <Grid item xs={2}>
                                <TextField
                                    size="small"
                                    defaultValue={timeSlot.endTime}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={5}>

                            </Grid>
                        </>
                    ))}
                </Grid>
            </Paper>
            {teacherNames && yearSchedule &&
                yearSchedule.map((year, yearIndex) => (
                    <YearSchedule year={year} key={yearIndex} yearIndex={yearIndex} teacherData={teacherNames} formData={formData} handleInputChange={handleInputChange} handleInputChange1={handleInputChange1} />
                ))}

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
                        onClick={activeStep === steps - 1 ? handleSubmit : handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps - 1 ? "Submit" : "Next"}
                    </Button>
                )}
            </Box>
            <ConfirmationModal
                open={openConfirmationModal}
                onClose={handleConfirmationClose}
                onConfirm={handleConfirmation}
                message={"Are you want to Download the Schedule"}
            />
            <LoadingModal open={loading} />

        </div>
    );
}
