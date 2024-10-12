import React from 'react';
import {
  Box,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HoverCard from "./HoverCard";

const OfferCardModal = ({ handleClose, open, offer, isApplied }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
    outline: "none",
    maxWidth: "120vw",
    maxHeight: "120vh",
    overflow: "auto",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: 'grey.500' }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ mt: 2 }}>
          <HoverCard offer={offer} isApplied={isApplied} isInModal={true} />
        </Box>
      </Box>
    </Modal>
  );
};

export default OfferCardModal;