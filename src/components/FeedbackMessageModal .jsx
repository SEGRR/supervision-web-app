import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";

const FeedbackMessageModal = ({ open, onClose, data, feedbackType }) => {
  const icon =
    feedbackType === "success" ? (
      <CheckCircleOutline style={{ color: "green", fontSize: "48px" }} />
    ) : (
      <ErrorOutline style={{ color: "red", fontSize: "48px" }} />
    );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="feedback-modal-title"
      aria-describedby="feedback-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          boxShadow: 24,
          padding: "24px",
          width: "30%",
          borderRadius: "8px",
          outline: "none",
          textAlign: "center",
        }}
      >
        {icon}
        <Typography variant="h5" id="feedback-modal-description">
          {data.title}
        </Typography>
        <Typography variant="subtitle1" id="feedback-modal-description" dangerouslySetInnerHTML={{ __html: data.message }}>
          {/* {data.message} */}
        </Typography>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginTop: "16px" }}
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default FeedbackMessageModal;
