import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Backdrop, Box, Button, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { BusinessCenterSharp } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";
import StraightenIcon from "@mui/icons-material/Straighten";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import {
  findTwitsByLikesContainUser,
  getUsersTweets,
  likeTweet,
} from "../../Store/Tweet/Action";
import './playercard.css';
import TwitCard from "../Home/MiddlePart/TwitCard/TwitCard";
import ProfileModel from "./ProfileModel";
import { FollowUserAction, findUserById,getUserProfile } from "../../Store/Auth/Action";
import SnackbarComponent from "../Snackbar/SnackbarComponent";
import BadgeIcon from "@mui/icons-material/Badge";
import StadiumIcon from "@mui/icons-material/Stadium";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import Groups2Icon from "@mui/icons-material/Groups2";
import PlayerCard from "./PlayerCard";

const Profile = () => {
  const [tabValue, setTabValue] = React.useState("1");
  const { auth, twit, theme } = useSelector((store) => store);
  const [openProfileModel, setOpenProfileModel] = useState();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  console.log("User type:", auth.findUser?.userType);
  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 4) {
      dispatch(findTwitsByLikesContainUser(param.id));
    } else if (newValue === 1) {
      dispatch(getUsersTweets(param.id));
    }
  };
  useEffect(() => {
    dispatch(getUsersTweets(param.id));
    dispatch(findTwitsByLikesContainUser(param.id));
  }, [param.id, twit.retwit]);

  useEffect(() => {
    dispatch(findUserById(param.id));
  }, [param.id, auth.user]);
 
  
  useEffect(() => {
    setOpenSnackBar(auth.updateUser);
  }, [auth.updateUser]);

  const handleCloseProfileModel = () => setOpenProfileModel(false);

  const handleOpenProfileModel = () => setOpenProfileModel(true);

  const handleCloseSnackBar = () => setOpenSnackBar(false);

  const handleFollowUser = () => {
    dispatch(FollowUserAction(param.id));
  };

  // console.log("find user ",auth.findUser)

  return (
    <React.Fragment>
      <section
        className={`z-50 flex items-center sticky top-0 ${
          theme.currentTheme === "light" ? "bg-white" : "bg-[#0D0D0D]"
        } bg-opacity-95`}
      >
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">
          {auth.findUser?.fullName}
        </h1>
      </section>
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src={
            auth.findUser?.backgroundImage ||
            "https://www.shutterstock.com/image-photo/panorama-green-grass-top-view-600nw-2175771695.jpg"
          }
          alt=""
        />
      </section>

      <section className="pl-6">
        <div className=" flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            alt="Avatar"
            src={auth.findUser?.image}
            className="transform -translate-y-24 "
            sx={{ width: "10rem", height: "10rem", border: "4px solid #D6AD60" }}
          />
          {auth.findUser?.req_user ? (
            <Button
              onClick={handleOpenProfileModel}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              className="rounded-full"
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
              variant="outlined"
              className="rounded-full"
            >
              {auth.findUser?.followed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div>
          <div>
            <div className="flex items-center">
              <h1 className="font-bold text-lg">{auth.findUser?.fullName}</h1>
              {auth.findUser?.verified && (
                <img
                  className="ml-2 w-5 h-5"
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                  alt=""
                />
              )}
            </div>
            <h1 className="text-gray-500">
              @{auth.findUser?.fullName?.toLowerCase()}
            </h1>
          </div>

          <div className="mt-4 space-y-5">
            {auth.findUser?.bio && <p>{auth.findUser?.bio}</p>}
            <div className="flex items-center space-x-5">
              <div className="flex items-center space-x-1 font-semibold">
                <span className="text-[#D6AD60]">
                  {auth.findUser?.followings.length}
                </span>
                <span className="text-gray-400">Following</span>
              </div>
              <div className="flex items-center space-x-1 font-semibold">
                <span className="text-[#D6AD60]">
                  {auth.findUser?.followers.length}
                </span>
                <span className="text-gray-400">Followers</span>
              </div>
            </div>
            {auth.findUser?.userType === "player" && (
              <>
                <div className="flex items-center  ">
                  <LocationOnIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.location}</p>
                </div>
                <div className="flex items-center ">
                  <BusinessCenterSharp className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.education}</p>
                </div>

                <div className="flex items-center ">
                  <MonitorWeightIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.weight}</p>
                </div>
                <div className="flex items-center ">
                  <StraightenIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.height}</p>
                </div>
                <div className="flex items-center ">
                  <TransferWithinAStationIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.preferredFoot}</p>
                </div>
                <div className="flex items-center ">
                  <ControlCameraIcon className="text-[#D6AD60]" />
                  <h2 className="ml-2">{auth.findUser?.position}</h2>
                </div>
              </>
            )}
            {auth.findUser?.userType === "club" && (
              <>
                <div className="flex items-center ">
                  <LocationOnIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.location}</p>
                </div>
                <div className="flex items-center ">
                  <BadgeIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.president}</p>
                </div>
                <div className="flex items-center ">
                  <SportsSoccerIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.league}</p>
                </div>
                <div className="flex items-center ">
                  <StadiumIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.stadium}</p>
                </div>
                <div className="flex items-center ">
                  <CalendarMonthIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.birthDate}</p>
                </div>
              </>
            )}

            {auth.findUser?.userType === "scooter" && (
              <>
                <div className="flex items-center space-x-5">
                  <LocationOnIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.location}</p>
                </div>
                <div className="flex items-center space-x-5">
                  <BusinessCenterSharp className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.education}</p>
                </div>
                <div className="flex items-center space-x-5">
                  <MailOutlineIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.email}</p>
                </div>
                <div className="flex items-center space-x-5">
                  <PermPhoneMsgIcon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.mobile}</p>
                </div>

                <div className="flex items-center space-x-5">
                  <Groups2Icon className="text-[#D6AD60]" />
                  <p className="ml-2">{auth.findUser?.clubAffiliation}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
     
      <section>
        <Box sx={{ width: "100%", typography: "body1", marginTop: "20px" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Posts" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Offers" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {twit.twits?.map((item) => (
                <TwitCard twit={item} />
              ))}
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">
              {twit.likedTwits?.map((item) => (
                <TwitCard twit={item} />
              ))}
            </TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModel
          open={openProfileModel}
          handleClose={handleCloseProfileModel}
        />
      </section>
      <section>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={twit.loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </section>
      <section>
        <SnackbarComponent
          handleClose={handleCloseSnackBar}
          open={openSnackBar}
          message={"user updated successfully"}
        />
      </section>
    </React.Fragment>
  );
};

export default Profile;
