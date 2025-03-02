import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from '@/features/surveySlice';
import themeReducer from '@/features/themeSlice';

export const store = configureStore({
    reducer: {
        survey: surveyReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
