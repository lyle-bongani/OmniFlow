import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ThemeToggle({ isDarkMode, toggleTheme }) {
    return (
        <IconButton onClick={toggleTheme} sx={{ color: isDarkMode ? '#fff' : '#000' }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}

export default ThemeToggle; 