import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SurveyState {
  answers: Record<string, string[]>;
  history: string[];
}

const initialState: SurveyState = {
  answers: {},
  history: [],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<{ questionId: string; answer: string[] }>) => {
      state.answers[action.payload.questionId] = action.payload.answer;
      state.history.push(action.payload.questionId);
    },
    goBack: (state) => {
      if (state.history.length > 0) {
        const lastQuestion = state.history.pop();
        if (lastQuestion) {
          delete state.answers[lastQuestion];
        }
      }
    },
    resetSurvey: (state) => {
      state.answers = {};
      state.history = [];
    },
  },
});

export const { saveAnswer, goBack, resetSurvey } = surveySlice.actions;
export default surveySlice.reducer;
