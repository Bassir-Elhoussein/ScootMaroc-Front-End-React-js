import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../Store/Auth/Action";
import BackdropComponent from "../../Backdrop/Backdrop";
import "./CompleteRegistration.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh", // Set a max height
  bgcolor: "background.paper",
  border: "2px solid gold",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  position: "relative", // Add relative positioning for the button container
};

const formContainerStyle = {
  flex: 1,
  overflowY: "auto", // Scroll only the form content
  paddingBottom: "30px", // Ensure padding at the bottom for the fixed button
};

const continueButtonStyle = {
  position: "absolute",
  color: "gold",
  bottom: "16px",
  right: "16px",
  padding: "8px 16px",
  borderRadius: "8px",
};
const prevButtonStyle = {
  position: "absolute",
  bottom: "16px",
  color: "black",
  padding: "8px 16px",
  borderRadius: "8px",
};

const textFieldStyle = {
  margin: "20px auto 40px 50px ", // Centers horizontally
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  maxWidth: "400px",
  display: "block", // Ensure the element behaves like a block-level element
};

const CompleteRegistration = ({ handleClose, open }) => {
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleSubmit = (values) => {
    const { birthDay, birthMonth, birthYear, ...rest } = values;
    const birthDate = `${birthYear}-${birthMonth}-${birthDay}`;
    dispatch(updateUserProfile({ ...rest, birthDate }));
    console.log({ ...rest, birthDate });
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      location: "",
      website: "",
      birthDate: "", // Changed from birthDay, birthMonth, and birthYear to a single birthDate field
      email: "",
      password: "",
      mobile: "",
      image: "",
      backgroundImage: "",
      bio: "",
      education: "",
      
      
      height: "", // Should be in meters
      weight: "", // Should be in kilograms
      position: "",
      preferredFoot: "",
      clubAffiliation: "", // Added to match the Java class
      president: "", // Added to match the Java class
      league: "", // Added to match the Java class
      stadium: "" // Added to match the Java class
    },
    onSubmit: (values) => {
      dispatch(updateUserProfile(values));
      console.log(values);
      handleClose();
    },
  });
  

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
  const heights = Array.from({ length: 101 }, (_, i) =>
    (1.4 + i * 0.01).toFixed(2)
  ); // from 1.40m to 2.40m
  const weights = Array.from({ length: 101 }, (_, i) => 40 + i); // from 40kg to 140kg
  const preferredFeet = ["Right", "Left", "Both"];
  const leagues = [
    "Premier League",
    "La Liga",
    "Bundesliga",
    "Serie A",
    "Ligue 1",
    "MLS",
    // Add more leagues as needed
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  useEffect(() => {
    if (auth.user) {
      formik.setValues(auth.user);
    }
  }, [auth.user]);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ width: "100%" }}
                >
                  Complete Registration
                </Typography>
              </div>
              {step === 4 && (
                <Button sx={{ color: "gold" }} type="submit">
                  Save
                </Button>
              )}
            </div>

            <div style={formContainerStyle}>
              {step === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                    sx={textFieldStyle}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                    sx={textFieldStyle}
                  />
                  <TextField
                    fullWidth
                    label="Mobile"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                    sx={textFieldStyle}
                  />
                </>
              )}

              {step === 3 && (
                <>
                  {auth.user?.userType !== "club" && (
                    <TextField
                      select
                      fullWidth
                      label="Education"
                      name="education"
                      value={formik.values.education}
                      onChange={formik.handleChange}
                      variant="outlined"
                      InputProps={{
                        style: {
                          borderRadius: "8px",
                        },
                      }}
                      sx={textFieldStyle}
                    >
                      {educationOptions.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  <TextField
                    select
                    fullWidth
                    label="Location"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    variant="outlined"
                    InputProps={{
                      style: {
                        borderRadius: "8px",
                      },
                    }}
                    sx={textFieldStyle}
                  >
                    {locationOptions.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                </>
              )}

              {step === 4 && (
                <>
                  {auth.user?.userType === "player" && (
                    <>
                      <TextField
                        select
                        fullWidth
                        label="Position"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      >
                        {positions.map((position) => (
                          <MenuItem key={position} value={position}>
                            {position}
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
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      >
                        {heights.map((height) => (
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
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      >
                        {weights.map((weight) => (
                          <MenuItem key={weight} value={weight}>
                            {weight}
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
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      >
                        {preferredFeet.map((foot) => (
                          <MenuItem key={foot} value={foot}>
                            {foot}
                          </MenuItem>
                        ))}
                      </TextField>
                    </>
                  )}
                  {auth.user?.userType === "club" && (
                    <>
                      <TextField
                        fullWidth
                        label="Stadium"
                        name="stadium"
                        value={formik.values.stadium}
                        onChange={formik.handleChange}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      />

                      <TextField
                        select
                        fullWidth
                        label="League"
                        name="league"
                        value={formik.values.league}
                        onChange={formik.handleChange}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      >
                        {leagues.map((league) => (
                          <MenuItem key={league} value={league}>
                            {league}
                          </MenuItem>
                        ))}
                      </TextField>

                      <TextField
                        
                        fullWidth
                        label="President"
                        name="president"
                        value={formik.values.president}
                        onChange={formik.handleChange}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      />
                       
                    </>
                  )}
                   {auth.user?.userType === "scooter" && (
                    <>
                      <TextField
                        fullWidth
                        label="Club Affiliation"
                        name="clubAffiliation"
                        value={formik.values.clubAffiliation}
                        onChange={formik.handleChange}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: "8px",
                          },
                        }}
                        sx={textFieldStyle}
                      />

                      
                       
                    </>
                  )}
                </>
              )}
            </div>

            <div>
              {step > 1 && (
                <Button tyle={prevButtonStyle} onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {step < 4 && (
                <Button style={continueButtonStyle} onClick={handleNext}>
                  Continue
                </Button>
              )}
            </div>
          </form>
          <BackdropComponent open={uploading} />
        </Box>
      </Modal>
    </div>
  );
};

export default CompleteRegistration;
