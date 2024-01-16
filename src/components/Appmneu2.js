import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { UserActions } from '../stores/actions';
import { ThemeColor, getFullName } from "../utils/constants";
import { Layout, Menu, Avatar } from 'antd';
import { Footer } from ".";
const { Sider } = Layout;

const AppMenu2 = ({ activePage, menuList, menuCollapsed }) => {
    const siderRef = useRef()
    const dispatch = useDispatch();
    const { themeColor, avatar, userName, userRole } = useSelector( ({User}) => User );

    return (
        <div  className="absolute md:relative z-30 md:z-0">
        <Sider 
        className="h-screen"
            style={{background:ThemeColor.light_color, borderRight: '1px solid black'}}
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
                { !menuCollapsed &&
                     <div  style={{backgroundColor: ThemeColor.dark_color, padding:"15px 0 4px 15px", color:"white", letterSpacing:"2px"}}>

                     <span style={{fontSize: 30, color:"white"}} className="font-bold">FOTAX LITE</span>
                 </div>
                }
                { !menuCollapsed &&
                <div className="w-full flex flex-col items-center">
                    { avatar === null ?
                   <Avatar size={100} style={{background: ThemeColor.dark_color, fontSize: 60, color:ThemeColor.light_color}}> {userName.first.charAt(0).toUpperCase() + userName.last.charAt(0).toUpperCase()} </Avatar>
                    :
                    <Avatar size={100} src={avatar} />
                    }
                    <div className="font-bold" style={{fontSize: 20}}> {getFullName(userName)} </div>
                    <div style={{fontSize: 20}}> {userRole} </div>
                </div> }

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[ activePage ? activePage.toString() : '0' ]}
                    style={{ color: 'white', background: ThemeColor.light_color }}
                    items={ menuList.map((item, index) => ({
                        key: index,
                        icon: item.icon,
                        style: {paddingLeft: 0},
                        label: 
                            ( item.label !== 'Log Out' ?
                            <Link to={item.link}> {item.label} </Link>
                            :
                            <div onClick={() => dispatch(UserActions.logoutUser()) }>
                                <Link to={item.link}> {item.label} </Link>
                            </div>
                            )
                    }) )}
                />
                </div>


{ !menuCollapsed &&
                  <Footer style={{padding:'20px 0px',display:'flex',flexDirection:'column', marginBottom:"3.5rem"}}>
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

export default AppMenu2;