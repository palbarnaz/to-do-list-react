import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Box, Container, Paper } from '@mui/material';
import React from 'react';

import Form from '../components/Form';
import HeaderForm from '../components/HeaderForm';

const SignIn: React.FC = () => {
    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Paper elevation={16}>
                <Box component="section" marginY={4} marginX={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <HeaderForm title="Entrar no sistema" color="#ab47bc" icon={<HowToRegIcon fontSize="large" />} />
                    <Form textButton="Entrar" mode="signin" />
                </Box>
            </Paper>
        </Container>
    );
};

export default SignIn;
