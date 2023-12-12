import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppMenu, Navbar, Header, Footer } from '../../components';
import { AppMenuList, ThemeColor } from '../../utils/constants';
import { AppActions } from '../../stores/actions';
import { PageContent } from '.';
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';


import { Layout } from "antd";
const { Content  } = Layout;

const Profile = () => {
    const dispatch = useDispatch();
    const { mainMenuCollapsed,detailMenuCollapsed } = useSelector( ({App}) => App );

    useEffect( () => { 
        dispatch(AppActions.setMainMenuCollapsed(true));
    }, [dispatch]);

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -20,
        left: 0,
        right: 0,
        margin: '0 auto',
      });

    
      const handleMainMenuCollapse = () => {
          dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
      };
      const handleDetailMenuCollapse = () => {
          dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
      };

    return (
        <Layout className="flex h-auto md:h-screen">
            {/* <Navbar /> */}

            <Layout>
                <AppMenu activePage={3} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />

                <Layout style={{ flex: "1 1 auto" }}>
                    {/* <Header title={'User Profile'} /> */}
                    <Header title={'User Profile'} showText={false} style={{justifyContent: "space-between"}} />

                    <Content style={{width: '100%', height: '100%'}}>
                        <PageContent />
                    </Content>
                </Layout>
            </Layout>

            <div className="hidden">
            <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
            </Footer>
              </div>

              <div className="block md:hidden">
              <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0,background:ThemeColor.light_color_1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon onClick={ handleMainMenuCollapse }/>
          </IconButton>
          <StyledFab style={{background: ThemeColor.light_color_2, color:"white" }} aria-label="add">
          <LocationOnSharpIcon  style={{fontSize:"30px"}}/>
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
             <PlayArrowOutlined sx={{fontSize:'35px'}} onClick={ handleDetailMenuCollapse }/>
          </IconButton>
        </Toolbar>
      </AppBar>
      </div>
        </Layout>
    );
}

export default Profile;
