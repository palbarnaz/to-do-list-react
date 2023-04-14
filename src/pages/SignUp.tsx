import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Container, Paper } from '@mui/material';

import Form from '../components/Form';
import HeaderForm from '../components/HeaderForm';

const SignUp: React.FC = () => {
    return (
        <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Paper elevation={16}>
                <Box component="section" marginY={4} marginX={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                    <HeaderForm title="Cadastrar" color="#ab47bc" icon={<AccountCircleIcon fontSize="large" />} />
                    <Form textButton="Criar Conta" mode="signup" />
                </Box>
            </Paper>
        </Container>
    );
};

export default SignUp;
