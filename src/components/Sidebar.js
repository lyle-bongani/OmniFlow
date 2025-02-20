import React from 'react';
import styled from 'styled-components';
import { IconButton, Badge, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { fadeIn, slideIn } from '../utils/animations';

function Sidebar({ mode }) {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { path: '/', icon: <DashboardIcon />, label: 'Overview', notifications: 0 },
        { path: '/messages', icon: <MessageIcon />, label: 'Messages', notifications: 4 },
        { path: '/content', icon: <VideoLibraryIcon />, label: 'Content', notifications: 0 },
        { path: '/discover', icon: <ExploreIcon />, label: 'Discover', notifications: 0 },
        { path: '/post', icon: <AddBoxIcon />, label: 'Post', notifications: 0 },
        { path: '/notifications', icon: <NotificationsIcon />, label: 'Notifications', notifications: 2 },
        { path: '/settings', icon: <SettingsIcon />, label: 'Settings', notifications: 0 },
       
    ];

    return (
        <SidebarContainer mode={mode}>
            <NavSection>
                {menuItems.map((item) => (
                    <NavItem
                        key={item.path}
                        active={location.pathname === item.path}
                        onClick={() => navigate(item.path)}
                        mode={mode}
                    >
                        <IconButton>
                            {item.notifications > 0 ? (
                                <Badge badgeContent={item.notifications} color="primary">
                                    {item.icon}
                                </Badge>
                            ) : (
                                item.icon
                            )}
                        </IconButton>
                        <span>{item.label}</span>
                    </NavItem>
                ))}
            </NavSection>

            <ProfileSection mode={mode}>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
                <ProfileInfo>
                    <ProfileName mode={mode}>John Doe</ProfileName>
                    <ProfileEmail mode={mode}>john@example.com</ProfileEmail>
                </ProfileInfo>
            </ProfileSection>
        </SidebarContainer>
    );
}

const SidebarContainer = styled.div`
  width: 280px;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-right: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#475569'};
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BottomSection = styled.div`
  border-top: 1px solid #e2e8f0;
  padding-top: 16px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  color: ${props => props.active ? '#7c3aed' : props.mode === 'light' ? '#64748b' : '#94a3b8'};
  background-color: ${props => props.active ?
        (props.mode === 'light' ? '#f5f3ff' : '#312e81') : 'transparent'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ?
        (props.mode === 'light' ? '#f5f3ff' : '#312e81') :
        (props.mode === 'light' ? '#f8fafc' : '#475569')};
  }

  .MuiIconButton-root {
    color: inherit;
  }

  span {
    font-weight: ${props => props.active ? '600' : '500'};
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#475569'};
  margin-top: auto;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.div`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-weight: 600;
  font-size: 14px;
`;

const ProfileEmail = styled.div`
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  font-size: 12px;
`;

export default Sidebar;