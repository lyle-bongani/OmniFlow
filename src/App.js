import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Messages from './pages/Messages';
import Content from './pages/Content';
import Discover from './pages/Discover';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import PostContent from './pages/PostContent';

function App() {
  const [mode, setMode] = useState('light');
  const navigate = useNavigate();

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: '#7c3aed', // Purple main color
        light: '#9f67ff',
        dark: '#5b21b6',
      },
      secondary: {
        main: '#10b981', // Emerald green
      }
    }
  }), [mode]);

  const handleThemeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer mode={mode}>
        <AppHeader mode={mode}>
          <HeaderContent>
            <Logo mode={mode} onClick={() => navigate('/')}>
              <LogoIcon>⚡</LogoIcon>
              OmniFlow
            </Logo>
            <HeaderActions>
              <HeaderButton>Upgrade to Pro</HeaderButton>
            </HeaderActions>
          </HeaderContent>
        </AppHeader>

        <AppBody>
          <Sidebar mode={mode} />
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard mode={mode} />} />
              <Route path="/messages" element={<Messages mode={mode} />} />
              <Route path="/content" element={<Content mode={mode} />} />
              <Route path="/discover" element={<Discover mode={mode} />} />
              <Route path="/notifications" element={<Notifications mode={mode} />} />
              <Route path="/settings" element={<Settings mode={mode} onThemeChange={handleThemeChange} />} />
              <Route path="/post" element={<PostContent />} />
            </Routes>
          </MainContent>
        </AppBody>
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#1e293b'};
`;

const AppHeader = styled.header`
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-bottom: 1px solid ${props => props.mode === 'light' ? '#e2e8f0' : '#475569'};
  padding: 16px 24px;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  cursor: pointer;
`;

const LogoIcon = styled.span`
  font-size: 28px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const HeaderButton = styled.button`
  background-color: #7c3aed;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #6d28d9;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: calc(100vh - 73px); // Subtract header height
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
`;

export default App;
