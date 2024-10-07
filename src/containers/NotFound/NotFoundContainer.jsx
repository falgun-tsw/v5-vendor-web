import React from "react";
import { makeStyles } from "@mui/styles";
import Text from "@app/component/common/Text";
import Box from "@app/component/common/Box";
import Container from "@app/component/common/Container";
import Button from "@app/component/common/Button";
import Link from "@app/component/common/Link";
import { routes } from "src/routes";
const NotFoundContainer = () => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        margin: "margin: 0 auto -5px",
        pt: 17,
        pb: 6,
      }}
    >
      <Container align="center">
        <Text variant="h1" color="" className={classes.mainText}>
          404
        </Text>

        <Text variant="h3" mt={4}>
          Oops! Page Not Found
        </Text>
        <Box mt={8} align="center">
          <Link to={routes.dashboard} sx={{ textDecoration: "none" }}>
            <Button>Go to Dashboard</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};
const useStyles = makeStyles((theme) => ({
  mainText: {
    whiteSpace: "nowrap",
    textDecoration: "underline",
    fontStyle: "italic",
    background: "linear-gradient(117deg, #1d9bff 0%, #3fe7e0 100%)",
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    position: "relative",
  },
}));

export default NotFoundContainer;
