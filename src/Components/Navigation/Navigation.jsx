import React from "react";
import { navigationMenu } from "../../Utils/NavigationMenu";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";
import { useNavigate } from "react-router-dom";
import Logodark from "../../Darklogo.png";
import Logowhite from "../../Whitelogo.png";
import { useTheme } from "@mui/material/styles";

const Navigation = () => {
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openLogoutMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isPlayer = auth.user?.userType !== "player";

  const handleOpenLogoutMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <div className="h-screen sticky top-0 ">
      <div>
        <div className="py-5">
          {/* Conditionally render the logo based on the current theme */}
          <img
            src={theme.palette.mode === "dark" ? Logodark : Logowhite}
            alt="Logo"
            style={{ width: "150px", height: "auto", marginLeft: "20px" }}
          />
        </div>
        <div className="space-y-6">
        {navigationMenu.map((item) => {
            // Don't render "Make Offer" if the user is a player
            if (item.title === "Make Offer" && auth.user?.userType === "player") {
              return null;
            }

            return (
              <div
                key={item.title}
                onClick={() =>
                  item.title === "Profile"
                    ? navigate(`/profile/${auth.user?.id}`)
                    : navigate(`/${item.title.toLowerCase()}`)
                }
                className="cursor-pointer flex space-x-3 items-center"
              >
                {item.icon}
                <p className="text-xl">{item.title}</p>
              </div>
            )
          })}
        </div>
        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              borderRadius: "9999px", // Fully rounded corners
              py: "12px", // Padding on the Y-axis (top & bottom)
              backgroundColor: "transparent", // Initial background (transparent)
              color: "#D6AD60", // Initial text color
              fontWeight: "bold",
              textTransform: "none", // Keeps text as-is, no uppercase
              border: "2px solid #D6AD60", // Initial border color
              transition: "all 0.3s ease", // Smooth transition for all properties
              "&:hover": {
                backgroundColor: "#D6AD60", // Hover: background color
                color: "white", // Hover: text color
                borderColor: "#D6AD60", // Hover: border color
              },
            }}
            variant="contained"
            size="large"
          >
            Post
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            onClick={() => navigate(`/profile/${auth.user?.id}`)}
            className="cursor-pointer flex space-x-3 items-center"
          >
            <Avatar alt="Remy Sharp" src={auth.user?.image} />
          </div>

          <div>
            <p className="font-bold">{auth.user?.fullName}</p>
            <p className="opacity-70">@{auth.user?.fullName.split(" ")[0]}</p>
          </div>
        </div>
        <Button
          id="basic-button"
          aria-controls={openLogoutMenu ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openLogoutMenu ? "true" : undefined}
          onClick={handleOpenLogoutMenu}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openLogoutMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Navigation;
