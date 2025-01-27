import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Badge, Tabs, Tab } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import StarIcon from '@mui/icons-material/Star';
import { fadeIn, slideIn } from '../utils/animations';

function Notifications({ mode }) {
    const [tab, setTab] = useState(0);

    const notifications = {
        all: [
            {
                id: 1,
                type: 'like',
                user: {
                    name: 'John Doe',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
                },
                content: 'liked your post',
                target: 'The Future of Web Development',
                time: '2 minutes ago',
                read: false
            },
            {
                id: 2,
                type: 'comment',
                user: {
                    name: 'Sarah Smith',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
                },
                content: 'commented on your post',
                target: 'Great insights! Thanks for sharing.',
                time: '1 hour ago',
                read: true
            },
            {
                id: 3,
                type: 'follow',
                user: {
                    name: 'Mike Johnson',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
                },
                content: 'started following you',
                time: '2 hours ago',
                read: false
            }
        ],
        mentions: [
            {
                id: 4,
                type: 'mention',
                user: {
                    name: 'Emma Wilson',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
                },
                content: 'mentioned you in a comment',
                target: 'What do you think about this @user?',
                time: '3 hours ago',
                read: true
            }
        ]
    };

    const getIcon = (type) => {
        switch (type) {
            case 'like': return <FavoriteIcon sx={{ color: '#ef4444' }} />;
            case 'comment': return <CommentIcon sx={{ color: '#3b82f6' }} />;
            case 'follow': return <PersonAddIcon sx={{ color: '#10b981' }} />;
            case 'mention': return <StarIcon sx={{ color: '#f59e0b' }} />;
            default: return <NotificationsIcon />;
        }
    };

    return (
        <Container mode={mode}>
            <Header>
                <HeaderTitle mode={mode}>Notifications</HeaderTitle>
                <Badge badgeContent={3} color="primary">
                    <NotificationsIcon />
                </Badge>
            </Header>

            <TabsContainer>
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab label="All" />
                    <Tab label="Mentions" />
                </Tabs>
            </TabsContainer>

            <NotificationsList>
                {(tab === 0 ? notifications.all : notifications.mentions).map((notification, index) => (
                    <NotificationItem
                        key={notification.id}
                        read={notification.read}
                        mode={mode}
                        index={index}
                    >
                        <IconContainer type={notification.type}>
                            {getIcon(notification.type)}
                        </IconContainer>

                        <NotificationContent>
                            <NotificationHeader>
                                <Avatar src={notification.user.avatar} />
                                <NotificationText mode={mode}>
                                    <UserName>{notification.user.name}</UserName>
                                    {notification.content}
                                    {notification.target && (
                                        <Target mode={mode}>"{notification.target}"</Target>
                                    )}
                                </NotificationText>
                            </NotificationHeader>

                            <NotificationTime mode={mode}>
                                {notification.time}
                            </NotificationTime>
                        </NotificationContent>
                    </NotificationItem>
                ))}
            </NotificationsList>
        </Container>
    );
}

const Container = styled.div`
  padding: 24px;
  background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#1e293b'};
  min-height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const HeaderTitle = styled.h1`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 24px;
  font-weight: 600;
`;

const TabsContainer = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#334155'};
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background-color: ${props => props.read ?
        (props.mode === 'light' ? '#ffffff' : '#334155') :
        (props.mode === 'light' ? '#f1f5f9' : '#475569')};
  border-radius: 12px;
  gap: 16px;
  animation: ${fadeIn} 0.3s ease forwards, ${slideIn} 0.3s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;

  &:hover {
    background-color: ${props => props.mode === 'light' ? '#f1f5f9' : '#475569'};
  }
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
        switch (props.type) {
            case 'like': return '#fef2f2';
            case 'comment': return '#eff6ff';
            case 'follow': return '#f0fdf4';
            case 'mention': return '#fffbeb';
            default: return '#f1f5f9';
        }
    }};
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const NotificationText = styled.div`
  color: ${props => props.mode === 'light' ? '#475569' : '#94a3b8'};
  font-size: 14px;
  line-height: 1.5;
`;

const UserName = styled.span`
  font-weight: 600;
  margin-right: 4px;
`;

const Target = styled.div`
  color: ${props => props.mode === 'light' ? '#64748b' : '#cbd5e1'};
  margin-top: 4px;
  font-style: italic;
`;

const NotificationTime = styled.div`
  color: ${props => props.mode === 'light' ? '#94a3b8' : '#64748b'};
  font-size: 12px;
  margin-top: 4px;
`;

export default Notifications; 