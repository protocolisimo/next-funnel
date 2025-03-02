import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import surveyReducer from "@/features/surveySlice";
import themeReducer from "@/features/themeSlice";

const surveyPersistConfig = {
  key: "survey",
  storage,
};

const persistedSurveyReducer = persistReducer(surveyPersistConfig, surveyReducer);

export const store = configureStore({
  reducer: {
    survey: persistedSurveyReducer,
    theme: themeReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
