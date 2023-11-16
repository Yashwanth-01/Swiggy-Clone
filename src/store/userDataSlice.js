import {createSlice} from '@reduxjs/toolkit';

const userDataSlice = createSlice({
    name: 'userData',
    initialState: [],
    reducers: {
        createUser: (state, action) => {
            return(
                [...state, {...action.payload}]
            )
          },
          

    }
})

export const { createUser } = userDataSlice.actions;
export default userDataSlice.reducer;