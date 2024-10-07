import React, { useState, useEffect } from 'react';
import { Button, FormLabel, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Geocode from "react-geocode";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from 'react-google-maps';
import { compose, withProps } from "recompose";
import { ThemeProvider, createTheme } from '@mui/material/styles';
//import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { color: "red" },
            },
        },
    },
})

const V5LocationMap = (props) => {
    const {
        data,
        formik,
        primaryColor,
        fontFamily,
    } = props;

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [mapView, setMapView] = useState(false);
    const [address, setAddress] = useState("");

    const useStyles = makeStyles((theme) => ({
        getLoactionBtn: {
            marginTop: "15px",
            marginBottom: "1.5rem",
            backgroundColor: "transparent",
            border: `1px solid ${primaryColor} `,
            color: primaryColor,
            fontWeight: "500",
            float: "right",
            '&:hover': {
                backgroundColor: "transparent"
            },
        },
        mapImage: {
            height: "150px",
            position: "inherit",
            width: "100%"
        },
        addressLabel: {
            marginBottom: "-0.1rem",
            fontWeight: "400",
            color: "rgba(0,0,0,0.7)"
        },
        address: {
            fontWeight: "400",
            color: "#B7B7B6",
            fontSize: "1.02rem",
            width: "100%",
            '& label.Mui-focused': {
                color: primaryColor,
                fontFamily: fontFamily
            },
            '& .MuiFormLabel-root': {
                fontFamily: 'fontFamily'
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: primaryColor
            },
            '& .MuiOutlinedInput-root': {

                '&.Mui-focused fieldset': {
                    borderColor: primaryColor,
                },
                // '&.Mui-focused fieldset': {
                //     borderColor: primaryColor
                // },
                '&:hover fieldset': {
                    borderColor: primaryColor
                },
                // '&.Mui-focused fieldset': {
                //     borderColor: primaryColor
                // },
            },
        }
    }))
    const classes = useStyles();
    const { formId } = useParams();
    const { screenFormResponseData } = useSelector((state) => state.screenBuilder.modules);
    const { editable } = screenFormResponseData;
    const mapAPIkey = localStorage.getItem("googleMapAuthKey");

    const MapComponent = compose(
        withProps({
            /**
             * Note: create and replace your own key in the Google console.
             * https://console.developers.google.com/apis/dashboard
             * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
             */
            googleMapURL:
                `https://maps.googleapis.com/maps/api/js?key=${mapAPIkey}&v=3.exp&libraries=geometry,drawing,places`,
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `100px` }} />,
            mapElement: <div style={{ height: `100%` }} />
        }),
        withScriptjs,
        withGoogleMap
    )((props) => (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: latitude, lng: longitude }}
        // onClick={ev => {
        //     if (!formId && !editable) {
        //         setLatitude(ev.latLng.lat());
        //         setLongitude(ev.latLng.lng());
        //     }
        // }
        // }
        >
            {props.isMarkerShown && (
                <Marker position={{ lat: latitude, lng: longitude }} />
            )}
        </GoogleMap>
    ));

    useEffect(() => {
        Geocode.setApiKey(mapAPIkey);
        Geocode.setLanguage("en");
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                if (address) {
                    setAddress(address);
                    formik.setFieldValue(data.id, { 'address': address, "latitude": latitude, "longitude": longitude });
                    // formik.setFieldValue([data.id], { latitude: lat, longitude: lng});
                }
            },
            (error) => {
                console.error(error);
            }

        );

    }, [latitude, longitude])
    useEffect(() => {
        if ((formik.values && formik.values[data.id] && formId) || (data.customOptions.defaultValue && Object.keys(data.customOptions.defaultValue).length)) {
            // if (formik.values[data.id].latitude && formik.values[data.id].longitude) {
            //     let formData = formik.values[data.id];
            //     Geocode.fromLatLng(formData.latitude, formData.longitude).then(
            //         (response) => {
            //             const address = response.results[0].formatted_address;
            //             if (address) {
            //                 setAddress(address);
            //                 formik.setFieldValue([data.id], address);
            //             }
            //         },
            //         (error) => {
            //             console.error(error);
            //         }
            //     );
            //     setLatitude(formData.latitude);
            //     setLongitude(formData.longitude);
            // }
                setAddress(formik.values[data.id]?.address);
                setLatitude(formik.values[data.id]?.latitude);
                setLongitude(formik.values[data.id]?.longitude);
            setMapView(true);
            // getLatLong();
        }
    }, [formik.values[data.id]]);

    const getLatLong = () => {
        let location = null;
        let lat = '';
        let lng = '';

        // if (latitude && longitude) {
        //     // this.setState({ showMapView: true });
        //     // this.setState({ mapLoaded: true });
        // } else {
            if (window.navigator && window.navigator.geolocation) {
                location = window.navigator.geolocation;
            }
            if (location) {
                location.getCurrentPosition(function (position) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    Geocode.setApiKey(mapAPIkey);

                    // set response language. Defaults to english.
                    Geocode.setLanguage("en");
                    Geocode.setLocationType("ROOFTOP");
                    Geocode.fromLatLng(lat, lng).then(
                        (response) => {
                            const address = response.results[0].formatted_address;
                            if (address) {
                                setAddress(address);
                                formik.setFieldValue(data.id, { 'address': address, "latitude": lat, "longitude": lng });
                                // formik.setFieldValue([data.id], { latitude: lat, longitude: lng});
                            }
                        },
                        (error) => {
                            console.error(error);
                        }
                    );
                    setLatitude(lat);
                    setLongitude(lng);
                    setMapView(true);
                })
            }
        //}
    }

    const handleAddress = (e) => {
        formik.setFieldValue(data.id, { 'address': "", "latitude": "", "longitude": "" });
        const { value } = e.target;
        setAddress(value);
        Geocode.fromAddress(value).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                if (lat && lng) {
                    formik.setFieldValue(data.id, { 'address': value, "latitude": lat, "longitude": lng });
                }
                setLatitude(lat);
                setLongitude(lng);
                setMapView(true);
            },
            (error) => {
                console.error(error);
            }
        );
    }
    return (
        <Grid mt={3}>
            <ThemeProvider theme={theme}>
                <FormLabel sx={{ fontSize: "14px" }} component="legend" required={data.customOptions.required}>{data.label}</FormLabel>
                <Grid className={classes.coordinateContainer}>
                    {mapView && data.customOptions.displayMapOption !== "Text" ? <MapComponent isMarkerShown={true} /> : data.customOptions.displayMapOption !== "Text" && <img className={classes.mapImage} src={`/assets/images/map.png`} alt="map" />}
                    <Button
                        className={classes.getLoactionBtn}
                        variant="contained"
                        style={{ width: `${data.customOptions.displayMapOption === "Map" && "100%"}` }}
                        onClick={() => getLatLong()}
                        disabled={(formId && !editable) || data.customOptions.isFieldDisabled ? true : false}
                    >
                        GET LOCATION
                    </Button>


                    {
                        data.customOptions.displayMapOption !== "Map" && <div style={{ marginTop: "3.5rem" }}>
                            <p className={classes.addressLabel}>{data.customOptions.addressLabel}</p>
                            <TextField disabled={true} className={classes.address} value={formik.values[data.id] && formId ? formik.values[data.id].address : address} placeholder="Address appear here" onChange={(e) => handleAddress(e)} />
                            {/* <p >{address ? address : ""}</p> */}
                        </div>
                    }

                </Grid>
            </ThemeProvider>
        </Grid>
    );
}

export default V5LocationMap;