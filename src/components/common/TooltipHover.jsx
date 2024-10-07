import * as React from 'react';

import MobileResponsive from "components/common/MobileResponsive";

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tooltip:{
    marginBottom:"10px !important"
  }
}));

export default function AnchorElTooltips(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };


  const {
    title = "Title",
    placement = "top",
    children,
    sx,
  } = props;
  const positionRef = React.useRef({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef(null);
  const areaRef = React.useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };


  return (
    <MobileResponsive
      web={() =>
        <Tooltip
          title={title}
          placement={placement}
          arrow
          PopperProps={{
            popperRef,
            anchorEl: {
              getBoundingClientRect: () => {
                return new DOMRect(
                  positionRef.current.x,
                  areaRef.current.getBoundingClientRect().y,
                  0,
                  0,
                );
              },
            },
          }}
        >
          <Box
            ref={areaRef}
            onMouseMove={handleMouseMove}
            sx={sx}
          >
            {children}
          </Box>
        </Tooltip>}

      mobile={() =>
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              classes={{
                tooltip: classes.tooltip
              }}
              PopperProps={{
                disablePortal: true,
              }}
              arrow
              onClose={handleTooltipClose}
              placement={placement}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={title}
            >
              <Box
                sx={sx}
                onClick={handleTooltipOpen}
              >
                {children}
              </Box>
            </Tooltip>
          </div>
        </ClickAwayListener>
      }
    />
  )

}