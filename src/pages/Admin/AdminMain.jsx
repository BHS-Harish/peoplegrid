import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch } from 'react-redux';
import { Layout, Menu, theme, message ,ConfigProvider} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import SurveyCreator from '../Admin/SurveyCreator'
import { RxDashboard } from "react-icons/rx";
import { RiSurveyLine } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";


function AdminMain() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(2)
    const [loading, setLoading] = useState(false)
    const [messageApi, ContextHolder] = message.useMessage()
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items = [
        {
            key:1,
            label:"Dashboard",
            icon:<RxDashboard/>
        },
        {
            key:100,
            label:"Survey",
            icon:<RiSurveyLine/>,
            children:[
                {
                    key:2,
                    label:"Create Survey",
                    icon:<IoCreate/>
                },
                {
                    key:3,
                    label:"View Survey",
                    icon:<CiViewList/>
                }
            ]
        }
    ]
    return (
        <ConfigProvider
      theme={{
        components: {
          Menu:{
            
          }
        },
      }}
    >
            {ContextHolder}
            {
                loading ?
                    <Loader />
                    :
                    <Layout
                        style={{
                            minHeight: '100%',
                            maxWidth: "100%",
                            backgroundColor: "white"
                        }}
                    >
                        <Sider
                            breakpoint="lg"
                            collapsedWidth={0}
                            >
                            <div className="demo-logo-vertical w-full flex justify-center mt-4" >
                                <img className='w-[50px] rounded-xl' src="https://media.licdn.com/dms/image/v2/D560BAQGOud2UXrGh0g/company-logo_200_200/company-logo_200_200/0/1687668030730?e=2147483647&v=beta&t=RE1P9wIwG_0wIFaeFS4xqU8APmZMfzD-jaTZVLQDqeI" alt="people grid" />
                            </div>
                            <Menu className='mt-5 px-2' theme='dark' selectedKeys={[open]} mode="inline" items={items} onClick={({ key }) => {
                                setOpen(key)
                            }} />
                        </Sider>
                        <Layout>
                            <Content
                            >
                                {
                                    open==2?
                                    <SurveyCreator/>
                                    // <h1>404</h1>
                                    :
                                    <h1>404</h1>
                                }
                            </Content>
                        </Layout>
                    </Layout>

            }
        </ConfigProvider>
    )
}

export default AdminMain;