import { createSlice } from '@reduxjs/toolkit';

var initialState = {
    photo: '',
    responseIds: {}
}

const fileInfoSlice = createSlice({
    name: 'fileInfo',
    initialState,
    reducers: {
        setInitialState(state, action) {
            state.responseId = initialState.responseId
        },
        setResponseId(state, action) {
            const { id, name } = action.payload;
            state.responseIds[name] = id;
        }
    },
})

export default fileInfoSlice.reducer;

//Actions
export const {
    setInitialState,
    setResponseId
} = fileInfoSlice.actions;