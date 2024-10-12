import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup"; // Added Yup for validation
import { uploadToCloudinary } from "../../../../Utils/UploadToCloudinary";
import SnackbarComponent from "../../../Snackbar/SnackbarComponent";
import BackdropComponent from "../../../Backdrop/Backdrop";

import { createOffer } from "../../../../Store/Offer/Action"; // Corrected import path
                                
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#000000",
  boxShadow: 24,
  border: "2px solid gold",
  p: 2,
  borderRadius: 3,
  outline: "none",
  overflow: "hidden",
};

const educationOptions = [
  { value: "MiddleSchool", label: "Middle School" },
  { value: "HighSchool", label: "High School" },
  { value: "AssociateDegree", label: "Associate Degree" },
  { value: "College", label: "College" },
  { value: "Bachelors", label: "Bachelor's Degree" },
  { value: "Masters", label: "Master's Degree" },
  { value: "Other", label: "Other" },
];

const locationOptions = [
  { value: "Agadir", label: "Agadir" },
  { value: "Al Hoceima", label: "Al Hoceima" },
  { value: "Asilah", label: "Asilah" },
  { value: "Azilal", label: "Azilal" },
  { value: "Beni Mellal", label: "Beni Mellal" },
  { value: "Casablanca", label: "Casablanca" },
  { value: "Chefchaouen", label: "Chefchaouen" },
  { value: "Dakhla", label: "Dakhla" },
  { value: "El Jadida", label: "El Jadida" },
  { value: "Errachidia", label: "Errachidia" },
  { value: "Essaouira", label: "Essaouira" },
  { value: "Fes", label: "Fes" },
  { value: "Guelmim", label: "Guelmim" },
  { value: "Ifrane", label: "Ifrane" },
  { value: "Kenitra", label: "Kenitra" },
  { value: "Khemisset", label: "Khemisset" },
  { value: "Ksar el-Kebir", label: "Ksar el-Kebir" },
  { value: "Laayoune", label: "Laayoune" },
  { value: "Larache", label: "Larache" },
  { value: "Marrakech", label: "Marrakech" },
  { value: "Meknes", label: "Meknes" },
  { value: "Mohammedia", label: "Mohammedia" },
  { value: "Nador", label: "Nador" },
  { value: "Ouarzazate", label: "Ouarzazate" },
  { value: "Ouezzane", label: "Ouezzane" },
  { value: "Oujda", label: "Oujda" },
  { value: "Rabat", label: "Rabat" },
  { value: "Safi", label: "Safi" },
  { value: "Settat", label: "Settat" },
  { value: "Smara", label: "Smara" },
  { value: "Tan-Tan", label: "Tan-Tan" },
  { value: "Taroudant", label: "Taroudant" },
  { value: "Taza", label: "Taza" },
  { value: "Tetouan", label: "Tetouan" },
  { value: "Tiznit", label: "Tiznit" },
  { value: "Tangier", label: "Tangier" },
];

const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
const heights = Array.from({ length: 101 }, (_, i) => (1.4 + i * 0.01).toFixed(2));
const weights = Array.from({ length: 101 }, (_, i) => 40 + i);
const preferredFeet = ["Right", "Left", "Both"];

const validationSchema = Yup.object({
  location: Yup.string().required("Location is required"),
  education: Yup.string().required("Education is required"),
  
  height: Yup.string().required("Height is required"),
  weight: Yup.string().required("Weight is required"),
  position: Yup.string().required("Position is required"),
  preferredFoot: Yup.string().required("Preferred foot is required"),
});

const MakeOffer = () => {
  const { theme ,offer,auth} = useSelector((store) => store);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    const offerData = {
      location: values.location,
      education: values.education,
      details: values.details,
      backgroundImage: values.backgroundImage,
      height: values.height,
      weight: values.weight,
      position: values.position,
      preferredFoot: values.preferredFoot,
    };

    dispatch(createOffer(offerData));
    setOpenSnackBar(true);
    resetForm(); // Reset the form fields
    console.log(offerData);
  };
  const [openSnackBar, setOpenSnackBar] = useState(false);
  useEffect(() => {
    
      setOpenSnackBar(auth.status);
    
  }, [offer.status]);

  const handleCloseSnackBar = () => setOpenSnackBar(false);
  // Use handleSubmit function in formik onSubmit
  const formik = useFormik({
    initialValues: {
      location: "",
      education: "",
      details: "",
     backgroundImage: "",
      height: "",
      weight: "",
      position: "",
      preferredFoot: "",
    },
    validationSchema,
    onSubmit: handleSubmit, // Assign handleSubmit here
  });
  

  const handleImageChange = async (event) => {
    setUploading(true);
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadToCloudinary(file, "image");
        formik.setFieldValue("backgroundImage", url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        border: "2px solid #D6AD60",
        p: 3,
        maxWidth: 800,
        margin: "auto",
        backgroundColor: theme.currentTheme === "light" ? "white" : "black",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <h1>Make a Offer</h1>
        </Box>

        <Box sx={{ mb: 3 }}>
          <div className="relative flex justify-center items-center">
          {formik.values.backgroundImage ? (
        <img
          src={formik.values.backgroundImage}
          alt="Background"
          className="w-80 h-[20rem] object-cover border-3 border-[#FFD700] rounded-lg"
        />
      ) : (
        <div className="w-80 h-[20rem] border-3 border-[#FFD700] rounded-lg flex items-center justify-center">
        <CropOriginalIcon style={{ color: '#D6AD60', fontSize: '5rem' }} />
      </div>
      
      )}
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
              name="backgroundImage"
            />
          </div>
        </Box>

        <TextField
          select
          fullWidth
          label="Location"
          name="location"
          value={formik.values.location}
          onChange={formik.handleChange}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
          sx={{ mb: 2 }}
        >
          {locationOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Education"
          name="education"
          value={formik.values.education}
          onChange={formik.handleChange}
          error={formik.touched.education && Boolean(formik.errors.education)}
          helperText={formik.touched.education && formik.errors.education}
          sx={{ mb: 2 }}
        >
          {educationOptions.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>

        

        <TextField
          select
          fullWidth
          label="Height (m)"
          name="height"
          value={formik.values.height}
          onChange={formik.handleChange}
          error={formik.touched.height && Boolean(formik.errors.height)}
          helperText={formik.touched.height && formik.errors.height}
          sx={{ mb: 2 }}
        >
          {heights.map(height => (
            <MenuItem key={height} value={height}>
              {height}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Weight (kg)"
          name="weight"
          value={formik.values.weight}
          onChange={formik.handleChange}
          error={formik.touched.weight && Boolean(formik.errors.weight)}
          helperText={formik.touched.weight && formik.errors.weight}
          sx={{ mb: 2 }}
        >
          {weights.map(weight => (
            <MenuItem key={weight} value={weight}>
              {weight}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Position"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
          sx={{ mb: 2 }}
        >
          {positions.map(position => (
            <MenuItem key={position} value={position}>
              {position}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Preferred Foot"
          name="preferredFoot"
          value={formik.values.preferredFoot}
          onChange={formik.handleChange}
          error={formik.touched.preferredFoot && Boolean(formik.errors.preferredFoot)}
          helperText={formik.touched.preferredFoot && formik.errors.preferredFoot}
          sx={{ mb: 2 }}
        >
          {preferredFeet.map(foot => (
            <MenuItem key={foot} value={foot}>
              {foot}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Details"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          error={formik.touched.details && Boolean(formik.errors.details)}
          helperText={formik.touched.details && formik.errors.details}
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button 
      type="submit" 
      variant="contained" 
      sx={{ 
        // Fully rounded corners
    py: "12px", // Padding on the Y-axis (top & bottom)
    backgroundColor: "transparent",
    color: "#D6AD60", // Initial text color
        fontWeight: "bold",
        textTransform: "none", // Keeps text as-is, no uppercase
        border: "2px solid #D6AD60", // Initial border color
        transition: "all 0.3s ease", // Smooth transition for all properties
        "&:hover": {
          backgroundColor: "#D6AD60", // Hover: background color
          color: "white", // Hover: text color
          borderColor: "#D6AD60", // Hover: border color
        }, }}
    >
            Publish the Offer
          </Button>
        </Box>
      </form>

      <BackdropComponent open={uploading} />
      <section>
      
      <SnackbarComponent
        handleClose={handleCloseSnackBar}
        open={openSnackBar}
        message={"Offer created successfully"}
      />
      </section>
    </Paper>
       
  );
};

export default MakeOffer;
