import React from "react";
import { makeStyles } from "@mui/styles";
import Text from "@app/component/common/Text";
import Stack from "@app/component/common/Stack";
import Grid from "@app/component/common/Grid";

const StatsCard = ({ data }) => {
  const classes = useStyles();
  return (
    <>
      {data.map((data) => {
        return (
          <Grid item xs={6} sm={6} md={2} key={data.id}>
            <Stack
              sx={{
                padding: "1rem",
                textAlign: "center",
                backgroundColor: "#ffff",
                borderRadius: "4px",
                boxShadow: "0px 5px 5px 0px rgba(150,170,180,0.5)",
              }}
            >
              <Text pb={1} className={classes.statcount}>
                {data.count}
              </Text>
              <Text
                className={classes.statlabel}
                sx={{
                  fontSize: {
                    xs: "0.875rem !important",
                    sm: "1rem !important",
                  },
                }}
              >
                {data.label}
              </Text>
            </Stack>
          </Grid>
        );
      })}
    </>
  );
};
const useStyles = makeStyles({
  statcount: {
    fontSize: "1.5rem !important",
    fontWeight: "bold !important",
  },
  statlabel: {
    fontSize: "1rem !important",
  },
});

export default StatsCard;
