import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerUser } from "../../Store/Auth/Action";

const SignupForm = () => {
  const dispatch = useDispatch();

  // State to hold selected month, year, and days array
  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);

  // Months array
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

  // Years array
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  // Function to check if a year is a leap year
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Function to get the number of days in a month
  const getDaysInMonth = (month, year) => {
    switch (month) {
      case 2:
        return isLeapYear(year) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  };

  // Update days whenever the selected month or year changes
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }, [selectedMonth, selectedYear]);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    userType: Yup.string().required("User Type is required"),
    birthDate: Yup.object().shape({
      day: Yup.string().required("Day is required"),
      month: Yup.string().required("Month is required"),
      year: Yup.string().required("Year is required"),
    }),
  });
  

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      userType: "",
      birthDate: {
        day: "",
        month: "",
        year: "",
      },
    },
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values.birthDate;
      const birthDate = `${year}-${month}-${day}`;
      values.birthDate = birthDate;

      console.log(values);
      dispatch(registerUser(values));
    },
  });

  const handleDateChange = (name) => (event) => {
    formik.setFieldValue("birthDate", {
      ...formik.values.birthDate,
      [name]: event.target.value,
    });

    if (name === "month") setSelectedMonth(Number(event.target.value));
    if (name === "year") setSelectedYear(Number(event.target.value));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="fullName"
            label="Full Name"
            fullWidth
            variant="outlined"
            size="large"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="w-full"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Date</InputLabel>
          <Select
            name="day"
            value={formik.values.birthDate.day}
            onChange={handleDateChange("day")}
            onBlur={formik.handleBlur}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            className="w-full"
          >
            {days.map((day) => (
              <MenuItem key={day} value={day}>
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Month</InputLabel>
          <Select
            name="month"
            value={formik.values.birthDate.month}
            onChange={handleDateChange("month")}
            onBlur={formik.handleBlur}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            className="w-full"
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            value={formik.values.birthDate.year}
            onChange={handleDateChange("year")}
            onBlur={formik.handleBlur}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            className="w-full"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          {formik.touched.birthDate && formik.errors.birthDate && (
            <div className="text-red-500">{formik.errors.birthDate}</div>
          )}
        </Grid>
        <Grid item xs={12}>
          <InputLabel>User Type</InputLabel>
          <Select
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userType && Boolean(formik.errors.userType)}
            className="w-full"
          >
            <MenuItem value="club">Club</MenuItem>
            <MenuItem value="scooter">Scooter</MenuItem>
            <MenuItem value="player">Player</MenuItem>
          </Select>
          {formik.touched.userType && formik.errors.userType && (
            <div style={{ color: "red", marginTop: "8px" }}>
              {formik.errors.userType}
            </div>
          )}
        </Grid>
        <Grid className="mt-20" item xs={12}>
          <Button
            type="submit"
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#D6AD60",
            }}
            variant="contained"
            size="large"
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;
