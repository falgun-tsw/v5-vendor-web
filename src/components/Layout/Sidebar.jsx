import React from "react";
import { makeStyles, createStyles, useTheme } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import SidebarMenu from "@app/component/Layout/SidebarMenu";
import Box from "@app/component/common/Box";
import Image from "@app/component/common/Image";
import Drawer from "@app/component/common/Drawer";
import Avatar from "@app/component/common/Avatar";
import IconButton from "@app/component/common/IconButton";
import cx from "classnames";
const drawerWidth = 240;

const Sidebar = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const MEDIA_LG_UP = useMediaQuery(theme.breakpoints.up("lg"));

  const { isDrawerExpanded, onDrawerToggle, menuConfig = [] } = props;

  return (
    <Drawer
      variant={MEDIA_LG_UP ? "permanent" : "temporary"}
      open={isDrawerExpanded}
      onClose={() => onDrawerToggle(false)}
      classes={{
        root: cx({
          [classes.drawerRoot]: true,
          [classes.drawerExpanded]: isDrawerExpanded,
          [classes.drawerCollapsed]: !isDrawerExpanded,
        }),
        paper: cx({
          [classes.drawerPaper]: true,
          [classes.drawerExpanded]: isDrawerExpanded,
          [classes.drawerCollapsed]: !isDrawerExpanded,
        }),
      }}
    >
      {isDrawerExpanded ? (
        <Box
          className={cx({
            [classes.drawerHeader]: true,
            [classes.drawerHeaderExpanded]: isDrawerExpanded,
          })}
          onClick={() => onDrawerToggle(false)}
        >
          <Image
            alt="v5"
            imgStyle={{ width: "auto", maxWidth: "100%" }}
            src="/images/logo.png"
            width="auto"
            height={38}
            classes={{ root: classes.logoWrap }}
          />

          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          className={cx({
            [classes.drawerHeader]: true,
            [classes.drawerHeaderCollapsed]: !isDrawerExpanded,
          })}
          onClick={() => onDrawerToggle(true)}
        >
          <Avatar
            src="/images/v5_small_logo.png"
            sx={{ height: 38, width: 38 }}
            variant="rounded"
            style={{ cursor: "pointer" }}
          />
        </Box>
      )}

      <SidebarMenu
        isDrawerExpanded={isDrawerExpanded}
        menuConfig={menuConfig}
      />
    </Drawer>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    logoWrap: { display: "block", marginLeft: "8px", maxWidth: "150px" },
    drawerRoot: {
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      border: `0 !important`,
      // backgroundColor: `${theme.palette.primary.light} !important`,
    },
    drawerExpanded: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerCollapsed: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(9),
    },

    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    drawerHeaderExpanded: {
      justifyContent: "space-between",
    },
    drawerHeaderCollapsed: {
      justifyContent: "center",
    },
  })
);

export default React.memo(Sidebar);
