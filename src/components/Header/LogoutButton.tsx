import Button from '@mui/material/Button';
import { useAuth } from '../ControlAcceso/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
};

  return (
    <Button
      variant="text"
      color="primary"
      onClick={() =>
        handleLogout()
      }
      sx={{
        px: 2,
        py: 1,
        fontSize: '0.875rem',
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gray',
        transition: 'color 0.1s ease-in-out',
        '&:hover': {
          color: 'indigo',
        },
        '&:focus-visible': {
          outline: 'none',
          ring: '2px solid indigo',
        },
        '&:active': {
          color: 'indigo',
        },
      }}
    >
      Salir
    </Button>
  );
};

export default LogoutButton;
