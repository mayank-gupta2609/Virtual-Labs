import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     user:null,
     experimentId:'',
     section:'',
     expTitle:'',
     experiment:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setExpID: (state, action) => {
            state.experimentId = action.payload
        },
        setSection: (state, action) => {
            state.section = action.payload
        },
        setExpTitle: (state, action) => {
            state.expTitle = action.payload
        },
        setExperiment: (state, action) => {
            state.experiment = action.payload
        }
    }
});

export const {  setUser, setExpID, setSection, setExpTitle, setExperiment } = userSlice.actions;

export default userSlice.reducer;