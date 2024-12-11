import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateQuestions } from '../slices/SurveySlice';
import TextQuestion from './TextQuestion';
import RadioGroupQuestion from './RadioGroupQuestion';
import CheckBoxQuestion from './CheckBoxQuestion'
import DropDownQuestion from './DropDownQuestion';
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";

function Question({ question, index }) {
    const [isHover, setIsHover] = useState(false)
    const questions = useSelector((state) => state?.newSurvey?.questions)
    const dispatch = useDispatch()
    const updateTheQuestion = (value) => {
        var oldQuestions = [...questions]
        let oldQuestion = { ...oldQuestions[index] }
        oldQuestion["question"] = value
        oldQuestions.splice(index, 1, oldQuestion)
        dispatch(updateQuestions(oldQuestions))

    }
    const duplicateTheQuestion=()=>{
        var oldQuestions = [...questions]
        let duplicate = { ...oldQuestions[index] }
        oldQuestions.splice(index, 0, duplicate)
        dispatch(updateQuestions(oldQuestions))
    }
    const deleteTheQuestion=()=>{
        var oldQuestions = [...questions]
        oldQuestions.splice(index,1)
        dispatch(updateQuestions(oldQuestions))
    }
    return (
        <div className='w-full min-w-[220px] max-w-[700px] flex flex-col gap-4 py-16 px-4 bg-indigo-50 rounded-md relative' onMouseOver={(e) => { setIsHover(true) }} onMouseLeave={(e) => { setIsHover(false) }}>
            <input className='w-full text-lg px-4 py-1 bg-indigo-50 font-medium rounded-lg outline-none border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-500' placeholder='Write your question here' type='text' onChange={(e) => {
                updateTheQuestion(e.target.value)
            }} value={question?.question} />
            {
                question?.type === "text" && (
                    <TextQuestion />
                )
            }
            {
                question?.type === "radiogroup" && (
                    <RadioGroupQuestion question={question} quesId={index} />
                )
            }
            {
                question?.type === "checkbox" && (
                    <CheckBoxQuestion question={question} quesId={index} />
                )
            }
            {
                question?.type === "dropdown" && (
                    <DropDownQuestion question={question} quesId={index} />
                )
            }
            {
                isHover && (
                    <>
                        <button className='w-fit h-[36px] absolute bottom-3 right-28 flex items-center gap-1 text-indigo-600 font-medium px-3 py-2 rounded-md duration-500 hover:bg-indigo-100' onClick={duplicateTheQuestion}>
                            <HiOutlineDocumentDuplicate />
                            <span>Duplicate</span>
                        </button>
                        <button className='w-fit h-[36px] absolute bottom-3 right-4 flex items-center gap-1 text-red-600 font-medium px-3 py-2 rounded-md duration-500 hover:bg-red-100' onClick={deleteTheQuestion}>
                            <HiOutlineTrash />
                            <span>Delete</span>
                        </button>
                    </>
                )
            }
        </div>
    )
}

export default Question;