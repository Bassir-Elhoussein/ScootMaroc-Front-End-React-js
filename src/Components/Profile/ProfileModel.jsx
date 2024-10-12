import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { uploadToCloudinary } from "../../Utils/UploadToCloudinary";
import BackdropComponent from "../Backdrop/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../Store/Auth/Action";
import "./ProfileModel.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "2px solid gold",
  p: 2,
  borderRadius: 3,
  outline: "none",
  overflowY: "hidden",
  overflowX: "hidden",
};

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i
);
// New education options
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

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const ProfileModel = ({ handleClose, open }) => {
  const [uploading, setUploading] = useState(false);
  const [days, setDays] = useState([]);
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
      website: "",
      location: "",
      education: "i",
      bio: "",
      backgroundImage: "",
      image: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      email: "",
      password: "",
      mobile: "",
      president:"",

      clubAffiliation:"",
      league:"",
      stadium:"",
      height: "",
      weight: "",
      position: "",
      preferredFoot: "",
    },
    onSubmit: handleSubmit,
  });
  const leagues = [
    "Premier League",
    "La Liga",
    "Bundesliga",
    "Serie A",
    "Ligue 1",
    "MLS",
    // Add more leagues as needed
  ];
  useEffect(() => {
    if (auth.user) {
      const { birthDate, ...rest } = auth.user;
      const [birthDay, birthMonth, birthYear] = birthDate
        ? birthDate.split("-")
        : [];
      formik.setValues({
        ...rest,
        birthDay: birthDay || "",
        birthMonth: birthMonth || "",
        birthYear: birthYear || "",
      });
    }
  }, [auth.user]);

  useEffect(() => {
    if (formik.values.birthMonth && formik.values.birthYear) {
      const daysInMonth = getDaysInMonth(
        formik.values.birthMonth,
        formik.values.birthYear
      );
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    } else {
      setDays([]);
    }
  }, [formik.values.birthMonth, formik.values.birthYear]);

  const handleImageChange = async (event) => {
    setUploading(true);
    const { name } = event.target;
    const file = event.target.files[0];
    if (file) {
      try {
        const url = await uploadToCloudinary(file, "image");
        formik.setFieldValue(name, url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };

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
                <p>Edit Profile</p>
              </div>
              <Button type="submit" sx={{ color: "gold" }}>
                Save
              </Button>
            </div>

            <div className="customeScrollbar overflow-y-scroll h-[80vh]">
              <div className="w-full">
                <div className="relative">
                  <img
                    src={
                      formik.values.backgroundImage ||
                      "https://www.shutterstock.com/image-photo/panorama-green-grass-top-view-600nw-2175771695.jpg"
                    }
                    alt="Background"
                    className="w-full h-[12rem] object-cover"
                  />
                  <input
                    type="file"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    name="backgroundImage"
                  />
                </div>
              </div>

              <div className="relative -translate-y-20 translate-x-4 h-[6rem]">
                <Avatar
                  src={formik.values.image}
                  alt="Profile"
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    border: "4px solid white",
                  }}
                />
                <input
                  type="file"
                  className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  name="image"
                />
              </div>

              <div className="space-y-3">
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  label="Mobile"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={formik.values.website}
                  onChange={formik.handleChange}
                />

                <TextField
                  select
                  fullWidth
                  label="Location"
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                >
                  {locationOptions.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  name="bio"
                  value={formik.values.bio}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Birth Date Section */}
              <div className="my-3">
                <p className="text-lg">Birth date</p>
                <div className="flex space-x-3">
                  <TextField
                    select
                    label="Day"
                    name="birthDay"
                    value={formik.values.birthDay}
                    onChange={formik.handleChange}
                    sx={{ width: "150px" }}
                  >
                    {days.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Month"
                    name="birthMonth"
                    value={formik.values.birthMonth}
                    onChange={formik.handleChange}
                    sx={{ width: "150px" }}
                  >
                    {months.map(({ value, label }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Year"
                    name="birthYear"
                    value={formik.values.birthYear}
                    onChange={formik.handleChange}
                    sx={{ width: "150px" }}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              
              
              
                <div className="space-y-4">
                 {auth.user?.userType === "club" && (
                <> <TextField
                    fullWidth
                    label="Stadium"
                    name="stadium"
                    value={formik.values.stadium}
                    onChange={formik.handleChange}
                    
                    
                  />

                  <TextField
                    select
                    fullWidth
                    label="League"
                    name="league"
                    value={formik.values.league}
                    onChange={formik.handleChange}
                    
                  
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
                    
                  
                  />
                   </>
              )}</div>
               {auth.user?.userType !== "club" && (
                <><div className="space-y-4">
                <TextField
                  select
                  fullWidth
                  label="Education"
                  name="education"
                  value={formik.values.education}
                  onChange={formik.handleChange}
                  className="space-p-4"
                  style={{ marginBottom: '16px' }}
                >
                  {educationOptions.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </TextField>
                
                </div>
                </>
              )}
              {auth.user?.userType === "player" && (
                <>
                
              <div className="space-y-4">
                <TextField
                  select
                  label="Position"
                  name="position"
                  value={formik.values.position}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {positions.map((position) => (
                    <MenuItem key={position} value={position}>
                      {position}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Height (m)"
                  name="height"
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {heights.map((height) => (
                    <MenuItem key={height} value={height}>
                      {height}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Weight (kg)"
                  name="weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  fullWidth
                  sx={{
                    "& .MuiSelect-select": {
                      overflow: "hidden",
                    },
                    "& .MuiSelect-select::-webkit-scrollbar": {
                      display: "none",
                    },
                    "& .MuiSelect-select": {
                      msOverflowStyle: "none" /* IE and Edge */,
                      scrollbarWidth: "none" /* Firefox */,
                    },
                  }}
                >
                  {weights.map((weight) => (
                    <MenuItem key={weight} value={weight}>
                      {weight}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  label="Preferred Foot"
                  name="preferredFoot"
                  value={formik.values.preferredFoot}
                  onChange={formik.handleChange}
                  fullWidth
                >
                  {preferredFeet.map((foot) => (
                    <MenuItem key={foot} value={foot}>
                      {foot}
                    </MenuItem>
                  ))}
                </TextField>
              </div> 
              </>
            )}
             {auth.user?.userType == "scooter" && (
                <><div className="space-y-4">
                <TextField
                  
                  fullWidth
                  label="Club Affiliation"
                  name="clubAffiliation"
                  value={formik.values.clubAffiliation}
                  onChange={formik.handleChange}
                  className="space-p-4"
                  style={{ marginBottom: '16px' }}
                />
                  
                
                </div>
                </>
              )}
            </div>

            <BackdropComponent open={uploading} />
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModel;
