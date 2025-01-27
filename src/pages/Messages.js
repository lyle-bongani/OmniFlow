import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fadeIn, slideIn } from '../utils/animations';

function Messages({ mode }) {
    const [selectedChat, setSelectedChat] = useState(null);

    const chats = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            lastMessage: "Hey, how's it going?",
            time: "12:30 PM",
            unread: 2,
            online: true
        },
        {
            id: 2,
            name: "Sarah Smith",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            lastMessage: "The project looks great!",
            time: "10:45 AM",
            unread: 0,
            online: false
        }
    ];

    return (
        <Container>
            <ChatsList>
                <SearchContainer>
                    <SearchWrapper mode={mode}>
                        <SearchIcon />
                        <SearchInput placeholder="Search messages..." mode={mode} />
                    </SearchWrapper>
                </SearchContainer>

                <ChatsContainer>
                    {chats.map((chat, index) => (
                        <ChatItem
                            key={chat.id}
                            selected={selectedChat === chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            mode={mode}
                            index={index}
                        >
                            <ChatAvatar>
                                <Badge
                                    variant="dot"
                                    color="success"
                                    invisible={!chat.online}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                >
                                    <Avatar src={chat.avatar} />
                                </Badge>
                            </ChatAvatar>
                            <ChatInfo>
                                <ChatHeader>
                                    <ChatName mode={mode}>{chat.name}</ChatName>
                                    <ChatTime mode={mode}>{chat.time}</ChatTime>
                                </ChatHeader>
                                <LastMessage mode={mode}>{chat.lastMessage}</LastMessage>
                            </ChatInfo>
                            {chat.unread > 0 && (
                                <UnreadBadge>{chat.unread}</UnreadBadge>
                            )}
                        </ChatItem>
                    ))}
                </ChatsContainer>
            </ChatsList>

            <ChatView mode={mode}>
                {selectedChat ? (
                    <ActiveChat>
                        <ChatHeader mode={mode}>
                            <ChatHeaderInfo>
                                <Avatar src={chats.find(c => c.id === selectedChat)?.avatar} />
                                <div>
                                    <ChatHeaderName mode={mode}>
                                        {chats.find(c => c.id === selectedChat)?.name}
                                    </ChatHeaderName>
                                    <ChatHeaderStatus>Online</ChatHeaderStatus>
                                </div>
                            </ChatHeaderInfo>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </ChatHeader>
                        <ChatMessages>
                            {/* Messages will go here */}
                        </ChatMessages>
                        <ChatInput mode={mode}>
                            <Input
                                placeholder="Type a message..."
                                mode={mode}
                            />
                            <SendButton mode={mode}>Send</SendButton>
                        </ChatInput>
                    </ActiveChat>
                ) : (
                    <NoChat mode={mode}>
                        <h3>Select a conversation</h3>
                        <p>Choose from your existing conversations or start a new one.</p>
                    </NoChat>
                )}
            </ChatView>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#1e293b'};
`;

const ChatsList = styled.div`
  width: 350px;
  border-right: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#334155'};
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  padding: 16px;
  border-bottom: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#334155'};
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: ${props => props.mode === 'light' ? '#f1f5f9' : '#334155'};
  border-radius: 24px;
  gap: 8px;

  svg {
    color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  flex: 1;
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};

  &::placeholder {
    color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  }
`;

const ChatsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  background-color: ${props => props.selected ?
        (props.mode === 'light' ? '#f1f5f9' : '#334155') : 'transparent'};
  animation: ${fadeIn} 0.3s ease forwards, ${slideIn} 0.3s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;

  &:hover {
    background-color: ${props => props.mode === 'light' ? '#f1f5f9' : '#334155'};
  }
`;

const ChatAvatar = styled.div`
  position: relative;
`;

const ChatInfo = styled.div`
  flex: 1;
  margin-left: 12px;
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const ChatName = styled.h3`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 16px;
  font-weight: 500;
`;

const ChatTime = styled.span`
  color: ${props => props.mode === 'light' ? '#94a3b8' : '#64748b'};
  font-size: 12px;
`;

const LastMessage = styled.p`
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnreadBadge = styled.div`
  background-color: #7c3aed;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
`;

const ChatView = styled.div`
  flex: 1;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

const ActiveChat = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatHeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChatHeaderName = styled.h2`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 18px;
`;

const ChatHeaderStatus = styled.span`
  color: #10b981;
  font-size: 14px;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const ChatInput = styled.div`
  padding: 16px;
  border-top: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#475569'};
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border-radius: 24px;
  border: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#475569'};
  background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#1e293b'};
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  outline: none;

  &:focus {
    border-color: #7c3aed;
  }
`;

const SendButton = styled.button`
  background-color: #7c3aed;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #6d28d9;
  }
`;

const NoChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  text-align: center;
  padding: 24px;

  h3 {
    margin-bottom: 8px;
    color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  }
`;

export default Messages; 