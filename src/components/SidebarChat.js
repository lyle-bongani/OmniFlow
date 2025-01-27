import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';

function SidebarChat({ name, message }) {
    return (
        <Container>
            <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
            <ChatInfo>
                <h2>{name}</h2>
                <p>{message}</p>
            </ChatInfo>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;

  &:hover {
    background-color: #ebebeb;
  }
`;

const ChatInfo = styled.div`
  margin-left: 15px;

  h2 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  p {
    color: gray;
  }
`;

export default SidebarChat; 