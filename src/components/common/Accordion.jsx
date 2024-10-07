import React from "react";
import { Accordion as MAccordion, Typography} from "@mui/material";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@app/component/common/Stack";

const Accordion = ({ title, data, children, renderChildren = false, onChange:changeValue }) => {
  console.log('onchange value',onchange);
  return (
    <Stack>
      <MAccordion onChange={changeValue ? changeValue : null}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderChildren ? children : data}</AccordionDetails>
      </MAccordion>
    </Stack>
  );
};

export default Accordion;
