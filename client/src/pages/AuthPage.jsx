import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/context';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useQueryBuilder from '../hooks/queryBuilder.hook';
import { useFormData } from '../hooks/formData.hook';
import Navbar from '../components/Navbar';
import { CssBaseline, Paper } from '@mui/material';

export default function SignIn() {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { request, loading, error, clearError } = useHttp();
  const { QueryProvider } = useQueryBuilder();
  const { FormProvider } = useFormData();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      const data = await request('/api/auth/login', 'POST', {
        email: form.get('email'),
        password: form.get('password'),
      });
      auth.login(data.token, data.userId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <QueryProvider>
      <Navbar displaySearch={false} />
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <FormProvider>
          <Paper sx={{ minHeight: 'calc(100vh - 5rem)', mt: '4.5rem' }}>
            <Box
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                px: 4,
                py: 6,
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography component="h1" variant="h5">
                Вхід до акаунта адміна
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email адреса"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  disabled={loading}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  disabled={loading}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2 }}>
                  Увійти
                </Button>
              </Box>
            </Box>
          </Paper>
        </FormProvider>
      </Container>
    </QueryProvider>
  );
}
