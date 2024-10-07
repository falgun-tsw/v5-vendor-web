import React, { Fragment, useEffect, useState } from 'react';
import useSettings from 'src/FormElements/app/hooks/useSettings';
import V5FormElement from '../../components/FormComponents';
import { makeStyles } from '@mui/styles';
import { Grid, Button, TextField, CircularProgress, InputAdornment, IconButton, Icon, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { Box, styled } from '@mui/system';
import { useFormik } from 'formik';
import { useHistory ,useParams} from "react-router-dom";
import { convertDate } from 'src/FormElements/app/utilities/DateFormat';
import Stack from '@app/component/common/Stack';
import Text from '@app/component/common/Text';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    arrowIcon: {
        color: "#bbb",
        fontSize: "1.3rem"
    },
    boxStyle: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        border: 'none !important',
        borderRadius: "2px",
        width: '360px'
    },
    formWrapper: {
        height: 'calc(100vh - 220px)',
        maxHeight: 'calc(100vh - 220px)',
        overflow: 'scroll',
        '&::-webkit-scrollbar': {
            width: '0em',
        },
    },
    approveBtn: {
        color: "#000",
        backgroundColor: "rgba(0, 0, 0, .6)",
        width: "45%"
    },
    rejectBtn: {
        color: "rgba(0, 0, 0, .6)",
        border: "1px solid rgba(0, 0, 0, .6)",
        width: "45%",
        marginRight: "2rem"
    },
    rejectBtnActive: {
        color: "#C1272D",
        border: "1px solid #C1272D",
        width: "45%",
        marginRight: "2rem"
    },
    topHeadingContainer: {
        borderRadius: "10px",
        alignItems: "center",
        backgroundColor: "#fff",
        width:'100%'
    }
}));

const StyledProgress = styled(CircularProgress)(() => ({
    '@media screen and (min-width: 800px)': {
        position: 'absolute',
        top: '35vh',
        left: `calc(((100% - 260px) / 3) + 260px)`,
    },
    '@media screen and (max-width: 800px)': {
        position: 'absolute',
        top: 'calc(50% - 64px)',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}))

const ApproveButton = styled(Button)(({ primaryColor, isApproved }) => ({
    backgroundColor: isApproved ? primaryColor : 'rgba(0, 0, 0, 0.4)',
    color: 'rgba(0, 0, 0, 0.9)',
    width: "45%"
}))

function WorkflowScreen({ match }) {
    // const theme = useTheme()
    // const [open, setOpen] = useState(true)
    const { settings, updateSettings } = useSettings();
    const classes = useStyles();
    const { formData, workflowId, workflowData, screenFormData, screenFormResponseData, loading, isApproved, mappedBy,dynamicMappingDropdown,} = useSelector((state) => state.screenBuilder.modules);
    const activeJobId = useSelector((state)=>state.myWork.activeJobId)
    const [formattedFormData, setFormattedData] = useState([]);
    const [ss, setSS] = useState(false);
    const [formikData, setFormikData] = useState({});
    const { id, formId, mid, smid } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const primaryColor = settings.layout1Settings.main.primaryColor;
    const fontFamily = settings.themes.typography.fontFamily;
    const [formResponseData, setFormResponseData] = useState([]);
    const [currentSceenId, setCurrentSceenId] = useState('');
    const [currentScreenCount, setCurrentScreenCount] = useState(0);
    const { editable } = screenFormResponseData;
    
    useEffect(() => {
        dispatch({
            type: "getScreenFormDataByIdAction",
            payload: { screenId: id }
        });

        let obj = [{
            screenId: id,
            data: {}
        }];
        setFormResponseData(obj);
        setCurrentSceenId(id);
    }, [id]);

    useEffect(() => {
        dispatch({
            type: 'getWorkflowByIdAction',
            payload: { workflowId },
        });
    }, []);

    useEffect(() => {
        dispatch({
            type: 'getFormDataByIdAction',
            payload: { formId, moduleId: mid, submoduleId: smid, mappedBy }
        });
    }, []);

    useEffect(() => {
        prefillFormData(formik.values);
    }, [screenFormResponseData]);

    const prefillFormData = (formikData) => {
        let data = { ...formikData };
        Object.keys(data).map((item) => {
            if (screenFormResponseData[item] !== undefined && data[item] !== undefined && formId) {
                formik.setValues(data);
            }
            formik.setFieldTouched(item, true);
        });
        if (!formId) {
            formik.setValues(data);
        }
        formik.setTouched({ [data.id]: false }, false);
    }

    useEffect(() => {
        let newObject = {};
        if (screenFormData && screenFormData.form) {
            let newData = screenFormData.form.map((element) => {
                if (element.element === "Time" && element.customOptions.defaultTime === "current") {
                    newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : Date.now();
                } else if (element.element === "Date_Picker" && element.customOptions.defaultDateOptions === "current") {
                    newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : Date.now();
                } else {
                    if (element.element === "Check_List") {
                        newObject[element.id] = formik.values[element.id] ? formik.values[element.id] : screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue ? element.customOptions.defaultValue : [];
                    } else {
                        newObject[element.id] = screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue ? element.customOptions.defaultValue : formik.values[element.id] ? formik.values[element.id] : '';
                    }
                    if (element.dependentComponents) {
                        element.dependentComponents.forEach((el, index) => {
                            let dependentComponentCount = index
                            element.dependentComponents[index]?.form.forEach((el, index) => {
                                newObject[element.dependentComponents[dependentComponentCount]?.form[index].id] = screenFormResponseData[element.dependentComponents[dependentComponentCount].form[index].id] ? screenFormResponseData[element.dependentComponents[dependentComponentCount].form[index].id] : ""
                            })
                        })
                    } else {
                        newObject[element.id] = screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue ? element.customOptions.defaultValue : formik.values[element.id] ? formik.values[element.id] : '';
                    }
                }

                if (element.element === "Mapping_Dropdown") {
                    return {
                        ...element,
                        dropDownOptions: dynamicMappingDropdown,
                        [element.id]: screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue ? element.customOptions.defaultValue : ""
                    }
                }
                return { ...element, [element.id]: screenFormResponseData[element.id] ? screenFormResponseData[element.id] : element.customOptions.defaultValue ? element.customOptions.defaultValue : "" }
            });
            setFormikData(newObject);
            prefillFormData(newObject);
            setFormattedData(newData);
            console.log({newData })
        }
    }, [screenFormData, screenFormResponseData]);
    const validateFields = (values) => {
        let errors = {};
        let url = "";
        let errorArray = [];
        let finalErrors = {}
        formattedFormData.forEach((data) => {
            let validationFieldValue = values[data.id];
            if (data.customOptions.componentType === "Time" && data.customOptions.defaultTime !== "current" && validationFieldValue?.time === null) {
                errors[data.id] = "Required"
            } else if (data.customOptions.required && data.customOptions.componentType === "Phone" && validationFieldValue === "+91") {
                errors[data.id] = "Required"
            }
            else if (data.customOptions.required && (validationFieldValue === undefined || validationFieldValue === null || validationFieldValue === "")) {
                errors[data.id] = "Required"
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === 'Alphabetic' && data.customOptions.charLimit && validationFieldValue?.length > data.customOptions.charLimit) {
                errors[data.id] = `Maximum character limit is ${data.customOptions.charLimit}`
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === 'AlphaNumeric' && data.customOptions.charLimit && validationFieldValue?.length > data.customOptions.charLimit) {
                errors[data.id] = `Maximum character limit is ${data.customOptions.charLimit}`
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === 'Numeric' && data.customOptions.charLimit && validationFieldValue?.length > data.customOptions.charLimit) {
                errors[data.id] = `Maximum character limit is ${data.customOptions.charLimit}`
            }
            else if (data.customOptions.componentType === "Numbers" && Number(validationFieldValue) && Number(validationFieldValue) < Number(data.customOptions.min)) {
                errors[data.id] = `Minimum limit is ${data.customOptions.min}`
            }
            else if (data.customOptions.max && data.customOptions.componentType === "Numbers" && Number(validationFieldValue) && Number(validationFieldValue) > Number(data.customOptions.max)) {
                errors[data.id] = `Maximum limit is ${data.customOptions.max}`
            }
            else if (data.customOptions.componentType === "Numbers") {
                errors[data.id] = extraValidation(validationFieldValue, `Numeric`);
            } else if (data.customOptions.componentType === "Phone") {
                errors[data.id] = extraValidation(validationFieldValue, `Phone`);
            }
            else if (data.customOptions.min && data.customOptions.limitType === "Characters" && validationFieldValue.length < Number(data.customOptions.min)) {
                errors[data.id] = `Minimum characters limit is ${data.customOptions.min}`
            }
            else if (data.customOptions.limitType === "Characters" && data.customOptions.max && validationFieldValue.length > Number(data.customOptions.max)) {
                errors[data.id] = `Maximum characters limit is ${data.customOptions.max}`
            }
            else if (data.customOptions.min && data.customOptions.limitType === "Words" && validationFieldValue.split(" ").length - 1 < Number(data.customOptions.min)) {
                errors[data.id] = `Minimum words limit is ${data.customOptions.min}`
            }
            else if (data.customOptions.limitType === "Words" && data.customOptions.max && validationFieldValue.split(" ").length > Number(data.customOptions.max)) {
                errors[data.id] = `Maximum words limit is ${data.customOptions.max}`
            }
            else if (data.customOptions.componentType === "Email") {
                errors[data.id] = emailValidation(validationFieldValue, data.customOptions.componentType);
            }
            else if (data.customOptions.componentType === "Long Text Field") {
                errors[data.id] = extraValidation(validationFieldValue, data.customOptions.validationType)
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.charLimit === "") {
                errors[data.id] = extraValidation(validationFieldValue, data.customOptions.validation);
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === "none") {
                errors[data.id] = defaultValidation(validationFieldValue);
            }
            else if (data.customOptions.validation) {
                errors[data.id] = extraValidation(validationFieldValue, data.customOptions.validation);
            } else if (data.hasDependentComponents) {
                let dropdownFilterData = data.dropDownOptions.filter(v => v.label === validationFieldValue);
                if (dropdownFilterData && dropdownFilterData.length) {
                    let dropdownFormData = data.dependentComponents.filter(v => v.parentId.indexOf(dropdownFilterData[0]?.key) !== -1);
                    errors = validateFieldsForDropdown(dropdownFormData[0]?.form, values);
                    errorArray.push(errors)
                }
            }
            errorArray.push(errors)
        })
        finalErrors = errorArray.reduce(function (prevError, currentError) {
            return Object.assign(prevError, currentError);
        }, {});
        return finalErrors;
    }

    const validateFieldsForDropdown = (formData, values) => {
        let errors = {};
        let url = "";
        formData?.forEach((data) => {
            let validationFieldValue;
            validationFieldValue = values[data.id];
            if (data.customOptions.componentType === "Time" && data.customOptions.defaultTime !== "current" && validationFieldValue?.time === null) {
                errors[data.id] = "Required"
            } else if (data.customOptions.required && data.customOptions.componentType === "Phone" && validationFieldValue === "+91") {
                errors[data.id] = "Required"
            }
            else if (data.customOptions.required && (validationFieldValue === undefined || validationFieldValue === null || validationFieldValue === "")) {
                errors[data.id] = "Required"
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === 'Alphabetic' && data.customOptions.charLimit && validationFieldValue?.length > data.customOptions.charLimit) {
                errors[data.id] = `Maximum character limit is ${data.customOptions.charLimit}`
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === 'AlphaNumeric' && data.customOptions.charLimit && validationFieldValue?.length > data.customOptions.charLimit) {
                errors[data.id] = `Maximum character limit is ${data.customOptions.charLimit}`
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === 'Numeric' && data.customOptions.charLimit && validationFieldValue?.length > data.customOptions.charLimit) {
                errors[data.id] = `Maximum character limit is ${data.customOptions.charLimit}`
            }
            else if (data.customOptions.componentType === "Numbers" && Number(validationFieldValue) && Number(validationFieldValue) < Number(data.customOptions.min)) {
                errors[data.id] = `Minimum limit is ${data.customOptions.min}`
            }
            else if (data.customOptions.max && data.customOptions.componentType === "Numbers" && Number(validationFieldValue) && Number(validationFieldValue) > Number(data.customOptions.max)) {
                errors[data.id] = `Maximum limit is ${data.customOptions.max}`
            }
            else if (data.customOptions.componentType === "Numbers") {
                errors[data.id] = extraValidation(validationFieldValue, `Numeric`);
            } else if (data.customOptions.componentType === "Phone") {
                errors[data.id] = extraValidation(validationFieldValue, `Phone`);
            }
            else if (data.customOptions.min && data.customOptions.limitType === "Characters" && validationFieldValue.length < Number(data.customOptions.min)) {
                errors[data.id] = `Minimum characters limit is ${data.customOptions.min}`
            }
            else if (data.customOptions.limitType === "Characters" && data.customOptions.max && validationFieldValue.length > Number(data.customOptions.max)) {
                errors[data.id] = `Maximum characters limit is ${data.customOptions.max}`
            }
            else if (data.customOptions.min && data.customOptions.limitType === "Words" && validationFieldValue.split(" ").length - 1 < Number(data.customOptions.min)) {
                errors[data.id] = `Minimum words limit is ${data.customOptions.min}`
            }
            else if (data.customOptions.limitType === "Words" && data.customOptions.max && validationFieldValue.split(" ").length > Number(data.customOptions.max)) {
                errors[data.id] = `Maximum words limit is ${data.customOptions.max}`
            }
            else if (data.customOptions.componentType === "Email") {
                errors[data.id] = emailValidation(validationFieldValue, data.customOptions.componentType);
            }
            else if (data.customOptions.componentType === "Long Text Field") {
                errors[data.id] = extraValidation(validationFieldValue, data.customOptions.validationType)
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.charLimit === "") {
                errors[data.id] = extraValidation(validationFieldValue, data.customOptions.validation);
            }
            else if (data.customOptions.componentType === "Short Text Field" && data.customOptions.validation === "none") {
                errors[data.id] = defaultValidation(validationFieldValue);
            }
            else if (data.customOptions.validation) {
                errors[data.id] = extraValidation(validationFieldValue, data.customOptions.validation);
            }
        })
        let newErrors = { ...errors, errors }
        return errors;
    }

    const emailValidation = (value, validation) => {
        console.log(value)
        if (value !== '' && value) {
            const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/;
            if (!value.match(emailRegex)) {
                return validationMessage(validation);
            } else {
                return null;
            }
        }
    }
    const defaultValidation = (value) => {
        if (value != "" && value) {
            const alphaNumericRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
            if (!value.match(alphaNumericRegex)) {
                return validationMessage(`None`);
            } else {
                return null;
            }
        }
    }
    const extraValidation = (value, validation) => {
        console.log(value)
        // let url = value?.length > 0? value : '';
        if (value !== '' && value) {
            switch (validation) {
                case 'Alphabetic':
                    const alphabeticRegex = /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/;
                    if (!value.match(alphabeticRegex)) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                case 'AlphaNumeric':
                    const alphaNumericRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
                    if (!value.match(alphaNumericRegex)) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                case 'Currency':
                    const currencyRegex = /^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i;
                    if (!value.match(currencyRegex)) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                case 'Cyrillic':
                    const cyrillicRegex = /[\wа-я]+/ig;
                    if (!value.match(cyrillicRegex)) {
                        return validationMessage(validation);
                    } else {
                        return false
                    }
                    break;
                case 'Email':
                    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
                    if (!emailRegex.test(value)) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                case 'Numeric':
                    const numericRegex = /^(|-?\d+)$/;
                    if (value && typeof value === "string" && !value.match(numericRegex)) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                case 'URL':
                    const urlRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                    if (value != "" && !value.match(urlRegex)) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                case 'Phone':
                    if (value != "" && value.length < 13) {
                        return validationMessage(validation);
                    } else {
                        return null;
                    }
                    break;
                default:
                    break;
            }
        }
    }

    const validationMessage = (valid) => {
        switch (valid) {
            case 'Alphabetic': return "Please enter alphabets only";

                break;
            case 'AlphaNumeric': return "Please enter alphanumeric characters only";

                break;
            case 'Currency': return "Please enter valid currency";

                break;
            case 'Cyrillic': return "Please enter a valid Cyrillic";

                break;
            case 'Email': return "Entered email is incorrect.";

                break;
            case 'Numeric': return "Please enter only numeric values";

                break;
            case 'URL': return "Invalid URL. Please enter a Valid URL"

                break;
            case 'Phone': return "Invalid Phone Number.Please enter a Valid Phone Number"
                break;
            case 'None': return "Please enter Minimum one character"
            default:
                break;
        }
    }

    const formik = useFormik({
        initialValues: formikData,
        enableReinitialize: true,
        validateOnMount: true,
        validate: validateFields,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleNext = () => {
        let cIndex = 0;
        let data = {};
        setCurrentScreenCount(currentScreenCount + 1);
        workflowData.workFlows.forEach((value, index) => {
            if (value.screenId === currentSceenId) {
                cIndex = index;
                data = value;
            }
        })
        if (data.nextScreenId && data.nextScreenId !== currentSceenId) {
            let newScreenDetails = workflowData.workFlows[cIndex + 1];
            dispatch({
                type: "getScreenFormDataByIdAction",
                payload: { screenId: newScreenDetails.screenId }
            });
            let obj = [...formResponseData];
            obj = obj.map((value, index) => {
                if (newScreenDetails.screenId === value.screenId) {
                    formik.setValues(value.data);
                }
                if (value.screenId === currentSceenId) {
                    return { ...value, data: formik.values };
                } else {
                    return {
                        screenId: value.screenId,
                        data: value.data
                    }
                }
            })
            obj.push({
                screenId: newScreenDetails.screenId,
                data: {}
            });
            setFormResponseData(obj);
            setCurrentSceenId(newScreenDetails.screenId);
        } else {
            let finalBody = {};
            formResponseData.forEach((value) => {
                finalBody = { ...finalBody, ...value.data };
            })
            finalBody = { ...finalBody, ...formik.values };
            if (workflowData.submoduleId) {
                if (formId && !editable && renderBtnName() === "Go To Home") {

                } else if (formId) {
                    dispatch({
                        type: "updateFormDataByIdAction",
                        payload: { moduleId: workflowData.moduleId, submoduleId: workflowData.submoduleId, formId, workflowId, formData: finalBody, mappedBy }
                    })
                } else {
                    dispatch({
                        type: "submitScreenFormDataBySmIdAction",
                        payload: { moduleId: workflowData.moduleId, subModuleId: workflowData.submoduleId, workflowId, data: finalBody,jobId:activeJobId }
                    })
                }
            } else {
                dispatch({
                    type: "submitScreenFormDataByMIdAction",
                    payload: { moduleId: workflowData.moduleId, data: finalBody, workflowId }
                })
            }
            setTimeout(() => {
                history.goBack();
            }, 300);
        }
    }

    const goBack = () => {
        let cIndex = 0;
        let data = {};

        setCurrentScreenCount(currentScreenCount - 1);
        workflowData.workFlows.forEach((value, index) => {
            if (value.screenId === currentSceenId) {
                cIndex = index;
                data = value;
            }
        })
        if (data.displayOrder > 1) {
            let newScreenDetails = workflowData.workFlows[cIndex - 1];
            dispatch({
                type: "getScreenFormDataByIdAction",
                payload: { screenId: newScreenDetails.screenId }
            });
            let obj = [...formResponseData];
            obj.forEach((value, index) => {
                if (value.screenId === newScreenDetails.screenId) {
                    formik.setValues(value.data);
                }
            })
            let newObject = {};
            setCurrentSceenId(newScreenDetails.screenId);

        } else {
            history.goBack();
            formik.setValues({});
        }
    }

    const renderBtnName = () => {
        if (workflowData && workflowData.workFlows && workflowData.workFlows.length) {
            let data = workflowData && workflowData.workFlows.filter(v => v.screenId === currentSceenId)[0];
            if (data && data.nextScreenId && data.nextScreenId !== currentSceenId) {
                return "Next";
            } else if (formId && !editable) {
                return "Go To Home";
            } else {
                return "Submit";
            }
        }
    }

    const disableCheck = () => {
        return Object.values(formik.errors).filter(v => v).length;
    }

    const handleApproval = (approvalText, isApproved) => {
        dispatch({
            type: "updateRejectApprovePermissionAction",
            data: {
                workflowId,
                moduleId: workflowData.moduleId,
                submoduleId: workflowData.submoduleId,
                formId: formId,
                mappedBy: mappedBy,
                approved: isApproved
            }
        })
    }
    const buttonAction = (action, buttonName, componentId) => {
        dispatch({
            type: "customButtonCallAction",
            data: {
                action,
                buttonName,
                comment: "",
                componentId,
                moduleId: workflowData.moduleId,
                subModuleId: workflowData.submoduleId,
                workflowId
            }
        })
    }
    return (
      <Grid p={1} style={{ fontFamily: fontFamily }}>
        {!loading ? (
          <>
          <Stack direction="row" alignItems="center" pt={2}>
          <IconButton
           onClick={goBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Text sx={{ color: "#0000008a", fontWeight: "500 !important" }}>
          {screenFormData && screenFormData.name}
          </Text>
        </Stack>
            <Grid>
              <form onSubmit={formik.handleSubmit}>
                <Grid mb={1} className={classes.formWrapper}>
                  <>
                    {currentScreenCount === 0 && mappedBy ? (
                      <>
                        <TextField
                          className="mt-5"
                          value={
                            convertDate(screenFormResponseData.createdAt)
                              ? convertDate(screenFormResponseData.createdAt)
                              : ""
                          }
                          disabled
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility">
                                  <Icon>event</Icon>
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          className="mt-5"
                          value={
                            screenFormResponseData &&
                            screenFormResponseData.employeeId
                              ? screenFormResponseData.employeeId
                              : ""
                          }
                          disabled
                          fullWidth
                          label="Emp ID"
                        />
                        <TextField
                          className="mt-5"
                          value={
                            screenFormResponseData &&
                            screenFormResponseData.userName
                              ? screenFormResponseData.userName
                              : ""
                          }
                          disabled
                          fullWidth
                          label="EMP Name"
                        />
                        {/* <TextField className='mt-5' value={screenFormResponseData && screenFormResponseData.roles ? screenFormResponseData.roles?.map((data) => {
                                        return data.role + " "
                                    }) : ""} disabled fullWidth lable="EMP Role" /> */}
                        <TextField
                          className="mt-5"
                          value={
                            screenFormResponseData &&
                            screenFormResponseData.roles
                              ? screenFormResponseData.roles
                              : ""
                          }
                          disabled
                          fullWidth
                          lable="EMP Role"
                        />
                      </>
                    ) : null}
                    {formattedFormData &&
                      formattedFormData.map((data, index) => {
                        // console.log("asdasdasd",data)
                        return (
                          <V5FormElement
                            data={data}
                            key={index}
                            index={index}
                            formik={formik}
                            buttonAction={buttonAction}
                          />
                        );
                      })}
                  </>
                </Grid>
                {workflowData.hasApprovalOnScreens &&
                renderBtnName() === "Go To Home" ? (
                  screenFormResponseData &&
                  screenFormResponseData.previouslyApproved !== null ? (
                    <Grid>
                      <Button
                        onClick={() => handleApproval("REJECT", false)}
                        className={
                          !isApproved
                            ? classes.rejectBtnActive
                            : classes.rejectBtn
                        }
                      >
                        REJECT
                      </Button>
                      <ApproveButton
                        isApproved={isApproved}
                        primaryColor={primaryColor}
                        onClick={() => handleApproval("APPROVE", true)}
                      >
                        APPROVE
                      </ApproveButton>
                    </Grid>
                  ) : (
                    <Grid>
                      <Button
                        onClick={() => handleApproval("REJECT", false)}
                        className={classes.rejectBtn}
                      >
                        REJECT
                      </Button>
                      <Button
                        onClick={() => handleApproval("APPROVE", true)}
                        className={classes.approveBtn}
                      >
                        APPROVE
                      </Button>
                    </Grid>
                  )
                ) : null}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    className={"uppercase"}
                    disabled={!formId && !editable && disableCheck()}
                    sx={{
                      width: "fit-content",
                      mt: 2,
                      color: "#000",
                      backgroundColor: `${primaryColor} !important`,
                      fontFamily: fontFamily,
                    }}
                    fullWidth
                    variant="contained"
                    onClick={handleNext}
                  >
                    {renderBtnName()}
                  </Button>
                </div>
              </form>
            </Grid>
          </>
        ) : (
          <StyledProgress size={35} className="buttonProgress" />
        )}
      </Grid>
    );
}

export default WorkflowScreen;
