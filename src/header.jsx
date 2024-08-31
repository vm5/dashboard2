import React, { useState } from 'react';
import { AppBar, Toolbar, Typography,IconButton } from '@mui/material';
import { styled, keyframes} from '@mui/material/styles';

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
  textAlign: 'center',
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
const HeaderContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  marginTop: '20px',
});

// Styled component for the sliding heading
const SlidingHeading = styled(Typography)(({ theme }) => ({
  animation: `${slideDown} 1.5s ease-out`,
  fontFamily: 'Verdana',
  color: 'silver',
  marginBottom: '20px',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
  '& span': {
    color: 'purple',
  },
}));

const SignInButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: '15px',
  right: '20px',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '25px',
  padding: '12px 24px',
  fontSize: '1rem',
  fontFamily: 'Verdana',
  cursor: 'pointer',
  transition: 'background-color 0.3s, transform 0.3s',
  zIndex: 2000,
  display: 'flex',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  },
  '& img': {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
    padding: '10px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: '8px 16px',
  },
}));

// Header component
const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    if (!isSignedIn) {
      setIsSignedIn(true);
      const middlePosition = document.body.scrollHeight / 3.9;
      window.scrollTo({
        top: middlePosition,
        behavior: 'smooth',
      });
    } else {
      window.location.href = '/';
    }
  };

  return (
    <HeaderContainer position="static">
      <Toolbar>
        <SignInButton onClick={handleSignIn}>
          <img src="/dm-removebg-preview.png" alt="Google Logo" />
          {isSignedIn ? 'Exit' : 'Get Started'}
        </SignInButton>
        <HeaderContent>
          <SlidingHeading variant="h1">
            Welcome to nucleus<span>FUSION</span>
          </SlidingHeading>
        </HeaderContent>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
