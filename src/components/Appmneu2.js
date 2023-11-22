import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { UserActions } from '../stores/actions';
import { ThemeColor, getFullName } from "../utils/constants";
import { Layout, Menu, Avatar } from 'antd';
import { Footer } from ".";
const { Sider } = Layout;

const AppMenu2 = ({ activePage, menuList, menuCollapsed }) => {
    const dispatch = useDispatch();
    const { themeColor, avatar, userName, userRole } = useSelector( ({User}) => User );

    return (

        <div  className="absolute md:relative z-30 md:z-0">
        <Sider 
        className="h-screen"
               style={{background:'#B9BDC2',borderRight:'1px solid black'}}
            breakpoint="md"
            collapsedWidth={0}
            trigger={null}
            collapsible collapsed={menuCollapsed}
            width={250}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col">
                { !menuCollapsed &&
                    <div className="text-[24px] font-medium w-full flex flex-col items-center py-5">WIKITRACK</div>
                }
                { !menuCollapsed &&
                <div className="w-full flex flex-col items-center py-5">
                    { avatar === null ?
                    <Avatar size={100} style={{background: ThemeColor.light_color_1, fontSize: 60}}> {userName.first.charAt(0).toUpperCase() + userName.last.charAt(0).toUpperCase()} </Avatar>
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
                    style={{ color: 'black', background: themeColor }}
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
                  <Footer style={{padding:'20px 0px',display:'flex',flexDirection:'column', color:"white"}}>
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