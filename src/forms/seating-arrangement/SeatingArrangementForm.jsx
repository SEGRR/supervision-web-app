import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import SeatingArrangementBasicDetailsForm from "./SeatingArrangementBasicDetailsForm";
import SeatingArrangementAdditionalDetailsForm from "./SeatingArrangementAdditionalDetailsForm";
import { useNavigate } from "react-router-dom";
import SeatingArrangementTable from "../../components/SeatingArrangementComponents/SeatingArrangementTable";
import { generateSeatingPdfFile } from "../../api/pdf.module";
import ConfirmationModal from "../../components/ConfirmationModal";
import LoadingModal from "../../components/LoadingModal";
import { saveSeating } from "../../api/seating.arragement.api";
const steps = ["Enter Basic Details", "Additional Details", "Review"];

function getStepContent(step, formData, setFormData) {
  switch (step) {
    case 0:
      return <SeatingArrangementBasicDetailsForm formData={formData} setFormData={setFormData} />;
    case 1:
      return <SeatingArrangementAdditionalDetailsForm formData={formData} setFormData={setFormData} />;
    case 2:
      return <SeatingArrangementTable formData={formData} setFormData={setFormData} />
    default:
      throw new Error("Unknown step");
  }
}

export default function SeatingArrangementForm() {

  const [formData, setFormData] = useState({
    title: "",
    selectedAcademicYear: "",
    selectedDepartment: "",
    selectedYears: [],
    divisionsPerYear: {},
    examSlotsPerDay: 0,
    examTimeSlots: [],
    examdays: 0,
    examDates: {},

    selectedClassrooms: [],

  });
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep(activeStep + 1);

    console.log(formData);

  };

  const [openConfirmationModal, setConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmationOpen = () => setConfirmationModal(true);
  const handleConfirmationClose = () => {
    setConfirmationModal(false);
    navigate("/seating-arrangement", { replace: true });
  };



  const handleBack = () => {
    setActiveStep(activeStep - 1);

  };

  const handleClose = () => {

    setActiveStep(0);
    navigate("/seating-arrangement");
  }
  const handleSubmit = async () => {

    console.log("data");
    setLoading(true);
    let data = { ...formData };
    let res = await saveSeating(data);
    handleConfirmationOpen();
    console.log('saved seatings', res);
  };

  const handleConfirmation = () => {
    setLoading(false);
    generateSeatingPdfFile(formData)
    handleConfirmationClose();
  };

  return (
    <>

      <Container component="main" sx={{ mb: 1 }}>
        <Paper variant="normal" sx={{ p: { xs: 2, md: 1 } }}>
          <Typography component="h1" variant="h4" align="center">
            Create Seating Arrangement
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>


            {activeStep !== steps.length ? getStepContent(activeStep, formData, setFormData) : handleClose()}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>

              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button onClick={handleClose} sx={{ mt: 3, ml: 1 }}>
                Close
              </Button>
              {activeStep !== steps.length && (
                <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext} sx={{ mt: 3, ml: 1 }}>
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              )}
            </Box>
          </React.Fragment>
        </Paper>
      </Container>

      <ConfirmationModal
        open={openConfirmationModal}
        onClose={handleConfirmationClose}
        onConfirm={handleConfirmation}
        message={"Are you want to download the seating arrangement ?"}
      />
      <LoadingModal open={loading} />
    </>
  );
}

