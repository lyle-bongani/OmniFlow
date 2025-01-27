import React from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import MessageBubble from './MessageBubble';
import StatusBar from './StatusBar';
import ChatInput from './ChatInput';

function Chat() {
    return (
        <ChatContainer className="chat-animation">
            <ChatHeader>
                <HeaderLeft>
                    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                    <HeaderInfo>
                        <h3>John Doe</h3>
                        <StatusBar isOnline={true} isTyping={false} />
                    </HeaderInfo>
                </HeaderLeft>
                <HeaderRight>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderRight>
            </ChatHeader>

            <ChatBody>
                <MessageBubble
                    message="Hey everyone! How's it going?"
                    timestamp="3:52pm"
                    sender="John Doe"
                    isReceived={true}
                />
                <MessageBubble
                    message="All good here! Working on the new project."
                    timestamp="3:55pm"
                    sender="You"
                    isReceived={false}
                />
                <MessageBubble
                    message="That's great to hear! Let's catch up later."
                    timestamp="3:56pm"
                    sender="Jane Smith"
                    isReceived={true}
                />
            </ChatBody>

            <ChatInput onSend={(message) => console.log(message)} />
        </ChatContainer>
    );
}

const ChatContainer = styled.div`
  flex: 0.65;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const HeaderInfo = styled.div`
  h3 {
    margin-bottom: 3px;
    font-weight: 500;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 10px;
`;

const ChatBody = styled.div`
  flex: 1;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-repeat: repeat;
  background-position: center;
  padding: 30px;
  overflow-y: scroll;
`;

const ChatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  border-top: 1px solid lightgray;
  padding: 0 10px;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: white;
  border-radius: 30px;
  margin: 0 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  border: none;
  padding: 10px;
  outline: none;
  font-size: 16px;
`;

export default Chat; 