import React from "react";
import MTextField from "@mui/material/TextField";
import { makeStyles, createStyles } from "@mui/styles";

const TextField = ({
    InputProps = {},
    FormHelperTextProps = {},
    InputLabelProps = {},
    SelectProps = {},
    error = false,
    hasField = true,
    rootStyle,
    ...restProps
}) => {
    const classes = useStyles();
    const defaultProps = {
        variant: "outlined",
        size: "medium",
        fullwidth: "true",
        classes: {
            root: restProps.select ? classes.rootForSelect : classes.root,
        },
        InputProps: {
            disableUnderline: true,
            classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
            },
        },
        FormHelperTextProps: {},
        InputLabelProps: {
            classes: {
                // root: classes.labelRoot,
                // shrink: classes.labelShrink,
                // focused: classes.labelFocused,
            },
        },
        SelectProps: {
            classes: {
                root: classes.selectRoot,
                select: classes.selectSelect,
            },
        },
    };

    const mergedProps = {
        ...defaultProps,
        InputProps: {
            ...defaultProps.InputProps,
            ...InputProps,
            ...rootStyle,

        },
        FormHelperTextProps: {
            ...defaultProps.FormHelperTextProps,
            ...FormHelperTextProps,
        },
        InputLabelProps: {
            ...defaultProps.InputLabelProps,
            ...InputLabelProps,
        },
        SelectProps: {
            ...defaultProps.SelectProps,
            ...SelectProps,
        },
        ...restProps,
    };
    if(hasField){
        return <MTextField error={error ? true : false} {...mergedProps} />;
    }else{
        return <></>
    }

};

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: `100%`,
            boxShadow: `0 0 0 30px white inset !important`,
        },
        rootForSelect: {
            width: `100%`,
            boxShadow: `0 0 0 30px white inset !important`,
        },
    
        inputRoot: {
            backgroundColor: `transparent !important`,
            // style commented due to textfield overlapping issue
            // border: `1px solid #E0E7FF`,
            paddingRight: `${theme.spacing(3)} !important`,
            borderRadius: `5px !important`,
        },
        inputInput: {
            fontSize: `${theme.typography.small.fontSize} !important`,
            color: "#2E384D",
            fontWeight: "500 !important",
            "&[type=number]": {
                "-moz-appearance": "textfield",
            },
            "&::-webkit-outer-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
            },
            "&::-webkit-inner-spin-button": {
                "-webkit-appearance": "none",
                margin: 0,
            },
            boxShadow: `0 0 0 30px white inset !important`,
            "&::-webkit-autofill":{
                "-webkit-box-shadow": "0 0 0 30px white inset !important"
            },
            "&::-webkit-autofill:hover":{
                "-webkit-box-shadow": "0 0 0 30px white inset !important"
            },
            "&::-webkit-autofill::focus":{
                "-webkit-box-shadow": "0 0 0 30px white inset !important"
            },
            "&::-webkit-autofill:active":{
                "-webkit-box-shadow": "0 0 0 30px white inset !important"
            },
        },

        labelRoot: {
            transform: `translate(${theme.spacing(3)}, ${theme.spacing(
                0.5
            )}) scale(1) !important`,
            fontSize: `${theme.typography.small.fontSize} !important`,
            color: "#808591",
        },
        labelShrink: {
            transform: `translate(${theme.spacing(3)}, ${theme.spacing(
                0.5
            )}) scale(0.75) !important`,
        },
        labelFocused: {
            color: "#808591 !important",
        },

        selectRoot: {
            width: `100% !important`,
        },
        selectSelect: {
            fontSize: `${theme.typography.small.fontSize} !important`,
            color: "#2E384D",
            fontWeight: "500 !important",
        },
    })
);

export default React.memo(TextField);
