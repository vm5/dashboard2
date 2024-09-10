import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from './firebase'; // Ensure Firebase Firestore is properly configured
import { collection, query, where, getDocs } from 'firebase/firestore';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
  background-image: url('https://img.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-room-wall_1258-28313.jpg');
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: rgba(28, 37, 54, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    padding: 10px;
  }
`;

const SidebarItem = styled.div`
  padding: 15px;
  color: ${(props) => (props.active ? '#fff' : '#adb5bd')};
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 5px;
  border-radius: 5px;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  margin: 20px;

  @media (max-width: 768px) {
    margin: 0;
    padding: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WelcomeMessage = styled.div`
  font-size: 1.5em;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

const DateSelector = styled.div`
  display: flex;
  align-items: center;
  font-size: 1em;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const ExitButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  border: none;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  background-image: url('sky-2668711_1280.jpg');
  background-size: cover;
  background-position: center;
  color: white;
`;

const LoginForm = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 400px;

  h1 {
    margin-bottom: 20px;
    font-size: 1.2em;
    color: silver;
  }

  input {
    width: 65%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
  }

  button {
    width: 80%;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #111;
    color: white;
    margin-top: 10px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const LoadingMessage = styled.div`
  margin-top: 20px;
  font-size: 1.2em;
  color: #007bff;
`;

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserName(user.email.split('@')[0]);
        setEmail(user.email);
        fetchSessionData(user.email);
      } else {
        setIsAuthenticated(false);
        setUserName('');
        setEmail('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setLoadingMessage('Logging in...');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoadingMessage('');
    }
  };

  const fetchSessionData = async (email) => {
    try {
      const q = query(collection(db, 'applications'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        company: doc.data().Company,  // Updated to match Firestore field
        status: doc.data().Status,     // Updated to match Firestore field
        id: doc.data().id
      }));
      setSessionData(data);
    } catch (error) {
      console.error('Error fetching session data:', error);
      alert('Failed to fetch session data.');
    }
  };

  const handleLogout = async () => {
    setLoadingMessage('Signing out...');

    try {
      await signOut(auth);
    } catch (error) {
      alert('Logout failed.');
    } finally {
      setLoadingMessage('');
    }
  };

  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <LoginForm>
          <h1>Welcome to Heinweis's Student Dashboard! Please log in to access your request(s) status.</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {loadingMessage && <LoadingMessage>{loadingMessage}</LoadingMessage>}
        </LoginForm>
      </LoginContainer>
    );
  }

  return (
    <Container>
      <Sidebar>
        <div>
          <SidebarItem active>Student Dashboard</SidebarItem>
          </div>
        <SidebarItem>{userName}<br />Student</SidebarItem>
        <ExitButton onClick={handleLogout}>Exit</ExitButton>
      </Sidebar>

      <MainContent>
        <Header>
          <WelcomeMessage>
            Welcome {userName}!<br />
          </WelcomeMessage>
          <DateSelector>
            {selectedDate}
          </DateSelector>
        </Header>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Organization Enquired For</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </TableHead>
          <tbody>
            {sessionData.length > 0 ? sessionData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.company}</TableCell> {/* Company */}
                <TableCell>{data.status}</TableCell> {/* Status */}
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={2}>It seems like you haven't enquired about any organization. If you have, your status will be visible to you soon.</TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </MainContent>
    </Container>
  );
};

export default Dashboard;
