import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:'',
    category: [
        {
            id: 1,
            name: "Residential",
            value: "residential",
        },
        {
            id: 2,
            name: "Commercial",
            value: "commercial",
        },
        {
            id: 3,
            name: "Industrial",
            value: "industrial",
        },
        {
            id: 4,
            name: "Apartments",
            value: "apartments",
        },
    ],
    companySize: [],
    employerDetails : [],
};

export const employerSlice = createSlice({
    name: "employer",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token=action.payload.access;
          },
        employeeDetail : (state, action) => {
        }
    },
});

export const {login, employeeDetail} = employerSlice.actions;
export default employerSlice.reducer;
