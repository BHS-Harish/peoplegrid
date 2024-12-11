import React, { useState } from 'react'
import Question from './Question';
import { useSelector, useDispatch } from 'react-redux';
import { setSurveyDescription, setSurveyName,addQuestionToSurvey } from '../slices/SurveySlice'
import { PiDropboxLogoDuotone } from "react-icons/pi";
import {getQuestionTemplate} from './utils'

function SurveyDesigner() {
    const [isOver, setIsOver] = useState(false)
    const { title, description,questions } = useSelector((state) => state?.newSurvey)
    const dispatch = useDispatch()
    return (
        <>
            <div className='w-full flex justify-center py-8'>
                <div className='w-full min-w-[220px] max-w-[700px] flex flex-col gap-2 py-8 px-4 bg-indigo-50 rounded-md'>
                    <input className='w-full text-2xl px-4 py-2 bg-indigo-50 font-semibold rounded-lg outline-none border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-500' placeholder='Survey Title' type='text' onChange={(e) => {
                        dispatch(setSurveyName(e.target.value))
                    }} value={title} />
                    <input className='w-full text-lg px-4 py-1 bg-indigo-50 font-medium rounded-lg outline-none border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-500' placeholder='Survey Description' type='text' onChange={(e) => {
                        dispatch(setSurveyDescription(e.target.value))
                    }} value={description} />
                </div>
            </div>
            <div className='w-full flex flex-col items-center gap-8 py-8'>
                    {
                        questions&&questions.map((question,index)=>{
                            return(
                                <Question question={question} index={index} key={index} />
                            )
                        })
                    }
            </div>
            <div className='w-full flex justify-center py-8'>
                <div className={`w-full min-w-[220px] max-w-[700px] flex flex-col items-center p-12 bg-blue-100 border border-dashed rounded-md border-blue-500 ${isOver ? "bg-indigo-100" : "bg-white"}`} onDragOver={(e) => {
                    e.preventDefault()
                    setIsOver(true)
                }} onDragLeave={(e) => {
                    setIsOver(false)
                }} onDrop={(e) => {
                    setIsOver(false)
                    dispatch(addQuestionToSurvey(getQuestionTemplate(e.dataTransfer.getData("id"))))
                }}>
                    <PiDropboxLogoDuotone className={`text-5xl text-indigo-500 ${isOver && "animate-bounce"}`} />
                    {
                        <>
                            <p className="text-blue-600 text-lg font-semibold">Add Question</p>
                            <p className='mt-1 text-blue-500'>(Drop your control here)</p>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
export default SurveyDesigner;