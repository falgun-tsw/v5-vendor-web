import React from "react";
import Stack from "@app/component/common/Stack";
import Box from "@app/component/common/Box";
import Text from "@app/component/common/Text";
import cx from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import { makeStyles, createStyles } from "@mui/styles";

const RiskAssessmentStepper = (props) => {
    const { currentStepsId, stepperData } = props;
    const classes = useStyles();

    return (
        <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ flex: 1 }}
        >
            {stepperData.map((item, index) => {
                let isInprogress = false;
                let isCompleted = false;

                if (currentStepsId > item.id) {
                    isCompleted = true;
                } else if (currentStepsId === item.id) {
                    isInprogress = true;
                }

                return (
                    <React.Fragment key={`risk_stepper_index_${index}`}>
                        {index !== 0 && (
                            <Stack alignItems="center" sx={{ flex: 1 }}>
                                <Box className={classes.dottedLine} />
                            </Stack>
                        )}

                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            alignItems={{ xs: "center" }}
                            spacing={1.5}
                        >
                            <Box
                                className={cx({
                                    [classes.numBox]: true,
                                    [classes.numBoxActive]: isInprogress,
                                    [classes.numBoxComplete]: isCompleted,
                                })}
                            >
                                {isCompleted ? (
                                    <CheckIcon fontSize="small" />
                                ) : (
                                    <Text variant="small">{item.label}</Text>
                                )}
                            </Box>
                        </Stack>
                    </React.Fragment>
                );
            })}
        </Stack>
    );
};

const useStyles = makeStyles((theme) =>
    createStyles({
        dottedLine: {
            borderTop: "2px dashed #e5e5e5",
            width: "50%",
            height: 0,
        },
        dottedLineActive: {
            borderTop: "2px dashed #45AC70",
        },
        numBox: {
            color: "#A2A7AE",
            border: "1px solid #A2A7AE",
            borderRadius: "50%",
            height: "2rem",
            width: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        numBoxActive: {
            backgroundColor: "#f0f8ff",
            color: theme.palette.primary.main,
            borderColor: "#f0f8ff",
            height: "2.3rem",
            width: "2.3rem",
        },
        numBoxComplete: {
            backgroundColor: "#45AC70",
            color: "#fff",
        },
        text: {
            color: "#A2A7AE",
            whiteSpace: "noWrap",
            [theme.breakpoints.down("sm")]: {
                display: "none",
            },
        },
        textActive: {
            color: theme.palette.primary.main,
        },
        textCompleted: {},
    })
);

export default RiskAssessmentStepper;
