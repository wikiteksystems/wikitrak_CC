import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { UserActions } from '../stores/actions';
import { Theme, ThemeColor, getFullName } from "../utils/constants";
import { Layout, Menu, Avatar } from 'antd';
import { Footer } from ".";
import "./menu.css"


const { Sider } = Layout;

const AppMenu = ({ activePage, menuList, menuCollapsed }) => {
    const siderRef = useRef()
    const dispatch = useDispatch();
    const { themeColor, avatar, userName, userRole } = useSelector(({ User }) => User);

    return (
        <div className="absolute md:relative z-30 md:z-0">
            <Sider
                className="h-screen"
                style={{
                    background: Theme.light_color, // Set the linear gradient
                    borderRight: '1px solid black',
                }}
                breakpoint="md"
                ref={siderRef}
                collapsedWidth={0}
                trigger={null}
                collapsible
                collapsed={menuCollapsed}
                width={250}
            >
                <div className="flex flex-col justify-between h-full ">
                    <div className="flex flex-col">
                        <div style={{
                            background: Theme.dark_color, padding: "15px 0 15px 15px", color: "white", letterSpacing: "2px"
                        }}>

                            <span style={{ fontSize: 25 }} className="font-bold">WIKITRACK</span>
                        </div>
                        {!menuCollapsed &&
                            <div className="w-full flex flex-col items-center py-5">
                                {avatar === null ?
                                    <Avatar size={100} style={{ background: Theme.dark_color, fontSize: 60 }}> {userName.first.charAt(0).toUpperCase() + userName.last.charAt(0).toUpperCase()} </Avatar>
                                    :
                                    <Avatar size={100} src={avatar} />
                                }
                                <div className="font-bold" style={{ fontSize: 20, color: "white" }}> {`${userName.first.charAt(0).toUpperCase() + userName.first.slice(1)} ${userName.last.charAt(0).toUpperCase() + userName.last.slice(1)}`} </div>
                                <div style={{ fontSize: 20, color: "white" }}> {userRole.charAt(0).toUpperCase() + userRole.slice(1)}  </div>
                            </div>}

                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={[activePage ? activePage.toString() : '0']}
                            style={{
                                color: 'black',
                                background: Theme.light_color
                            }}
                            items={menuList.map((item, index) => ({
                                key: index,
                                icon: item.icon,
                                style: { paddingLeft: 0, fontSize:"15px", fontWeight:"600", color:"white" },
                                label:
                                    (item.label !== 'Log Out' ?
                                        <Link to={item.link}> {item.label} </Link>
                                        :
                                        <div onClick={() => dispatch(UserActions.logoutUser())}>
                                            <Link to={item.link}> {item.label} </Link>
                                        </div>
                                    )
                            }))}
                        />
                    </div>

                    {!menuCollapsed &&
                        <Footer style={{
                            background: Theme.dark_color, padding: '20px 0px', display: 'flex', flexDirection: 'column', color: "white"
                        }}>
                            <div>App Version: 1.0.0</div>
                            <div>
                                Powered By &nbsp; <b><i>autopeepal</i></b>
                            </div>
                        </Footer>}
                </div>
            </Sider>
        </div>
    );
};

export default AppMenu;