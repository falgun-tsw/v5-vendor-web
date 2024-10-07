import React from "react";
import TabPanel from "@mui/lab/TabPanel";

const MTabPanel = (props) => {
    const { children, value, ...restProps } = props;
  
    return (
       <TabPanel value={value} {...restProps}>{children}</TabPanel>
    );
  }

  export default React.memo(MTabPanel)
