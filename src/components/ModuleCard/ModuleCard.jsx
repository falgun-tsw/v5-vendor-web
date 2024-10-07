import React from "react";
import { Typography } from "@material-ui/core";
import Icon from "@mui/material/Icon";

const ModuleCard = ({ moduleData, handleOnModulePress }) => {
  const { name, icon } = moduleData;

  return (
    <div
      style={{
        borderRadius: 9,
        padding: 12,
        margin: 10,
        border: `1px solid #DBD8D8`,
        boxShadow: `0px 0.5px 1px 0.5px $DBD8D8`,
        backgroundColor: "white",
        alignItems: "center",
        width: 150,
        cursor: "pointer",
      }}
      onClick={handleOnModulePress}
    >
      <div
        style={{
          textAlign: "center",
          alignItems: "center",
          paddingVertical: 10,
        }}
      >
        {icon ? <Icon>{icon}</Icon> : <Icon>{"all_out"}</Icon>}
        <Typography>{name}</Typography>
      </div>
    </div>
  );
};

export default ModuleCard;
