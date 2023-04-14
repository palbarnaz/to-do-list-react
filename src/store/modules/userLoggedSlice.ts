import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: '',
};

const slice = createSlice({
    name: 'userLogged',
    initialState,
    reducers: {
        saveUserLogged: (_, action: PayloadAction<string>) => ({ value: action.payload }),
    },
});
export const { saveUserLogged } = slice.actions;
export const userLoggedReducer = slice.reducer;
