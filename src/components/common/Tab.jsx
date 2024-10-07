// import { Tabs, Tab as MTab } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import Tabs from '@mui/material/Tabs';
import Icon from "@mui/material/Icon";
import React from "react";
import Box from "@app/component/common/Box";

const MTab = (props) => {
  const { tabs, onChange, value = {} } = props;

  const tabText = {
    fontSize: "0.875rem",
    fontWeight: 500,
  };

  return (
    <TabContext value={value}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          width: "100%"
        }}
      >
        <Tabs
          onChange={(e, i) => onChange(i)}
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabs.map((item, i) => (
            <Tab
            key={item.id}
              value={item.portfolioId}
              label={item.name}
              sx={[
                tabText,
                {
                  borderBottom: item?.id === value?.id ? "1px solid blue" : "",
                },
              ]}
              icon={
                item.icon ? <Icon>{item.icon}</Icon> : <Icon>{"all_out"}</Icon>
              }
            />
          ))}
        </Tabs>
      </Box>
      {props.children}
    </TabContext>
  );
};

export default MTab;
