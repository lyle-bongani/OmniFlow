import React from 'react';
import styled from 'styled-components';
import { Paper, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import StoriesBar from './StoriesBar';
import LiveStreams from './LiveStreams';
import { fadeIn, slideUp } from '../utils/animations';

function Dashboard({ mode }) {
    return (
        <DashboardContainer>
            <MainContent>
                <AnimatedSection delay="0s">
                    <StoriesBar mode={mode} />
                </AnimatedSection>
                <AnimatedSection delay="0.1s">
                    <LiveStreams mode={mode} />
                </AnimatedSection>
                <FeedSection>
                    <SectionTitle>Your Feed</SectionTitle>
                    <PostCard>
                        <PostHeader>
                            <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                            <PostInfo>
                                <UserName>John Doe</UserName>
                                <PostMeta>Twitter • 2h ago</PostMeta>
                            </PostInfo>
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        </PostHeader>
                        <PostContent>
                            Just launched our new product! 🚀 Check it out and let me know what you think! #innovation #tech
                        </PostContent>
                        <PostActions>
                            <ActionButton>
                                <ThumbUpIcon />
                                <span>Like</span>
                            </ActionButton>
                            <ActionButton>
                                <ChatBubbleOutlineIcon />
                                <span>Comment</span>
                            </ActionButton>
                            <ActionButton>
                                <ShareIcon />
                                <span>Share</span>
                            </ActionButton>
                        </PostActions>
                    </PostCard>
                </FeedSection>
            </MainContent>

            <TrendsSection>
                <AnimatedSection delay="0.2s">
                    <SectionTitle>Trending</SectionTitle>
                    <TrendCard>
                        <TrendItem>
                            <TrendRank>#1</TrendRank>
                            <TrendInfo>
                                <TrendName>#TechNews</TrendName>
                                <TrendMeta>50.5K posts</TrendMeta>
                            </TrendInfo>
                        </TrendItem>
                    </TrendCard>
                </AnimatedSection>
            </TrendsSection>
        </DashboardContainer>
    );
}

const DashboardContainer = styled.div`
  flex: 1;
  display: flex;
  padding: 24px;
  gap: 24px;
  overflow-y: auto;
`;

const MainContent = styled.div`
  flex: 1;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

const FeedSection = styled.div`
  flex: 1;
  max-width: 680px;
`;

const TrendsSection = styled.div`
  width: 300px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #202124;
`;

const PostCard = styled(Paper)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px !important;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const PostInfo = styled.div`
  flex: 1;
  margin-left: 12px;
`;

const UserName = styled.div`
  font-weight: 500;
  color: #202124;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #5f6368;
`;

const PostContent = styled.div`
  margin-bottom: 12px;
  color: #202124;
  line-height: 1.5;
`;

const PostActions = styled.div`
  display: flex;
  gap: 16px;
  border-top: 1px solid #e0e0e0;
  padding-top: 12px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  padding: 8px;
  color: #5f6368;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #f8f9fa;
  }

  span {
    font-size: 14px;
  }
`;

const TrendCard = styled(Paper)`
  padding: 16px;
  border-radius: 8px !important;
`;

const TrendItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
`;

const TrendRank = styled.div`
  font-weight: 500;
  color: #5f6368;
  margin-right: 12px;
`;

const TrendInfo = styled.div`
  flex: 1;
`;

const TrendName = styled.div`
  font-weight: 500;
  color: #202124;
`;

const TrendMeta = styled.div`
  font-size: 12px;
  color: #5f6368;
`;

const AnimatedSection = styled.div`
  animation: ${fadeIn} 0.5s ease forwards, ${slideUp} 0.5s ease forwards;
  animation-delay: ${props => props.delay};
  opacity: 0;
`;

export default Dashboard; 