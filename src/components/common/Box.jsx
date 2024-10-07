import React from "react";
import MBox from '@mui/material/Box';

const Box = (props) => {
  return <MBox sx={{ width: "100%", ...props.sx }} {...props}  />
}

export default Box;