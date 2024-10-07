import React from "react";
import MAlert from '@mui/material/Alert';


const Alert = ({ children, ...restProps }) => {

  return (
    <MAlert {...restProps}>
      {children}
    </MAlert>
  )
}


export default Alert;