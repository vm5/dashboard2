import React from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animation for fading in elements
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Animation for sliding down the heading
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled component for the header container
const HeaderContainer = styled(AppBar)(({ theme }) => ({
  background: '#111',
  borderBottom: '2px solid #3399ff',
  color: '#f0f0f0',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  animation: `${fadeIn} 1.5s ease-in-out`,
  zIndex: 1000,
  width: '100%',
  position: 'relative',
  padding: theme.spacing(2, 1),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5),
  },
}));

// Styled component for the header content
const HeaderContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column', // Change to column direction
  alignItems: 'center', // Center horizontally
  justifyContent: 'center', // Center vertically
  width: '100%',
  textAlign: 'center', // Center text within its container
  gap: theme.spacing(2), // Add gap between children
}));

const SlidingHeading = styled(Typography)(({ theme }) => ({
  animation: `${slideDown} 1.5s ease-out`,
  fontFamily: 'Verdana',
  color: 'silver',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
  textAlign: 'center', // Center text within its container
  marginBottom: theme.spacing(4), // Space between heading and nav links
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
  '& span': {
    color: 'purple',
  },
  '& p': {
    color: 'white',
    fontFamily: 'Verdana',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  },
}));

const Header = () => {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <HeaderContent>
          <SlidingHeading variant="h1">
            Hein<span>weis</span>
            <p>Your career, our connection!</p>
          </SlidingHeading>
        </HeaderContent>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
