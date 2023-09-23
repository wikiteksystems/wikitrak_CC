import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Footer, Header } from "../../components";
import { Layout, Menu,Input } from 'antd';
import { LeftCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { matchColor } from "../../utils/constants";
const { Sider } = Layout;

const SideMenu = ({ title, items, theme,handleItemSelect, menuCollapsed, activeMenu, plusIconSelect, headerStyle, footerStyle, footerVisible, footerChildren }) => {
    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const { themeColor } = useSelector( ({User}) => User );
    const [searchedMenuList, setSearchedMenuList] = useState([...items]);
    useEffect( () => {
        const tempArray = items?.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) )
        const list = tempArray.map( item => (
            {
                ...item,
                label: item.name
            } 
        ));
        setSearchedMenuList(list)
    },[searchText, items])
    return (
        <Sider 
            style={{background: 'white', borderLeft: '1px solid black'}}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
            collapsible collapsed={menuCollapsed}
            width={300}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center" style={{background: matchColor(themeColor)}}>
                    <LeftCircleOutlined className='absolute px-2' style={{fontSize: 20}} onClick={ () => history.goBack() } />
                    <Header title={title} classes={'w-full justify-center'} style={{...headerStyle}} />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1024 1024">
                        <path fill="white" d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"/>
                        <path fill="black" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"/>
                    </svg> */}
                    <PlusCircleOutlined  className='absolute px-[270px]' style={{fontSize: 20}} onClick={ () => plusIconSelect()} />
                </div>
                <div className="flex items-center m-1">
                    <Input className={'w-full'} placeholder={'Search'} style={{marginRight: 8}} value={searchText} onChange={e => setSearchText(e.target.value)} />
                    {/* { activeMenu === 2 && <Checkbox style={{position: 'absolute', right: 20}} onClick={ e => handleCheckboxClick(e, 'select-all') } /> } */}
                </div>
                <Menu
                    theme={ theme || "dark"}
                    mode="inline"
                    selectedKeys={[activeMenu.toString()]}
                    style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                    items={searchedMenuList}
                    onClick={ (e) =>handleItemSelect (e)}
                />

                { footerVisible &&
                <Footer style={footerStyle}>
                    {footerChildren}
                </Footer> }
            </div>
        </Sider>
    );
};

export default SideMenu;