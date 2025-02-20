import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import DocumentIcon from '@mui/icons-material/Description';
import Picker from 'emoji-picker-react';

function ChatInput({ onSend, onTyping }) {
    const [message, setMessage] = useState('');
    const [showAttachments, setShowAttachments] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        if (message) {
            onTyping(true);
        } else {
            onTyping(false);
        }
    }, [message, onTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSend(e);
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setMessage(prevMessage => prevMessage + emojiObject.emoji);
    };

    return (
        <Container>
            {showAttachments && (
                <AttachmentMenu>
                    <AttachmentButton>
                        <ImageIcon />
                        <span>Image</span>
                    </AttachmentButton>
                    <AttachmentButton>
                        <VideocamIcon />
                        <span>Video</span>
                    </AttachmentButton>
                    <AttachmentButton>
                        <DocumentIcon />
                        <span>Document</span>
                    </AttachmentButton>
                </AttachmentMenu>
            )}
            {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
            <InputContainer>
                <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <InsertEmoticonIcon />
                </IconButton>
                <IconButton onClick={() => setShowAttachments(!showAttachments)}>
                    <AttachFileIcon style={{ transform: 'rotate(45deg)' }} />
                </IconButton>
                <Form onSubmit={handleSend}>
                    <Input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                        onKeyPress={handleKeyPress}
                    />
                </Form>
                <IconButton>
                    {message ? <SendIcon onClick={handleSend} /> : <MicIcon />}
                </IconButton>
            </InputContainer>
        </Container>
    );
}

const Container = styled.div`
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f2f5;
  position: relative;
  z-index: 1;
`;

const Form = styled.form`
  flex: 1;
  margin: 0 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 9px 12px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  background-color: white;
`;

const AttachmentMenu = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50px;
  background-color: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const AttachmentButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  color: #54656f;

  &:hover {
    background-color: #f0f2f5;
  }

  span {
    font-size: 12px;
  }

  .MuiSvgIcon-root {
    color: #8696a0;
  }
`;

export default ChatInput;