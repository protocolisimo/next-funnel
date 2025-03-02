import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
    mode: 'black' | 'colorfull';
};

const initialState: ThemeState = {
    mode: 'black', // Default theme
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.mode = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
