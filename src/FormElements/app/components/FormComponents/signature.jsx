import {
  Button,
  IconButton,
  Grid,
  Modal,
  Typography,
  FormLabel,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, fontFamily } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { config } from "@app/FormElements/config";
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles'


const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: "red" },
      },
    },
  },
});

const { isProd } = config;
//..SCREENBUILDER ENDPOINT
const API_ENDPOINT = isProd
  ? config.production.api_endpoint
  : config.development.screenbuilder_api_endpoint;

const APIVERSION = "screenbuilder/api/v1";
//..ONBOARDING ENDPOINT
const ONBOARDING_API_ENDPOINT = isProd
  ? config.production.api_endpoint
  : config.development.api_endpoint;
const ONBOARDING_APIVERSION = "api/v1";

const V5Signature = (props) => {
  const { data, formik, primaryColor, fontFamily } = props;
  const useStyles = makeStyles({
    container: {
      height: "80px",
      border: `1px dashed ${primaryColor}`,
      borderRadius: "8px",
      backgroundColor: `${primaryColor}${80}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px 0",
    },
    containerOne: {
      height: "80px",
      border: `1px solid ${primaryColor}`,
      borderRadius: "8px",
      backgroundColor: "#292929",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "10px 0",
    },
    child: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      fontSize: "12px",
      color: "#00000099",
      fontFamily: fontFamily,
    },
    sigPad: {
      height: 403,
      borderRadius: "5px",
      margin: "5px 0px",
      border: "1px solid #919191",
      backgroundColor: "#eaeaea",
    },
    modalStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "350px",
      height: "500px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      backgroundColor: "#fff",
      outline: "none",
    },
    modalHeading: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    button: {
      padding: "3px 0px",
      display: "flex",
      justifyContent: "space-between",
    },
    deleteIcon: {
      position: "relative",
      top: "-27px",
      right: "-180px",
      color: "white",
      padding: 0,
    },
    saveButton: {
      marginLeft: "5px",
      width: "160px",
      color: "black",
    },
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [signature, setSignature] = useState("");
  const [dataGet, setDataGet] = React.useState(false);
  const [uniqueId, setUniqueId] = React.useState("");
  const sigCanvas = useRef({});
  const dispatch = useDispatch();
  const { formId } = useParams();
  const { screenFormResponseData } = useSelector(
    (state) => state.screenBuilder.modules
  );
  const { editable } = screenFormResponseData;
  const { responseIds } = useSelector((state) => state.screenBuilder.file);

  function revisedRandId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(2, 10);
  }

  useEffect(() => {
    if (responseIds && Object.keys(responseIds).length) {
      formik.setFieldValue(data.id, responseIds[uniqueId]);
    }
  }, [responseIds]);

  useEffect(() => {
    if (formik.values[data.id]) {
    }
  }, [formik.values[data.id]]);

  const clear = () => sigCanvas.current.clear();
  function base64ToBlob(base64, mime) {
    mime = mime || "";
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (
      var offset = 0, len = byteChars.length;
      offset < len;
      offset += sliceSize
    ) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mime });
  }
  const save = () => {
    const sigData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setSignature(sigData);
    var base64ImageContent = sigData.replace(
      /^data:image\/(png|jpg);base64,/,
      ""
    );
    let blob = base64ToBlob(base64ImageContent, "image/png");
    let formData = new FormData();
    var file = new File([blob], `${revisedRandId()}.png`, {
      type: blob.type,
    });
    formData.append("file", file);
    //Generating unique Id for setting up formik data
    const id = revisedRandId();
    setUniqueId(id);
    dispatch({
      type: "setUploadAction",
      file: formData,
      fileType: "IMAGE",
      name: id,
    });
    setOpen(false);
    setDataGet(true);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDeleteVideo = () => {
    setDataGet(false);
    formik.setFieldValue(data.id, "");
  };
  return (
    <Grid mt={3}>
      <ThemeProvider theme={theme}>
        <FormLabel
          sx={{ fontSize: "14px", fontFamily: fontFamily }}
          component="legend"
          required={data.customOptions.required}
        >
          {data.label}
        </FormLabel>
        {!dataGet ? (
          <Grid className={classes.container}>
            {formik.values[data.id] ? (
              <img
                src={`${ONBOARDING_API_ENDPOINT}${ONBOARDING_APIVERSION}/files/${
                  formik.values[data.id]
                }`}
                height="78"
              />
            ) : (
              <Grid className={classes.child} onClick={handleOpen}>
                <img src={`/assets/icons/draw_black_24dp.svg`} />
                <span className={classes.title}>{data.label}</span>
              </Grid>
            )}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={classes.modalStyle}>
                <Grid className={classes.modalHeading}>
                  <Typography variant="h5" style={{ fontFamily: fontFamily }}>
                    {data.label}
                  </Typography>
                  <CloseOutlinedIcon onClick={() => setOpen(false)} />
                </Grid>
                <Grid className={classes.sigPad}>
                  <SignaturePad
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                      width: 350,
                      height: 400,
                      className: "sigCanvas",
                    }}
                    style={{ padding: "3px" }}
                  />
                </Grid>
                <Grid item className={classes.button}>
                  <Button
                    size="medium"
                    variant="outlined"
                    style={{
                      width: "160px",
                      color: primaryColor,
                      fontFamily: fontFamily,
                      border: `1px solid ${primaryColor}`,
                    }}
                    onClick={clear}
                  >
                    Clear
                  </Button>
                  <Button
                    size="medium"
                    style={{
                      backgroundColor: primaryColor,
                      fontFamily: fontFamily,
                    }}
                    variant="contained"
                    className={classes.saveButton}
                    onClick={save}
                  >
                    Save
                  </Button>
                </Grid>
              </Box>
            </Modal>
          </Grid>
        ) : (
          <Grid className={classes.containerOne}>
            <IconButton className={classes.deleteIcon}>
              {!formId && !editable && (
                <DeleteOutlineIcon
                  fontSize="small"
                  onClick={handleDeleteVideo}
                />
              )}
            </IconButton>
            <img
              src={signature}
              width="80"
              height="78"
              style={{ backgroundColor: "white" }}
            />
          </Grid>
        )}
      </ThemeProvider>
    </Grid>
  );
};

export default V5Signature;
