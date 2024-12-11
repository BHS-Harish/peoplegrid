import { useState } from 'react'
import { Layout, Segmented, ConfigProvider, Tooltip } from 'antd';
const { Header, Sider, Content } = Layout;
import SurveyDesigner from '../surveycreators/SurveyDesigner';
import Icons from '../surveycreators/Icons';
import { FiSettings } from "react-icons/fi";


function SurveyCreator() {
  const [ques, setQues] = useState([])
  const [isOver, setIsOver] = useState(false)

  const contentStyle = {
    overflowY: "scroll",
    backgroundColor: "#fff",
    padding: 20
  }

  const layoutStyle = {
    overflow: 'hidden',
    width: "100%",
    height: "100vh"
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
        <Sider width={80} className='w-[50px] md:w-[80px] pt-4 px-2 flex flex-col items-center bg-indigo-600' >
          <Tooltip placement='right' title="Single Line Input" color='blue'>
            <div className='bg-white rounded-full cursor-grab' id='text' draggable={true} onDragStart={(e) => {
              e.dataTransfer.setData("id", e.currentTarget.id)
            }}>
              <Icons name="text" />
            </div>
          </Tooltip>
          <Tooltip placement='right' title="Radio Group" color='blue'>
            <div className='bg-white rounded-full cursor-grab' id='radiogroup' draggable={true} onDragStart={(e) => {
              e.dataTransfer.setData("id", e.currentTarget.id)
            }}>
              <Icons name="radiogroup" />
            </div>
          </Tooltip>
        </Sider>
        <Layout>
          <Header className='bg-white border-b'></Header>
          <Header className='py-4 bg-white border-b w-full flex justify-between'>
            <Segmented options={['Designer', 'Preview']} />
            <div className='h-full'>
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
    </ConfigProvider>
  )
}

export default SurveyCreator
