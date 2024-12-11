import { configureStore } from "@reduxjs/toolkit";
import SurveySlice from './slices/SurveySlice'

export default configureStore({
    reducer:{
        newSurvey:SurveySlice
    }
})