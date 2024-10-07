import React from "react";
import { Drawer } from "@mui/material";
import Stack from "@app/component/common/Stack";
import Button from "@app/component/common/Button";
import RenderForm from "@app/component/common/RenderForm";

export default function FilterDrawer(props) {
  const {
    closeFilter,
    openFilter,
    handleOnChange,
    onApplyFilter,
    onClearFilter,
    filterFormInfo,
    resetForm,
  } = props;
  const { userName, userCode, state, status } = filterFormInfo;
  const formData = [
    {
      required: false,
      fullWidth: true,
      label: "User Name",
      value: userName,
      gridSize: { xs: 12, md: 12 },
      onChange: (e) => handleOnChange("userName", e.target.value),
    },
    {
      required: false,
      fullWidth: true,
      label: "User Code",
      value: userCode,
      gridSize: { xs: 12, md: 12 },
      onChange: (e) => handleOnChange("userCode", e.target.value),
    },
    {
      required: false,
      fullWidth: true,
      label: "State",
      value: state,
      gridSize: { xs: 12, md: 12 },
      onChange: (e) => handleOnChange("state", e.target.value),
    },
    {
      type: "dropdown",
      fullWidth: true,
      InputLabel: "Status",
      label: "status",
      value: status,
      onChange: (e) => handleOnChange("status", e.target.value),
      MenuItem: [
        { label: "Active", value: "ACTIVE" },
        { label: "Inactive", value: "INACTIVE" },
      ],
      gridSize: { xs: 12, md: 12 },
    },
  ];
  return (
    <Drawer
      open={openFilter}
      anchor="right"
      onClose={() => {
        resetForm();
        closeFilter();
      }}
      PaperProps={{
        sx: {
          width: { xs: "75%", sm: "50%", md: "40%", lg: "25%" },
        },
      }}
    >
      <Stack
        direction={{ xs: "column" }}
        p={2}
        spacing={{ xs: 1, sm: 8 }}
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack direction="column">
          <RenderForm data={formData} />
        </Stack>
        <Stack direction={{ xs: "row" }} spacing={{ xs: 1, sm: 1 }}>
          <Button
            type="reset"
            variant="contained"
            size="small"
            color="secondary"
            onClick={(e) => {
              onClearFilter();
            }}
            sx={{ width: "10rem", height: "2.5rem" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={(e) => {
              onApplyFilter();
            }}
            sx={{ width: "10rem", height: "2.5rem" }}
          >
            Apply
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}
