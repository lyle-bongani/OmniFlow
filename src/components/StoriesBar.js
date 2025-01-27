import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StoryViewer from './StoryViewer';
import { fadeIn, slideIn } from '../utils/animations';

function StoriesBar({ mode }) {
    const [selectedStory, setSelectedStory] = useState(null);

    const stories = [
        { id: 1, name: 'Your Story', image: null, isAdd: true },
        { id: 2, name: 'John Doe', username: 'johndoe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', content: 'https://picsum.photos/seed/story1/800/1000', active: true },
        { id: 3, name: 'Sarah', username: 'sarah_smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', content: 'https://picsum.photos/seed/story2/800/1000', active: true },
        { id: 4, name: 'Mike', username: 'mike_jones', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', content: 'https://picsum.photos/seed/story3/800/1000', active: true },
        { id: 5, name: 'Emma', username: 'emma_wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', content: 'https://picsum.photos/seed/story4/800/1000', active: false },
    ];

    const handleStoryClick = (storyId) => {
        if (!stories.find(story => story.id === storyId).isAdd) {
            setSelectedStory(storyId);
        }
    };

    return (
        <>
            <Container mode={mode}>
                <StoriesWrapper>
                    {stories.map((story, index) => (
                        <StoryItem key={story.id} onClick={() => handleStoryClick(story.id)} index={index}>
                            <StoryAvatar active={story.active} mode={mode}>
                                {story.isAdd ? (
                                    <AddStoryButton>
                                        <AddCircleIcon />
                                    </AddStoryButton>
                                ) : (
                                    <Avatar src={story.avatar} sx={{ width: 56, height: 56 }} />
                                )}
                            </StoryAvatar>
                            <StoryName mode={mode}>{story.name}</StoryName>
                        </StoryItem>
                    ))}
                </StoriesWrapper>
            </Container>

            {selectedStory && (
                <StoryViewer
                    stories={stories.filter(story => !story.isAdd)}
                    currentStoryIndex={stories.findIndex(story => story.id === selectedStory) - 1}
                    onClose={() => setSelectedStory(null)}
                />
            )}
        </>
    );
}

const Container = styled.div`
    background-color: ${props => props.mode === 'light' ? '#ffffff' : '#1e293b'};
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StoriesWrapper = styled.div`
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 4px;

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
    }
`;

const StoryItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    min-width: 80px;
    animation: ${fadeIn} 0.5s ease forwards, ${slideIn} 0.5s ease forwards;
    animation-delay: ${props => props.index * 0.1}s;
    opacity: 0;
    
    &:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
`;

const StoryAvatar = styled.div`
    padding: 3px;
    border-radius: 50%;
    background: ${props => props.active ? 'linear-gradient(45deg, #7c3aed, #3b82f6)' : 'none'};
    border: ${props => !props.active ? `2px solid ${props.mode === 'light' ? '#e2e8f0' : '#475569'}` : 'none'};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const AddStoryButton = styled(IconButton)`
    color: #7c3aed !important;
    width: 56px !important;
    height: 56px !important;
`;

const StoryName = styled.span`
    font-size: 12px;
    color: ${props => props.mode === 'light' ? '#475569' : '#94a3b8'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80px;
    text-align: center;
`;

export default StoriesBar;