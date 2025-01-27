import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs, Tab, IconButton, Button } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fadeIn, slideUp } from '../utils/animations';

function Content({ mode }) {
    const [tab, setTab] = useState(0);

    const content = {
        videos: [
            {
                id: 1,
                thumbnail: "https://picsum.photos/seed/video1/300/200",
                title: "Getting Started with React",
                views: "1.2K views",
                date: "2 days ago",
                duration: "12:34"
            },
            {
                id: 2,
                thumbnail: "https://picsum.photos/seed/video2/300/200",
                title: "Advanced JavaScript Concepts",
                views: "856 views",
                date: "5 days ago",
                duration: "15:20"
            }
        ],
        images: [
            {
                id: 1,
                url: "https://picsum.photos/seed/img1/300/300",
                title: "Nature Photography",
                likes: 234
            },
            {
                id: 2,
                url: "https://picsum.photos/seed/img2/300/300",
                title: "Urban Landscapes",
                likes: 156
            }
        ],
        articles: [
            {
                id: 1,
                title: "The Future of Web Development",
                excerpt: "Exploring upcoming trends and technologies...",
                readTime: "5 min read",
                date: "June 15, 2024"
            },
            {
                id: 2,
                title: "Mastering React Hooks",
                excerpt: "A comprehensive guide to React Hooks...",
                readTime: "8 min read",
                date: "June 12, 2024"
            }
        ]
    };

    return (
        <Container mode={mode}>
            <Header>
                <HeaderTitle mode={mode}>Your Content</HeaderTitle>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ backgroundColor: '#7c3aed' }}
                >
                    Create New
                </Button>
            </Header>

            <TabsContainer>
                <Tabs
                    value={tab}
                    onChange={(e, newValue) => setTab(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                >
                    <Tab icon={<VideoLibraryIcon />} label="Videos" />
                    <Tab icon={<ImageIcon />} label="Images" />
                    <Tab icon={<ArticleIcon />} label="Articles" />
                </Tabs>
            </TabsContainer>

            <ContentGrid>
                {tab === 0 && content.videos.map((video, index) => (
                    <VideoCard key={video.id} mode={mode} index={index}>
                        <ThumbnailContainer>
                            <Thumbnail src={video.thumbnail} alt={video.title} />
                            <Duration>{video.duration}</Duration>
                        </ThumbnailContainer>
                        <CardContent>
                            <CardTitle mode={mode}>{video.title}</CardTitle>
                            <CardMeta mode={mode}>
                                {video.views} • {video.date}
                            </CardMeta>
                        </CardContent>
                        <IconButton size="small">
                            <MoreVertIcon />
                        </IconButton>
                    </VideoCard>
                ))}

                {tab === 1 && content.images.map((image, index) => (
                    <ImageCard key={image.id} mode={mode} index={index}>
                        <Image src={image.url} alt={image.title} />
                        <ImageOverlay>
                            <ImageTitle>{image.title}</ImageTitle>
                            <ImageLikes>{image.likes} likes</ImageLikes>
                        </ImageOverlay>
                    </ImageCard>
                ))}

                {tab === 2 && content.articles.map((article, index) => (
                    <ArticleCard key={article.id} mode={mode} index={index}>
                        <ArticleContent>
                            <ArticleTitle mode={mode}>{article.title}</ArticleTitle>
                            <ArticleExcerpt mode={mode}>{article.excerpt}</ArticleExcerpt>
                            <ArticleMeta mode={mode}>
                                {article.readTime} • {article.date}
                            </ArticleMeta>
                        </ArticleContent>
                        <IconButton size="small">
                            <MoreVertIcon />
                        </IconButton>
                    </ArticleCard>
                ))}
            </ContentGrid>
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

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const VideoCard = styled.div`
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease forwards, ${slideUp} 0.5s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;
  
  &:hover {
    transform: translateY(-4px);
    transition: transform 0.3s ease;
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Duration = styled.span`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const CardTitle = styled.h3`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 16px;
  margin-bottom: 8px;
`;

const CardMeta = styled.p`
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  font-size: 14px;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease forwards, ${slideUp} 0.5s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
`;

const ImageTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 4px;
`;

const ImageLikes = styled.span`
  font-size: 14px;
  opacity: 0.8;
`;

const ArticleCard = styled.div`
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  animation: ${fadeIn} 0.5s ease forwards, ${slideUp} 0.5s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;
  opacity: 0;

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
`;

const ArticleContent = styled.div`
  flex: 1;
  margin-right: 16px;
`;

const ArticleTitle = styled.h3`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 18px;
  margin-bottom: 8px;
`;

const ArticleExcerpt = styled.p`
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  font-size: 14px;
  margin-bottom: 12px;
`;

const ArticleMeta = styled.div`
  color: ${props => props.mode === 'light' ? '#94a3b8' : '#64748b'};
  font-size: 12px;
`;

export default Content; 