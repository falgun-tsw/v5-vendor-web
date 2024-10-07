import React from "react";
import Drawer from "../common/Drawer";
import Stack from "../common/Stack";
import RenderForm from "../common/RenderForm";
import Button from "../common/Button";

const FilterVendorUser = ({
  openFilter,
  onFilterClose,
  formData,
  onApplyFilter,
  onClearFilter,
}) => {
  return (
    <Drawer
      open={openFilter}
      anchor="right"
      onClose={() => onFilterClose()}
      PaperProps={{
        sx: {
          width: { xs: "75%", sm: "50%", md: "40%", lg: "25%" },
        },
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        p={2}
        spacing={2}
        sx={{ height: "100%", width: "100%" }}
      >
        <Stack>
          <RenderForm data={formData} />
        </Stack>
        <Stack
          direction={{ xs: "row" }}
          spacing={{ xs: 1, sm: 1 }}
          alignItems="flex-end"
        >
          <Button
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
};

export default FilterVendorUser;
