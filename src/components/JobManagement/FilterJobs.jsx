import React from "react";
import Drawer from "../common/Drawer";
import Stack from "../common/Stack";
import Accordion from "../common/Accordion";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "../common/Button";

const FilterJobs = ({
  openFilter,
  onFilterClose,
  filterData = {},
  onClearFilter,
  onApplyFilter,
  skillList = [],
  skillCategoriesList = [],
  onSelectoptions,
}) => {
  return (
    <Drawer
      open={openFilter}
      anchor="right"
      onClose={onFilterClose}
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
        <Stack spacing={2}>
          <Accordion title="Categories" renderChildren>
            {skillCategoriesList.map((item, i) => {
              return (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  key={`category_list_${i}`}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterData?.skillsCategories.includes(
                          item.id
                        )}
                      />
                    }
                    label={item.name}
                    onChange={() => {
                      onSelectoptions("skillsCategories", item.id);
                    }}
                  />
                </Stack>
              );
            })}
          </Accordion>
          <Accordion title="Skills" renderChildren>
            {skillList.map((item, i) => {
              return (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  key={`skills_${i}`}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterData.skills.includes(item.id)}
                      />
                    }
                    label={item.name}
                    onChange={() => {
                      onSelectoptions("skills", item.id);
                    }}
                  />
                </Stack>
              );
            })}
          </Accordion>
        </Stack>
        <Stack
          mt={5}
          direction={{ xs: "row" }}
          spacing={{ xs: 1, sm: 1 }}
          alignItems="flex-end"
        >
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={onClearFilter}
            sx={{ width: "10rem", height: "2.5rem" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={onApplyFilter}
            sx={{ width: "10rem", height: "2.5rem" }}
          >
            Apply
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default FilterJobs;
