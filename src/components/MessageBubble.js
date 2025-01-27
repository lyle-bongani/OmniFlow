import React from 'react';
import styled from 'styled-components';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function MessageBubble({ message, timestamp, sender, isReceived, isDarkMode }) {
    return (
        <Container className="message-animation" isReceived={isReceived}>
            <MessageContent isReceived={isReceived} isDarkMode={isDarkMode}>
                <SenderName isDarkMode={isDarkMode}>{sender}</SenderName>
                {message}
                <MessageInfo>
                    <TimeStamp isDarkMode={isDarkMode}>{timestamp}</TimeStamp>
                    {!isReceived && <StyledDoneAll />}
                </MessageInfo>
            </MessageContent>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: ${props => props.isReceived ? 'flex-start' : 'flex-end'};
  padding: 10px;
  position: relative;
`;

const MessageContent = styled.div`
  position: relative;
  background-color: ${props => {
        if (props.isDarkMode) {
            return props.isReceived ? '#202c33' : '#005c4b';
        }
        return props.isReceived ? '#ffffff' : '#dcf8c6';
    }};
  padding: 8px 12px;
  border-radius: 7.5px;
  max-width: 65%;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  color: ${props => props.isDarkMode ? '#e9edef' : 'inherit'};
  transition: background-color 0.3s ease, color 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    ${props => props.isReceived ? 'left: -8px;' : 'right: -8px;'}
    width: 0;
    height: 0;
    border-top: 8px solid ${props => props.isReceived ? '#ffffff' : '#dcf8c6'};
    ${props => props.isReceived ? 'border-right: 8px solid transparent;' : 'border-left: 8px solid transparent;'}
  }
`;

const SenderName = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.isDarkMode ? '#00a884' : '#128C7E'};
  display: block;
  margin-bottom: 4px;
  transition: color 0.3s ease;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 4px;
  gap: 4px;
`;

const TimeStamp = styled.span`
  font-size: 0.7rem;
  color: ${props => props.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.45)'};
  transition: color 0.3s ease;
`;

const StyledDoneAll = styled(DoneAllIcon)`
  font-size: 14px !important;
  color: #34B7F1;
`;

export default MessageBubble; 