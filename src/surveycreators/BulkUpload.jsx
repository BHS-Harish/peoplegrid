import React, { useEffect, useState } from 'react'
import { Drawer, Modal, Space, Button, message, Table, Input, Select } from 'antd'
const { confirm } = Modal
import { useDispatch } from 'react-redux';
import { addQuestionToSurvey } from '../slices/SurveySlice'
import Papa from "papaparse";
import { getQuestionTemplate } from '../surveycreators/utils'
import { HiOutlineTrash } from "react-icons/hi2";

function BulkUpload({ open, setOpen }) {
    const dispatch = useDispatch()
    const [messageApi, contextHolder] = message.useMessage();
    const [questions, setQuestions] = useState([])
    const [renderQues, setRenderQues] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [file, setFile] = useState(null)

    useEffect(() => {
        setRenderQues(questions?.map((que, index) => { return { ...que, key: index } }))
    }, [questions])

    const responses = ["text", "checkbox", "radiogroup", "dropdown", "likert", "rating"].map((response) => { return { option: response, value: response } })

    const columns = [
        {
            title: 'Question',
            dataIndex: 'key',
            render: (key) => <input className='w-[300px] text-md px-4 py-1 bg-indigo-50 font-medium rounded-lg outline-none border-2 border-indigo-50 hover:border-indigo-200 focus:border-indigo-500' placeholder='Survey Description' type='text' value={renderQues[key]?.question} onChange={(e) => {
                let oldQuestions = [...renderQues]
                let oldQuestion = oldQuestions[key]
                oldQuestion["question"] = e.target.value
                oldQuestions.splice(key, 1, oldQuestion)
                setQuestions(oldQuestions)
            }} />
        },
        {
            title: 'Survey Scale',
            dataIndex: 'key',
            render: (key) => <Select className='w-[200px]' options={responses} value={renderQues[key]?.type} onChange={(value) => {
                let oldQuestions = [...renderQues]
                let oldQuestion = oldQuestions[key]
                oldQuestions.splice(key, 1, { ...getQuestionTemplate(value), key: oldQuestion?.key, question: oldQuestion?.question })
                setQuestions(oldQuestions)
            }} />
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRowKeys)
        },
        selectedRowKeys: selectedRows,
    }

    const handleDelete = () => {
        let oldQuestions = [...renderQues]
        oldQuestions = oldQuestions.filter((question) => {
            return !selectedRows.includes(question.key)
        })
        messageApi.info(`${selectedRows.length} questions deleted`)
        setQuestions(oldQuestions)
        setSelectedRows([])
    }

    function onClose() {
        confirm({
            title: 'Are you sure to discard the process?',
            content: 'The data will be deleted permanently.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setQuestions([])
                setOpen(false)
                setFile(null)
            }
        });
    }
    function handleFileChange(e) {
        setFile(e.target.files[0])
        Papa.parse(e.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                if (results?.meta?.fields.includes("question")) {
                    setQuestions(results?.data?.map((question, index) => {
                        return { ...getQuestionTemplate("text"), ...question }
                    }))
                }
                else {
                    messageApi.error("CSV should contain question column")
                }
            },
        });
    }

    const importQuestions = () => {
        var emptyQuestions = 0
        renderQues?.forEach((ques) => {
            delete ques.key
            if (ques?.question == "")
                emptyQuestions += 1
            else
                dispatch(addQuestionToSurvey(ques))
        })
        messageApi.success(`${renderQues?.length - emptyQuestions} questions imported`)
        if (emptyQuestions > 0)
            messageApi.error(`${emptyQuestions} questions not imported}`)
        setQuestions([])
        setOpen(false)
    }


    return (
        <Drawer title="Upload Bulk Question" size='large' onClose={onClose} open={open} extra={
            <Space>
                <Button onClick={onClose}>Discard</Button>
                <Button type="primary" onClick={importQuestions} disabled={!renderQues?.length}>
                    Import
                </Button>
            </Space>}>
            {contextHolder}
            {
                file == null && (
                    <div className='w-full flex flex-col items-center'>
                        <label htmlFor="uploadFile1"
                            className="bg-white text-gray-500 font-semibold px-24 text-base rounded max-w-md h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                                <path
                                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                    data-original="#000000" />
                                <path
                                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                    data-original="#000000" />
                            </svg>
                            Upload file

                            <input type="file" id='uploadFile1' className="hidden" onInput={handleFileChange} accept=".csv" />
                            <p className="text-xs font-medium text-gray-400 mt-2">CSV is Allowed.</p>
                        </label>
                    </div>
                )
            }
            <div className='w-full flex justify-end my-4'>
                <button className='w-fit h-[36px] flex items-center gap-1 text-red-600 font-medium px-3 py-2 rounded-md duration-500 hover:bg-red-100' disabled={selectedRows?.length != 0 ? false : true} onClick={handleDelete}>
                    <HiOutlineTrash />
                    <span>Delete</span>
                </button>
            </div>
            <Table
                className='mb-8'
                columns={columns}
                dataSource={renderQues}
                rowKey={"key"}
                pagination={false}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
            />
        </Drawer>
    )
}

export default BulkUpload;