import React from 'react';
import styled from 'styled-components';
import { Paper, Avatar, Chip } from '@mui/material';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { scaleIn, pulse } from '../utils/animations';

function LiveStreams({ mode }) {
    const streams = [
        {
            id: 1,
            title: "Tech Talk Live",
            streamer: "Alex Tech",
            viewers: 1234,
            thumbnail: "https://picsum.photos/seed/stream1/300/200",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
        },
        {
            id: 2,
            title: "Gaming Stream",
            streamer: "GameMaster",
            viewers: 856,
            thumbnail: "https://picsum.photos/seed/stream2/300/200",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Game"
        }
    ];

    return (
        <Container mode={mode}>
            <SectionTitle mode={mode}>
                <LiveTvIcon />
                Live Now
            </SectionTitle>
            <StreamsGrid>
                {streams.map((stream, index) => (
                    <StreamCard key={stream.id} mode={mode} index={index}>
                        <ThumbnailContainer>
                            <Thumbnail src={stream.thumbnail} alt={stream.title} />
                            <LiveBadge>LIVE</LiveBadge>
                            <ViewerCount>
                                <VisibilityIcon fontSize="small" />
                                {stream.viewers}
                            </ViewerCount>
                        </ThumbnailContainer>
                        <StreamInfo>
                            <StreamerInfo>
                                <Avatar src={stream.avatar} sx={{ width: 32, height: 32 }} />
                                <div>
                                    <StreamTitle mode={mode}>{stream.title}</StreamTitle>
                                    <StreamerName mode={mode}>{stream.streamer}</StreamerName>
                                </div>
                            </StreamerInfo>
                        </StreamInfo>
                    </StreamCard>
                ))}
            </StreamsGrid>
        </Container>
    );
}

const Container = styled.div`
  padding: 24px;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#1e293b'};
  border-radius: 12px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};

  .MuiSvgIcon-root {
    color: #ef4444;
  }
`;

const StreamsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const StreamCard = styled(Paper)`
  overflow: hidden;
  border-radius: 12px !important;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'} !important;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: ${scaleIn} 0.5s ease forwards;
  opacity: 0;
  animation-delay: ${props => props.index * 0.1}s;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
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

const LiveBadge = styled(Chip)`
  position: absolute !important;
  top: 8px !important;
  left: 8px !important;
  background-color: #ef4444 !important;
  color: white !important;
  font-weight: 600 !important;
  height: 24px !important;
  animation: ${pulse} 2s infinite;
`;

const ViewerCount = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
`;

const StreamInfo = styled.div`
  padding: 12px;
`;

const StreamerInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StreamTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
`;

const StreamerName = styled.p`
  font-size: 12px;
  color: ${props => props.mode === 'light' ? '#64748b' : '#94a3b8'};
`;

export default LiveStreams; 