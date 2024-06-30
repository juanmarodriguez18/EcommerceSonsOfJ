// LoginButton.tsx

import { useState } from 'react';
import { Button } from '@mui/material';
import LoginCliente from '../ControlAcceso/LoginCliente';


const LoginButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="text"
                color="primary"
                onClick={handleOpen}
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
                Log In
            </Button>
            <LoginCliente open={open} onClose={handleClose} />
        </div>
    );
};

export default LoginButton;
