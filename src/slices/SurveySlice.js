import { createSlice } from "@reduxjs/toolkit";

export const SurveySlice = createSlice({
    name: "newSurvey",
    initialState: {
        title: "",
        description: "",
        order: "original",
        questions: [
        ]
    },
    reducers: {
        setSurveyName: (state, action) => {
            return {
                ...state,
                title: action.payload
            }
        },
        setSurveyDescription: (state, action) => {
            return {
                ...state,
                description: action.payload
            }
        },
        addQuestionToSurvey: (state, action) => {
            return {
                ...state,
                questions: [...state.questions, action.payload]
            }
        },
        updateQuestions: (state, action) => {
            return {
                ...state,
                questions: action.payload
            }
        }
    }
})

export const { setSurveyName, setSurveyDescription, addQuestionToSurvey, updateQuestions } = SurveySlice.actions;
export default SurveySlice.reducer;