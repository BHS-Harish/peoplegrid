import { useState } from 'react'
import { Layout, Segmented, ConfigProvider, Tooltip } from 'antd';
const { Header, Sider, Content } = Layout;
import SurveyDesigner from '../../surveycreators/SurveyDesigner';
import Icons from '../../surveycreators/Icons';
import BulkUpload from '../../surveycreators/BulkUpload'
import { FiSettings } from "react-icons/fi";
import { MdOutlinePublish } from "react-icons/md";
import { RiFileUploadLine } from "react-icons/ri";


function SurveyCreator() {
  const [openBulkUpload,setOpenBulkUpload]=useState(false)

  const contentStyle = {
    width: "100%",
    backgroundColor: "#fff",
    overflowY: "scroll"
  }

  const layoutStyle = {
    width: "100%",
    height: "100%"
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            itemSelectedBg: "#4f46e5",
            itemSelectedColor: "#fff",
          },
        },
      }}
    >
      <Layout style={layoutStyle} id="survey-creator">
        <Sider width={60} className='w-[50px] h-full md:w-[80px] pt-4 px-2 flex flex-col items-center bg-indigo-600' >
          <Tooltip placement='right' title="Single Line Input" color='blue'>
            <div className='bg-white rounded-full cursor-grab' id='text' draggable={true} onDragStart={(e) => {
              e.dataTransfer.setData("id", e.currentTarget.id)
            }}>
              <Icons name="text" />
            </div>
          </Tooltip>
        </Sider>
        <Layout style={{ height: "100vh" }}>
          <Header className='py-4 px-2 md:px-4 bg-white border-b w-[100%] flex justify-between'>
            <Segmented options={['Designer', 'Preview']} />
            <div className='h-full'>
              <button className='h-[36px] flex items-center gap-1 text-indigo-600 font-medium px-3 py-2 rounded-md duration-500 hover:bg-indigo-50'>
                <MdOutlinePublish />
                <span>Publish</span>
              </button>
            </div>
          </Header>
          <Header className='py-4 px-2 md:px-4 bg-white border-b w-[100%] flex justify-end'>
            <div className='h-full flex gap-2'>
              <button className='h-[36px] flex items-center gap-1 text-indigo-600 font-medium px-3 py-2 rounded-md duration-500 hover:bg-indigo-50' onClick={()=>{setOpenBulkUpload(true)}}>
                <RiFileUploadLine />
                <span>Bulk upload</span>
              </button>
              <button className='h-[36px] flex items-center gap-1 text-indigo-600 font-medium px-3 py-2 rounded-md duration-500 hover:bg-indigo-50'>
                <FiSettings />
                <span>Settings</span>
              </button>
            </div>
          </Header>
          <Content style={contentStyle}>
            <SurveyDesigner />
          </Content>
        </Layout>
      </Layout>
      <BulkUpload open={openBulkUpload} setOpen={setOpenBulkUpload} />
    </ConfigProvider>
  )
}

export default SurveyCreator
