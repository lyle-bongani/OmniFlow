import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import SendIcon from '@mui/icons-material/Send';

function StoryViewer({ onClose, stories, currentStoryIndex = 0 }) {
    const [activeStory, setActiveStory] = useState(currentStoryIndex);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            if (progress < 100) {
                setProgress(prev => prev + 1);
            } else {
                if (activeStory < stories.length - 1) {
                    setActiveStory(prev => prev + 1);
                    setProgress(0);
                } else {
                    onClose();
                }
            }
        }, 50);

        return () => clearInterval(timer);
    }, [progress, activeStory, stories.length, onClose]);

    const handleNext = () => {
        if (activeStory < stories.length - 1) {
            setActiveStory(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (activeStory > 0) {
            setActiveStory(prev => prev - 1);
            setProgress(0);
        }
    };

    return (
        <Container>
            <Overlay onClick={onClose} />
            <StoryContainer>
                <ProgressContainer>
                    {stories.map((_, index) => (
                        <ProgressBar key={index}>
                            <Progress
                                style={{
                                    width: `${index === activeStory ? progress : index < activeStory ? 100 : 0}%`
                                }}
                            />
                        </ProgressBar>
                    ))}
                </ProgressContainer>

                <Header>
                    <UserInfo>
                        <Avatar src={stories[activeStory].avatar} />
                        <Username>{stories[activeStory].username}</Username>
                    </UserInfo>
                    <IconButton onClick={onClose}>
                        <CloseIcon style={{ color: 'white' }} />
                    </IconButton>
                </Header>

                <StoryContent>
                    <NavigationButton onClick={handlePrevious} disabled={activeStory === 0}>
                        <NavigateBeforeIcon />
                    </NavigationButton>

                    <StoryImage src={stories[activeStory].content} alt="story" />

                    <NavigationButton onClick={handleNext} right>
                        <NavigateNextIcon />
                    </NavigationButton>
                </StoryContent>

                <ReplyContainer>
                    <ReplyInput placeholder="Reply to story..." />
                    <IconButton>
                        <SendIcon style={{ color: 'white' }} />
                    </IconButton>
                </ReplyContainer>
            </StoryContainer>
        </Container>
    );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
`;

const StoryContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 80vh;
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const ProgressContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: white;
  transition: width 0.05s linear;
`;

const Header = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Username = styled.span`
  color: white;
  font-weight: 500;
`;

const StoryContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StoryImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
`;

const NavigationButton = styled.button`
  position: absolute;
  ${props => props.right ? 'right: 0;' : 'left: 0;'}
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    opacity: 0;
    cursor: default;
  }
`;

const ReplyContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReplyInput = styled.input`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 20px;
  padding: 12px 20px;
  color: white;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export default StoryViewer; 