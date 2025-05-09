import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CompaniesPage from './pages/CompaniesPage';
import CreateCompanyPage from './pages/CreateCompanyPage';
import InventoryPage from './pages/InventoryPage';
import CreateInventoryPage from './pages/CreateInventoryPage';
import ProductsPage from './pages/ProductsPage';
import CreateProductPage from './pages/CreateProductPage';
import EditCompanyPage from './pages/EditCompanyPage';
import EditInventoryPage from './pages/EditInventoryPage';
import EditProductPage from './pages/EditProductPage';
import { getAuth } from './services/auth.service';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00e1ff' },
    secondary: { main: '#ff00c8' },
    background: {
      default: '#181a20',
      paper: '#23272f',
    },
    text: {
      primary: '#fff',
      secondary: '#b2b8c6',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    h3: { fontWeight: 700, letterSpacing: 2 },
    h5: { fontWeight: 600, letterSpacing: 1 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function RequireAdmin({ children }: { children: JSX.Element }) {
  const auth = getAuth();
  const location = useLocation();
  if (!auth || auth.role !== 'admin') {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/create" element={
            <RequireAdmin>
              <CreateCompanyPage />
            </RequireAdmin>
          } />
          <Route path="/companies/edit/:id" element={
            <RequireAdmin>
              <EditCompanyPage />
            </RequireAdmin>
          } />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/create" element={
            <RequireAdmin>
              <CreateInventoryPage />
            </RequireAdmin>
          } />
          <Route path="/inventory/edit/:id" element={
            <RequireAdmin>
              <EditInventoryPage />
            </RequireAdmin>
          } />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/create" element={
            <RequireAdmin>
              <CreateProductPage />
            </RequireAdmin>
          } />
          <Route path="/products/edit/:id" element={
            <RequireAdmin>
              <EditProductPage />
            </RequireAdmin>
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;