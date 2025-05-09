import { Box, Typography, Grid, Paper, Avatar, Stack, Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import { getAuth } from '../services/auth.service';

const DashboardPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const userRole = auth?.role;
  const username = auth?.username || 'Usuario';
  const role = userRole === 'admin' ? 'Administrador' : userRole === 'external' ? 'Externo' : 'Desconocido';
  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      px: { xs: 2, md: 8 },
      py: 6,
      width: '100%',
    }}>
      {/* User Info Section */}
      <Stack direction="row" spacing={2} mb={6} alignItems="center">
        <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main', fontSize: 24 }}>
          {username.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={500} color="primary.main">
            {username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rol: {role}
          </Typography>
        </Box>
      </Stack>

      <Typography variant="h3" fontWeight={700} mb={2} color="primary.main" letterSpacing={2}>
        Bienvenido a Zeiko app
      </Typography>
      <Grid container spacing={4}>
        {userRole === 'admin' && (
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, bgcolor: 'grey.900', color: 'white' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <AccountBalanceWalletIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={600} letterSpacing={1}>
                Productos
              </Typography>
              <Typography variant="body1" color="grey.300">
                Gestiona y visualiza todos los productos registrados.
              </Typography>
              <Button variant="outlined" color="primary" sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }} onClick={() => navigate('/products')}>
                Ver productos
              </Button>
            </Paper>
          </Grid>
        )}
        {userRole === 'admin' && (
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, bgcolor: 'grey.900', color: 'white' }}>
              <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                <Inventory2Icon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={600} letterSpacing={1}>
                Inventario
              </Typography>
              <Typography variant="body1" color="grey.300">
                Consulta el stock y movimientos de inventario.
              </Typography>
              <Button variant="outlined" color="secondary" sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }} onClick={() => navigate('/inventory')}>
                Ver inventario
              </Button>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} md={userRole === 'admin' ? 4 : 12}>
          <Paper elevation={4} sx={{ p: 4, borderRadius: 4, minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, bgcolor: 'grey.900', color: 'white' }}>
            <Avatar sx={{ bgcolor: 'info.main', width: 56, height: 56 }}>
              <BusinessIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" fontWeight={600} letterSpacing={1}>
              Empresas
            </Typography>
            <Typography variant="body1" color="grey.300">
              {userRole === 'admin'
                ? 'Administra la información de tus empresas asociadas.'
                : 'Mira las empresas asociadas.'}
            </Typography>
            <Button variant="outlined" color="info" sx={{ mt: 2, borderRadius: 2, fontWeight: 600 }} onClick={() => navigate('/companies')}>
              Ver empresas
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
