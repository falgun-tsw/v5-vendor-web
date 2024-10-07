import React from "react";
import Card from "./Card";
import Stack from "./Stack";

const VendorCard = ({ headerTitle = "", headerRight, children }) => {
  return (
    <Card sx={{ marginTop: "1rem", padding: "1.25rem !important" }}>
      {headerTitle ? (
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 1 }}
        >
            <Stack>
                <h3>{headerTitle}</h3>
            </Stack>
            <Stack>
                {headerRight}
            </Stack>
        </Stack>
      ) : null}
      {children}
    </Card>
  );
};

export default VendorCard;
