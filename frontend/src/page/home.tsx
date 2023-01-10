import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AuthService from "../service/authService";
import { useNavigate } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface UserInterface {
  name: string,
  lastName: string,
  email: string,
  createdAt: string
}


export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInterface>({ name: '', lastName: '', email: '', createdAt: ''});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { withCredentials: true });

        setUser(response.data.data);
      } catch (e) {
        navigate(`/login`);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const result = await AuthService.logout();
    if (result.success) navigate(`/login`);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {user.name}
            </Typography>
            <Button  onClick={(e) => handleLogout(e)} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name: {user.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Last name: {user.lastName}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            E-mail: {user.email}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Created At: {user.createdAt}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}