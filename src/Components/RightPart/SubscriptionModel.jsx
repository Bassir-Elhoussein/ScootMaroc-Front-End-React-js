import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import VerifiedIcon from "@mui/icons-material/Verified";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const features = [
  "Exclusive access to premium articles",
  "Personalized content recommendations",
  "Early access to new features",
  "Monthly newsletters with industry insights",
  "Ad-free browsing experience",
  "Access to members-only webinars",
  "Priority customer support",
  "Special discounts on products and services",
  "Participation in beta testing for new features"
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid gold",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function SubscriptionModal({open,handleClose}) {
 // const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

  const [plan, setPlan] = React.useState("Annually");

  return (
    <div>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="p-5 rounded-md flex items-center justify-between shadow-lg">
                <h2 className="text-l pr-1">
                "Get exclusive updates on football players by subscribing to our newsletter. Access player profiles, personalized content, and more. Stay informed on the latest news!"
                </h2>
                <VerifiedIcon sx={{ width: 80, height: 80, color: "gold" }} />
              </div>
              <div className="flex justify-between border rounded-full px-5 py-3 bg-gray-50">
                <div>
                  <span 
                    onClick={() => setPlan("Annually")} 
                    className={`${plan === "Annually" ? "text-black" : "text-gray-400"} cursor-pointer`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5">SAVE 20%</span>
                </div>
                <p 
                  onClick={() => setPlan("Monthly")} 
                  className={`${plan === "Monthly" ? "text-black" : "text-gray-400"} cursor-pointer`}
                >
                  Monthly
                </p>
              </div>

              <div className="space-y-3">
                {features.map((item, index) => (
                  <div key={index} className="flex items-center space-x-5">
                    <FiberManualRecordIcon sx={{ width: "7px", height: "7px" }} />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              <div className="cursor-pointer flex justify-center bg-gray-700 text-white rounded-full px-5 py-3">
                <span className="line-through italic">249.00 MAD </span>
                <span className="px-5">199.20 MAD </span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
