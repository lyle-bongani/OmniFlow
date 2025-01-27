import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Switch,
    Avatar,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LanguageIcon from '@mui/icons-material/Language';
import PaletteIcon from '@mui/icons-material/Palette';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fadeIn, slideUp } from '../utils/animations';

function Settings({ mode, onThemeChange }) {
    const [activeSection, setActiveSection] = useState('profile');
    const [settings, setSettings] = useState({
        language: 'en',
        emailNotifications: true,
        pushNotifications: true,
        profileVisibility: 'public',
        darkMode: mode === 'dark',
    });

    const handleSettingChange = (setting, value) => {
        setSettings(prev => ({
            ...prev,
            [setting]: value
        }));
    };

    const sections = [
        { id: 'profile', label: 'Profile', icon: <EditIcon /> },
        { id: 'privacy', label: 'Privacy & Security', icon: <SecurityIcon /> },
        { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon /> },
        { id: 'appearance', label: 'Appearance', icon: <PaletteIcon /> },
        { id: 'language', label: 'Language', icon: <LanguageIcon /> }
    ];

    return (
        <Container mode={mode}>
            <SettingsLayout>
                <Sidebar mode={mode}>
                    {sections.map((section) => (
                        <SidebarItem
                            key={section.id}
                            active={activeSection === section.id}
                            onClick={() => setActiveSection(section.id)}
                            mode={mode}
                        >
                            {section.icon}
                            <span>{section.label}</span>
                        </SidebarItem>
                    ))}
                </Sidebar>

                <Content mode={mode}>
                    {activeSection === 'profile' && (
                        <Section>
                            <SectionTitle mode={mode}>Profile Settings</SectionTitle>
                            <ProfileSection mode={mode}>
                                <AvatarSection>
                                    <Avatar
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=current"
                                        sx={{ width: 100, height: 100 }}
                                    />
                                    <ChangeAvatarButton variant="outlined">
                                        Change Avatar
                                    </ChangeAvatarButton>
                                </AvatarSection>
                                <FormGroup>
                                    <TextField
                                        label="Display Name"
                                        defaultValue="John Doe"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Bio"
                                        defaultValue="Web Developer & Designer"
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Email"
                                        defaultValue="john@example.com"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </FormGroup>
                            </ProfileSection>
                        </Section>
                    )}

                    {activeSection === 'privacy' && (
                        <Section>
                            <SectionTitle mode={mode}>Privacy & Security</SectionTitle>
                            <SettingItem mode={mode}>
                                <SettingLabel>
                                    <VisibilityIcon />
                                    Profile Visibility
                                </SettingLabel>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={settings.profileVisibility}
                                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                                    >
                                        <MenuItem value="public">Public</MenuItem>
                                        <MenuItem value="private">Private</MenuItem>
                                        <MenuItem value="friends">Friends Only</MenuItem>
                                    </Select>
                                </FormControl>
                            </SettingItem>
                            <Divider />
                            {/* Add more privacy settings */}
                        </Section>
                    )}

                    {activeSection === 'notifications' && (
                        <Section>
                            <SectionTitle mode={mode}>Notification Preferences</SectionTitle>
                            <SettingItem mode={mode}>
                                <SettingLabel>Email Notifications</SettingLabel>
                                <Switch
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                    color="primary"
                                />
                            </SettingItem>
                            <SettingItem mode={mode}>
                                <SettingLabel>Push Notifications</SettingLabel>
                                <Switch
                                    checked={settings.pushNotifications}
                                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                                    color="primary"
                                />
                            </SettingItem>
                        </Section>
                    )}

                    {activeSection === 'appearance' && (
                        <Section>
                            <SectionTitle mode={mode}>Appearance</SectionTitle>
                            <SettingItem mode={mode}>
                                <SettingLabel>Dark Mode</SettingLabel>
                                <Switch
                                    checked={settings.darkMode}
                                    onChange={(e) => {
                                        handleSettingChange('darkMode', e.target.checked);
                                        onThemeChange(e.target.checked ? 'dark' : 'light');
                                    }}
                                    color="primary"
                                />
                            </SettingItem>
                        </Section>
                    )}

                    {activeSection === 'language' && (
                        <Section>
                            <SectionTitle mode={mode}>Language Settings</SectionTitle>
                            <SettingItem mode={mode}>
                                <SettingLabel>Select Language</SettingLabel>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={settings.language}
                                        onChange={(e) => handleSettingChange('language', e.target.value)}
                                    >
                                        <MenuItem value="en">English</MenuItem>
                                        <MenuItem value="es">Español</MenuItem>
                                        <MenuItem value="fr">Français</MenuItem>
                                        <MenuItem value="de">Deutsch</MenuItem>
                                    </Select>
                                </FormControl>
                            </SettingItem>
                        </Section>
                    )}
                </Content>
            </SettingsLayout>
        </Container>
    );
}

const Container = styled.div`
  padding: 24px;
  background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#1e293b'};
  min-height: 100%;
`;

const SettingsLayout = styled.div`
  display: flex;
  gap: 24px;
  animation: ${fadeIn} 0.5s ease forwards;
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: ${props => props.mode === 'light' ?
        (props.active ? '#7c3aed' : '#475569') :
        (props.active ? '#7c3aed' : '#94a3b8')};
  background-color: ${props => props.active ?
        (props.mode === 'light' ? '#f5f3ff' : '#312e81') : 'transparent'};

  &:hover {
    background-color: ${props => props.mode === 'light' ? '#f8fafc' : '#475569'};
  }
`;

const Content = styled.div`
  flex: 1;
  background-color: ${props => props.mode === 'light' ? '#ffffff' : '#334155'};
  border-radius: 12px;
  padding: 24px;
`;

const Section = styled.div`
  animation: ${slideUp} 0.5s ease forwards;
`;

const SectionTitle = styled.h2`
  color: ${props => props.mode === 'light' ? '#1e293b' : '#f8fafc'};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
`;

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ChangeAvatarButton = styled(Button)`
  text-transform: none !important;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  color: ${props => props.mode === 'light' ? '#475569' : '#94a3b8'};
`;

const SettingLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
`;

export default Settings; 