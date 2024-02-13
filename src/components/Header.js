import React from 'react';
import classNames from 'classnames';
import { Layout } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { Theme, matchColor } from '../utils/constants';
import { AppActions, UserActions } from '../stores/actions';
import { LeftCircleOutlined, MenuOutlined, RightCircleOutlined } from '@ant-design/icons';
const { Header } = Layout;

export default function HeaderBar({title, classes, style, showText, hideArrow}) {
    const dispatch = useDispatch();
    const { login, themeColor, userName } = useSelector( ({User}) => User );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );

    const handleMainMenuCollapse = () => {
        dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
    };
    const handleDetailMenuCollapse = () => {
        dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
    };

    return(
        <Header className={classNames("flex justify-center items-center text-white text-[24px]", classes)} style={{paddingInline: 0,  padding:'0 20px', background: Theme.dark_color, ...style}}>
           
           {
            showText === false &&
            <div className='hidden md:flex  font-bold text-2xl  justify-between items-center'>
                    { login && (
                        
                        <MenuOutlined className="w-6 h-5" style={{fontSize: 20}} onClick={ handleMainMenuCollapse }/>
                        )
                    }

                    
                </div>
           } 
            {title}

            { showText === false && login && 
                <div className='hidden md:flex    justify-center items-center'>

                    {
                        hideArrow ?
                        <div></div>
                        :
                        detailMenuCollapsed ?
                            <LeftCircleOutlined className='' style={{fontSize: 30}} onClick={ handleDetailMenuCollapse } />
                            :
                            <RightCircleOutlined className='' style={{fontSize: 30}} onClick={ handleDetailMenuCollapse } />
                        
                         
                    }
                </div>
            }
        </Header>
    )
}