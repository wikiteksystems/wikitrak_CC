import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { AppActions, UserActions } from '../stores/actions';
import { LeftCircleOutlined, MenuOutlined, RightCircleOutlined } from '@ant-design/icons';
import { getFullName } from '../utils/constants';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const dispatch = useDispatch();
    const { login, themeColor, userName } = useSelector( ({User}) => User );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );

    const handleMainMenuCollapse = () => {
        dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
    };
    const handleDetailMenuCollapse = () => {
        dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
    };

    return (
        <div className='shadow-md w-full top-0 left-0' style={{borderBottom: '1px solid black'}}>
           <div className={classNames(`md:flex items-center py-4 md:px-2 px-7`, login ? 'justify-between' : 'justify-center  flex-col md:flex-row' )} style={{backgroundColor: "#0F4C75"}}>
             

             
          
                { login &&
                <div className='flex md:justify-between justify-between items-center w-full'>
                       <div className='hidden md:block'>
                    { login && <MenuOutlined  style={{fontSize: 20, color:'white'}}  onClick={ handleMainMenuCollapse }/>
                    }
                    </div>

                    <div className='text-[24px] text-white w-full flex justify-center'>Live Map</div>

                    <div className='md:flex px-3 gap-2 md:gap-0 hidden'>
                 

                    { detailMenuCollapsed ?
                    <LeftCircleOutlined className='' style={{fontSize: 25, color:"white"}} onClick={ handleDetailMenuCollapse } />
                    :
                    <RightCircleOutlined className='' style={{fontSize: 25, color:"white"}} onClick={ handleDetailMenuCollapse } />
                    }
                    </div>
                </div>
                }


           </div>
        </div>
    );
};

export default Navbar;