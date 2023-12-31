import React from "react";
import { useHistory } from "react-router-dom";
import { Footer, Header } from "./";
import { Layout, Menu } from 'antd';
import { LeftCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { matchColor } from "../utils/constants";
const { Sider } = Layout;

const SideMenu = ({ title, items, theme, menuCollapsed, activeMenu, handleItemSelect, headerStyle, footerStyle, footerVisible, footerChildren }) => {
    const history = useHistory();
    const { themeColor } = useSelector( ({User}) => User );

    return (
        <div  className="absolute md:relative z-30 md:z-0 right-0">
        <Sider 
        className="md:h-[570px] h-[620px]"
            style={{background: 'white', borderLeft: '1px solid black',right:'0px'}}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
            collapsible collapsed={menuCollapsed}
            width={250}
            height= {100}
        >
            <div className="flex flex-col justify-between h-full">

                

                <div className="flex justify-between items-center" style={{background: matchColor(themeColor)}}>
                    <LeftCircleOutlined className='absolute px-2' style={{fontSize: 20, color:'white'}} onClick={ () => history.goBack() } />
                    <Header title={title} classes={'w-full justify-center'} style={{...headerStyle}} />
                </div>

                <Menu
                    theme={ theme || "dark"}
                    mode="inline"
                    selectedKeys={[activeMenu.toString()]}
                    style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                    onClick={ handleItemSelect }
                    items={items}
                />

                { footerVisible &&
                <Footer style={footerStyle}>
                    {footerChildren}
                </Footer> }
            </div>
        </Sider>
        </div>
    );
};

export default SideMenu;