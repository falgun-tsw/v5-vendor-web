import { createSlice } from '@reduxjs/toolkit';
// import StatesData from "../../views/UserProfile/components/states.json";

var initialState =  {
    userProfileDetails : {
    "aadhar": "",
    "address": "",
    "area": "",
    "city": "",
    "country": "India",
    "dob": "",
    "email": "",
    "firstName": "",
    "fullName": "",
    "gender": "",
    "lastName": "",
    "pan": "",
    "phone": "",
    "pincode": "",
    "profileUrl": "",
    "state": "",
    },
    // STATES: StatesData,
    userProfileLogo: '',
    updateUserProfileLogo: '',
    states: [],
    cities: [],
    profileId: localStorage.getItem('profileId')? localStorage.getItem('profileId') : "",
    isProfileUpdated: false,
}

const userProfileReducer = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setInitialState(state, action) { 
        },
        setUserProfileDetails(state, action) {
            state.userProfileDetails = action.payload;
        },
        setUserProfileLogo(state, action) {
            state.userProfileLogo = action.payload;
        },
        setUpdatedUserProfileLogo(state, action) {
            state.updateUserProfileLogo = action.payload;
        },
        setStatesData(state, action) {
            state.states = action.payload;
        },
        setCitiesData(state, action) {
            state.cities = action.payload;
        },
        setProfileID(state, action) {
            state.profileId = action.payload;
        },
        setIsProfileUpdated(state, action) {
            state.isProfileUpdated = action.payload
        }
    }
})

export default userProfileReducer.reducer;

export const {
    setInitialState,
    setUserProfileDetails,
    setUserProfileLogo,
    setUpdatedUserProfileLogo,
    setStatesData,
    setCitiesData,
    setProfileID,
    setIsProfileUpdated
} = userProfileReducer.actions;