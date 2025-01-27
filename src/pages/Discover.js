import React, { useState } from 'react';
import styled from 'styled-components';
import { IconButton, Avatar, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { fadeIn, slideUp } from '../utils/animations';

function Discover({ mode }) {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All', 'Technology', 'Design', 'Development', 'Business',
        'Marketing', 'Photography', 'Music', 'Art'
    ];

    const trendingPosts = [
        {
            id: 1,
            user: {
                name: 'John Doe',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
            },
            image: 'https://picsum.photos/seed/post1/600/400',
            title: 'The Future of AI Development',
            description: 'Exploring the latest trends in artificial intelligence...',
            likes: 1234,
            category: 'Technology',
            tags: ['AI', 'Technology', 'Future']
        },
        {
            id: 2,
            user: {
                name: 'Sarah Smith',
                avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
            },
            image: 'https://picsum.photos/seed/post2/600/400',
            title: 'Modern Web Design Principles',
            description: 'Key principles for creating engaging web experiences...',
            likes: 856,
            category: 'Design',
            tags: ['Design', 'Web', 'UI/UX']
        }
    ];

    return (
        <Container mode={mode}>
            <Header>
                <SearchContainer mode={mode}>
                    <SearchIcon />
                    <SearchInput
                        placeholder="Search for content, creators, or tags..."
                        mode={mode}
                    />
                </SearchContainer>
            </Header>

            <Categories>
                {categories.map((category) => (
                    <CategoryChip
                        key={category}
                        label={category}
                        clickable
                        onClick={() => setSelectedCategory(category)}
                        selected={selectedCategory === category}
                        mode={mode}
                    />
                ))}
            </Categories>

            <TrendingSection>
                <SectionTitle mode={mode}>
                    <TrendingUpIcon />
                    Trending Now
                </SectionTitle>
                <PostGrid>
                    {trendingPosts.map((post, index) => (
                        <PostCard key={post.id} mode={mode} index={index}>
                            <PostImage src={post.image} alt={post.title} />
                            <PostContent>
                                <PostHeader>
                                    <UserInfo>
                                        <Avatar src={post.user.avatar} />
                                        <UserName mode={mode}>{post.user.name}</UserName>
                                    </UserInfo>
                                    <CategoryLabel mode={mode}>{post.category}</CategoryLabel>
                                </PostHeader>
                                <PostTitle mode={mode}>{post.title}</PostTitle>
                                <PostDescription mode={mode}>{post.description}</PostDescription>
                                <TagsContainer>
                                    {post.tags.map(tag => (
                                        <Tag key={tag} mode={mode}>#{tag}</Tag>
                                    ))}
                                </TagsContainer>
                                <PostActions>
                                    <ActionButton mode={mode}>
                                        <FavoriteIcon />
                                        <span>{post.likes}</span>
                                    </ActionButton>
                                    <ActionButton mode={mode}>
                                        <ShareIcon />
                                    </ActionButton>
                                    <ActionButton mode={mode}>
                                        <BookmarkIcon />
                                    </ActionButton>
                                </PostActions>
                            </PostContent>
                        </PostCard>
                    ))}
                </PostGrid>
            </TrendingSection>
        </Container>
    );
}

const Container = styled.div`
  padding: 24px;
  background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#1e293b'};
  min-height: 100%;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  svg {
    color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
    margin-right: 12px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: none;
  width: 100%;
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 16px;

  &::placeholder {
    color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  }
`;

const Categories = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  overflow-x: auto;
  padding-bottom: 8px;

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

const CategoryChip = styled(Chip)`
  background-color: ${props => props.selected ? '#7c3aed !important' :
        (props.mode === 'light' ? '#ffffff !important' : '#334155 !important')};
  color: ${props => props.selected ? '#ffffff !important' :
        (props.mode === 'light' ? '#1e293b !important' : '#f8fafc !important')};
  transition: all 0.3s ease !important;

  &:hover {
    background-color: ${props => props.selected ? '#6d28d9 !important' :
        (props.mode === 'light' ? '#f1f5f9 !important' : '#475569 !important')};
  }
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const PostCard = styled.div`
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

const TrendingSection = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 20px;
  margin-bottom: 24px;
`;

const PostImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const PostContent = styled.div`
  padding: 16px;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.span`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-weight: 500;
`;

const CategoryLabel = styled.span`
  background-color: ${props => props.mode === 'light' ? '#f1f5f9' : '#475569'};
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const PostTitle = styled.h3`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 18px;
  margin-bottom: 8px;
`;

const PostDescription = styled.p`
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  font-size: 14px;
  margin-bottom: 16px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  color: ${props => props.mode === 'light' ? '#6d28d9' : '#a78bfa'};
  font-size: 14px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 16px;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
    background-color: ${props => props.mode === 'light' ? '#f1f5f9' : '#475569'};
  }
`;

export default Discover; 