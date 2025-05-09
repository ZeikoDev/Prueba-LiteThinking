import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login, saveAuth } from '../services/auth.service';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(username, password);
      saveAuth(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 4,
          maxWidth: 400,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: '0 8px 32px 0 rgba(0,225,255,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          color="primary.main"
          fontWeight={700}
          letterSpacing={2}
          mb={2}
        >
          Zeiko app
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          mb={4}
        >
          Accede a tu panel seguro
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
          <TextField
            label="Usuario"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            fullWidth
            required
            autoFocus
            sx={{ input: { color: 'white' } }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            fullWidth
            required
            sx={{ input: { color: 'white' } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              mt: 2,
              fontWeight: 700,
              borderRadius: 2,
              py: 1.5,
              fontSize: '1.1rem',
              letterSpacing: 1,
              boxShadow: '0 0 16px 0 #00e1ff55',
            }}
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
