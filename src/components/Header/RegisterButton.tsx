import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const RegisterButton = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
      navigate('/registerCliente');
    };
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleRegister}
      sx={{
        px: 2,
        py: 1,
        fontSize: '0.875rem',
        fontWeight: 'bold',
        textAlign: 'center',
        transition: 'background-color 0.1s ease-in-out',
      }}
    >
      Sign up
    </Button>
  );
};

export default RegisterButton;
