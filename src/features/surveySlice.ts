import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SurveyState = {
  answers: Record<string, string[]>;
  history: string[];
}

const initialState: SurveyState = {
  answers: {},
  history: [],
};

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<{ questionId: string; answer?: string[] }>) => {
      if (action.payload?.answer) {
        state.answers[action.payload.questionId] = action.payload.answer;
      }
    },
    addToHistory: (state, action: PayloadAction<{ questionId: string }>) => {
      state.history.push(action.payload.questionId)
    },
    goBack: (state) => {
      if (state.history.length > 0) {
        state.history.pop();
      }
    },
    resetSurvey: (state) => {
      state.answers = {};
      state.history = [];
    },
  },
});

export const { saveAnswer, goBack, resetSurvey, addToHistory } = surveySlice.actions;
export default surveySlice.reducer;
