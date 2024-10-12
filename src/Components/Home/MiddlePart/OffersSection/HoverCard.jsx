import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkIfUserApplied, applyOffer } from "../../../../Store/Offer/Action";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const HoverCard = ({ offer, isApplied  , onImageClick }) => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  
  const [loadingApplied, setLoadingApplied] = useState(false);

  const handleApplyOffer = async () => {
    setLoadingApplied(true); // Start loading before dispatching
    try {
      await dispatch(applyOffer(offer));
    } catch (error) {
      console.error("Error applying to offer:", error);
    } finally {
       // Stop loading after dispatch
    }
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={imageContainerStyles} onClick={() => onImageClick(offer)}>
        <img
          src={offer.backgroundImage || "http://localhost:5000/upload/default.png"}
          alt="Background"
          style={imageStyles}
        /> 
        
      </Box>
      <CardContent sx={contentStyles}>
        <Typography variant="h6" component="div"   sx={{...titleStyles, color: "#D6AD60"}}>
          {offer.position || "Player Name"}
        </Typography>
        <Box sx={infoContainerStyles}>
          <Typography variant="body2" sx={textStyles}>
          Position: {offer.location || "N/A"}
          </Typography>
          
          <Typography variant="body2" sx={textStyles}>
          Height: {offer.height || "N/A"}
          </Typography>
          <Typography variant="body2" sx={textStyles}>
          Preferred Foot: {offer.preferredFoot || "N/A"}
          </Typography>
          <Typography variant="body2" sx={textStyles}>
          Weight: {offer.weight || "N/A"}
          </Typography>
          
          <Typography variant="body2" sx={{ ...textStyles, gridColumn: "1 / -1", textAlign: 'center' }}>
            Education: {offer.education || "N/A"}
          </Typography>
          
        
        </Box>
        {auth.user?.userType === "player" && (
          <>
            {loadingApplied ? (
             <Button 
             variant="contained"
             sx={buttonStylesApplied}
           >
             <DoneAllIcon /> Applied
           </Button>
            ) : isApplied ? (
              <Button 
                variant="contained"
                sx={buttonStylesApplied}
              >
                <DoneAllIcon /> Applied
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={buttonStyles}
                onClick={handleApplyOffer}
              >
                Apply
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const cardStyles = {
  width: "300px",
  height: "400px",
  background: "#000",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: "20px",
  "&::before": {
    content: '""',
    position: "absolute",
    width: "150px",
    height: "150%",
    backgroundImage: "linear-gradient(160deg, #D6AD60, #D6AD60)",
    animation: "rotBGimg 3s linear infinite",
    transition: "all 4.2s linear",
    zIndex: 0,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    background: "#000",
    inset: "5px",
    borderRadius: "20px",
    zIndex: 0,
  },
  "@keyframes rotBGimg": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
  "&:hover::before": {
    backgroundImage: "linear-gradient(180deg, rgb(0, 183, 255), #00d00f)",
    animation: "rotBGimg 3.5s linear infinite",
  },
};

const imageContainerStyles = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "70%",
  zIndex: 1,
  overflow: "hidden",
};

const imageStyles = {
  width: "100%",
  height: "80%",
  objectFit: "cover",
};

const contentStyles = {
 
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2,
  background: "rgba(0, 0, 0, 0)",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
 
};

const titleStyles = {
  color: "white",
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "5px",
};

const infoContainerStyles = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "5px",
  marginBottom: "10px",
};

const textStyles = {
  color: "white",
  fontSize: "0.8rem",
};

const buttonStyles = {
  fontWeight: "bold",
  textTransform: "none",
  transition: "all 0.3s ease",
  backgroundColor: "#D6AD60",
  color: "white",
  borderColor: "#D6AD60",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#D6AD60",
    border: "2px solid #D6AD60",
  },
};

const buttonStylesApplied = {
  fontWeight: "bold",
  textTransform: "none",
  backgroundColor: "transparent",
  color: "#c8fe00",
  border: "2px solid #c8fe00",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#c8fe00",
    border: "2px solid #c8fe00",
  },
};

export default HoverCard;