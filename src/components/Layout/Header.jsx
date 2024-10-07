import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { makeStyles, createStyles } from "@mui/styles";
import { config } from "@app/config/index";
import Stack from "@app/component/common/Stack";
import AppBar from "@app/component/common/AppBar";
import ToolBar from "@app/component/common/ToolBar";
import IconButton from "@app/component/common/IconButton";
import Text from "@app/component/common/Text";
import Menu from "@app/component/common/Menu";
import MenuItem from "@app/component/common/MenuItem";

const configRes = config();

const Header = (props) => {
  const { isDrawerExpanded, onDrawerToggle, profileMenuConfig, profileData } =
    props;
  const classes = useStyles();

  const [openProfileLinks, setProfileLinks] = useState(null);
  const { profileURL } = profileData;
  const handleOpen = (e) => {
    setProfileLinks(e.currentTarget);
  };

  const handleClose = () => {
    setProfileLinks(false);
  };

  return (
    <>
      <AppBar
        className={classes.appBarRoot}
        position="sticky"
        elevation={1.5}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <ToolBar sx={{ display: { xs: "auto", lg: "none" } }}>
          {isDrawerExpanded ? null : (
            <IconButton onClick={onDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </ToolBar>

        <ToolBar className={classes.toolBarRoot}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            pr={2}
          >
            <img
              src={
                profileURL
                  ? configRes.imageBaseUrl + profileURL
                  : "/images/profileimage.jpg"
              }
              alt="global-logo"
              width="50"
              height="50"
              style={{ borderRadius: "50%" }}
            />
            <IconButton edge="end" size="medium" onClick={handleOpen}>
              <ArrowDropDownIcon sx={{ fontSize: "2.5rem" }} />
            </IconButton>
            <Menu
              open={Boolean(openProfileLinks)}
              anchorEl={openProfileLinks}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
            >
              {profileMenuConfig.map((item, index) => {
                return (
                  <MenuItem onClick={handleClose}>
                    <Text
                      sx={{
                        textDecoration: "none",
                        color: "#404040",
                        width: "100%",
                      }}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </Text>
                  </MenuItem>
                );
              })}
            </Menu>
          </Stack>
        </ToolBar>
      </AppBar>
    </>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    appBarRoot: {
      backgroundColor: `${theme.palette.secondary.main} !important`,
      color: "#1e1e1e !important",
      flexDirection: "row",
      justifyContent: "space-between",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-end",
      },
      boxShadow: "0px 0px 10px #ebebeb",
    },

    toolBarRoot: {
      justifyContent: "flex-end",
    },
  })
);

export default React.memo(Header);
