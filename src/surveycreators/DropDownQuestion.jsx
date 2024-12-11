import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import { useSelector, useDispatch } from 'react-redux';
import { updateQuestions } from '../slices/SurveySlice';
import { IoIosRemoveCircle } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";

function DropDownQuestion({ question, quesId }) {
    const [choices, setChoices] = useState([])
    const questions = useSelector((state) => state?.newSurvey?.questions)
    const dispatch = useDispatch()
    useEffect(() => {
        setChoices(question?.choices)
    }, [question])

    const updateNewChoice = (updatedChoices) => {
        let oldQuestions = [...questions]
        let oldQuestion = { ...oldQuestions[quesId] }
        oldQuestion.choices = updatedChoices
        oldQuestions.splice(quesId, 1, oldQuestion)
        console.log(oldQuestion)
        dispatch(updateQuestions(oldQuestions))
    }

    const handleDeleteOption = (index) => {
        let oldChoices = [...choices]
        oldChoices.splice(index, 1)
        updateNewChoice(oldChoices)
    }

    return (
        <div>
            {
                choices?.map((choice, index) => {
                    return (
                        <div className='flex px-4 gap-2 my-1' key={index}>
                            <Tooltip title="Remove option" placement='right'>
                                <button disabled={choices?.length <= 2 ? true : false} onClick={() => { handleDeleteOption(index) }}><IoIosRemoveCircle className='text-2xl text-red-500' /></button>
                            </Tooltip>
                            <input className='w-full text-md px-4 py-1 bg-indigo-50 font-medium rounded-lg outline-none border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-500' placeholder='Write your question here' type='text' onChange={(e) => {
                                let oldChoices = [...choices]
                                oldChoices.splice(index, 1, e.target.value)
                                updateNewChoice(oldChoices)
                            }} value={choice} />
                        </div>
                    )
                })
            }
            <div className='flex px-5 gap-2 my-1'>
                <Tooltip title="Add new option" placement='right'>
                    <button onClick={() => {
                        let oldChoices = [...choices]
                        oldChoices.push(`Item ${choices?.length+1}`)
                        updateNewChoice(oldChoices)
                     }}><FaCirclePlus className='text-xl text-indigo-500' /></button>
                </Tooltip>
                <input className='w-full text-md px-4 py-1 bg-indigo-50 font-medium rounded-lg outline-none border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-500' placeholder='Write your question here' type='text' disabled={true} />
            </div>
        </div>
    )
}

export default DropDownQuestion;