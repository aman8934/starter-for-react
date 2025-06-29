//  to track users authentication means user is currently 
import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    status : false, // false means user is not logged in
    userData: null, // user data will be stored here after login
}
const authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status=true;
            state.userData= action.payload

    },
        logout: (state) => {
            state.status=false;
            state.userData= null;
        }
}
}
)
export const { login, logout } = authslice.actions;
export default authslice.reducer;