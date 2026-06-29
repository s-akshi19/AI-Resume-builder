import React from 'react'
import styles from './SideBar.module.css';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const SideBar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { isLogin, setLogin, userInfo, setUserInfo } = useContext(AuthContext);

    const handleLogout = () => {
        {/* Please watch the video for ful source code */ }

    }
    return (
        <div className={styles.sideBar}>
            <div className={styles.sideBarIcon}>
                <ArticleIcon sx={{ fontSize: 54, marginBottom: 2 }} />
                <div className={styles.sideBarTopContent}>Resume Screening</div>
            </div>

            <div className={styles.sideBarOptionsBlock}>

                {/* Please watch the video for ful source code */}


                <Link to={'/history'} className={[styles.sideBarOption, location.pathname === '/history' ? styles.selectedOption : null].join(' ')}>
                    <ManageSearchIcon sx={{ fontSize: 22 }} />
                    <div>History</div>
                </Link>
                {
                    {/* Please watch the video for ful source code */ }

                }
                <div onClick={handleLogout} className={styles.sideBarOption}>
                    <LogoutIcon sx={{ fontSize: 22 }} />
                    <div>LogOut</div>
                </div>

            </div>
        </div>
    )
}

export default SideBar