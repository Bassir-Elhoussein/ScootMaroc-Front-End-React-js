import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AuthModel from "./AuthModel";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogleAction } from "../../Store/Auth/Action";

import Logo_white from "../../Darklogo.png";
const Authentication = () => {
  const [authModelOpen, setAuthModelOpen] = useState(false);
  const { auth } = useSelector((store) => store);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuthModelClose = () => {
    setAuthModelOpen(false);
    navigate("/");
  };

  const handleAuthModelOpen = (path) => {
    setAuthModelOpen(true);
    navigate(path);
  };

  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      setAuthModelOpen(true);
    }
  }, [location.pathname]);

  const loginWithGoole = (res) => {
    console.log("res : ", res);
    dispatch(loginWithGoogleAction(res));
    // return
  };

  return (
    <div className="">
      {" "}
      <Grid className="overflow-y-hidden" container>
        <Grid className="hidden lg:block" item lg={7}>
          <img
            className="w-full h-screen"
            src="https://i.pinimg.com/736x/ac/d2/dc/acd2dcf618eb70f543cd68819182b3fd.jpg"
            alt=""
          />

          <div className="absolute top-[26%] left-[19%]">
            <img
              src={Logo_white}
              alt="Logo"
              height="450"
              width="450"
              className="r-jwli3a r-4qtqp9 r-yyyyoo r-labphf r-1777fci r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
            />
          </div>

          {/* 
        <img className=" w-[50rem] absolute -top-5" src="https://cdn.pixabay.com/photo/2021/03/02/12/04/twitter-6062249_640.png" alt="" /> */}
        </Grid>
        <Grid
          item
          lg={5}
          xs={12}
          className="flex flex-col justify-center items-center bg-black text-white p-10"
        >
          <div className="w-full max-w-sm">
            <div className="py-6 text-center"></div>
            <h1 className="font-bold text-6xl text-center mb-10 css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3">
              Happening now
            </h1>
            <h2 className="font-bold text-3xl text-center mb-10 css-1jxf684 r-bcqeeo r-1ttztb7 r-qvutc0 r-poiln3">
              Join today.
            </h2>

            <GoogleLogin
              onSuccess={loginWithGoole}
              onError={() => console.log("Login Failed")}
              className="w-full"
            />
            <p className="py-5 text-center">OR</p>

            <Button
              onClick={() => handleAuthModelOpen("/signup")}
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: "9999px",
                paddingY: "12px",
                backgroundColor: "#D6AD60",
                "&:hover": {
                  backgroundColor: "#D6AD60", // Hover: background color
                  color: "white", // Hover: text color
                  borderColor: "#D6AD60", // Hover: border color
                },
              }}
              size="large"
            >
              Create account
            </Button>
            <p className="text-sm text-center mt-4">
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </p>
            <div className="mt-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                Already have an account?
              </h3>
              <Button
                onClick={() => handleAuthModelOpen("/signin")}
                variant="outlined"
                sx={{
                  width: "100%",
                  borderRadius: "9999px",
                  paddingY: "12px",
                  borderColor: "#D6AD60",
                  color: "#D6AD60",
                  "&:hover": {
       // Hover: background color
      color: "white", // Hover: text color
      borderColor: "#D6AD60", // Hover: border color
    },
                }}
                size="large"
              >
                Sign in
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <AuthModel isOpen={authModelOpen} handleClose={handleAuthModelClose} />
    </div>
  );
};

export default Authentication;
