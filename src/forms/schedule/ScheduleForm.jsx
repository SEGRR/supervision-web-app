import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import ScheduleBasicForm from "./ScheduleBasicForm";
import { useNavigate } from "react-router-dom";
import ScheduleTeacherList from "./ScheduleTeacherList";
import ScheduleReviewSection from "./ScheduleReviewSection";

const steps = ["Enter Basic Details", "Select Teacher", "Review"];

function getStepContent(
  activeStep,
  handleNext,
  handleBack,
  handleClose,
  formData,
  setFormData,
  teacherList,
  setTeacherList
) {
  switch (activeStep) {
    case 0:
      return (
        <ScheduleBasicForm
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleClose={handleClose}
          steps={steps.length}
          formData={formData}
          setFormData={setFormData}
        />
      );
    case 1:
      return (
        <ScheduleTeacherList
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleClose={handleClose}
          steps={steps.length}
          teachers={teacherList}
          setTeachers={setTeacherList}
        />
      );
    case 2:
      return (
        <ScheduleReviewSection
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          handleClose={handleClose}
          steps={steps.length}
          formData={formData}
          selectedTeachers={teacherList}
          teachers={['Teacher A', 'Teacher B', 'Teacher C']}
        />
      );
    default:
      throw new Error("Unknown step");
  }
}

export default function ScheduleForm({ isOpen }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = useState({
    title: "",
    selectedYears: [],
    subjectsPerYear: {},
    paperSlotsPerDay: "",
    paperTimeSlots: [], 
    noOfBlocksPerYear:[],
    semester:"",
    department:""
  });
  const [teacherList, setTeacherList] = useState([]);

  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleClose = (event) => {
    setActiveStep(0);
    navigate("/schedule", { replace: true });
  };

  return (
    <>
      <Container component="main" sx={{ mb: 1 }}>
        <Paper variant="normal" sx={{ p: { xs: 2, md: 1 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create new Schedule
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep !== steps.length
              ? getStepContent(
                  activeStep,
                  handleNext,
                  handleBack,
                  handleClose,
                  formData,
                  setFormData,
                  teacherList,
                  setTeacherList
                )
              : handleClose()}
          </React.Fragment>
        </Paper>
      </Container>
    </>
  );
}
