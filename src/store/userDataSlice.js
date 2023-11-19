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
        updatePassword: (state, action) => {
            return(
                state.map((user) => {
                    if(user.email === action.payload.email){
                        return { ...user, password: action.payload.password };
                    }else{
                        return user;
                    }
                })
            )
        }
          

    }
})

export const { createUser, updatePassword } = userDataSlice.actions;
export default userDataSlice.reducer;