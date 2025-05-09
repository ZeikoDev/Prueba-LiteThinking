import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getCompanies, deleteCompany, type Company } from '../services/companies.service';
import { getAuth } from '../services/auth.service';

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const userRole = auth?.role;

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      setError('Error al cargar las empresas');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDeleteClick = (company: Company) => {
    setCompanyToDelete(company);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete) return;
    
    setLoading(true);
    try {
      await deleteCompany(companyToDelete.id);
      await fetchCompanies();
      setDeleteDialogOpen(false);
      setCompanyToDelete(null);
    } catch (err) {
      setError('Error al eliminar la empresa');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        position: 'relative',
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{
          position: 'absolute',
          top: 24,
          left: 24,
          fontWeight: 600,
          borderRadius: 2,
          bgcolor: 'background.paper',
          color: 'primary.main',
          boxShadow: '0 2px 8px 0 #00e1ff22',
          zIndex: 10,
        }}
      >
        Volver al Dashboard
      </Button>
      <Box sx={{ width: '100%', maxWidth: 900, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            color="primary.main"
            fontWeight={700}
            letterSpacing={1}
          >
            Empresas
          </Typography>
          {userRole === 'admin' && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/companies/create')}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                px: 3,
                py: 1,
                boxShadow: '0 0 16px 0 #00e1ff55',
              }}
            >
              Crear Empresa
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper} sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>NIT</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Dirección</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Teléfono</TableCell>
                {userRole === 'admin' && (
                  <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.nit}</TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.address}</TableCell>
                  <TableCell>{company.phone}</TableCell>
                  {userRole === 'admin' && (
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/companies/edit/${company.id}`)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(company)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {userRole === 'admin' && (
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              bgcolor: 'background.paper',
              borderRadius: 2,
            }
          }}
        >
          <DialogTitle sx={{ color: 'primary.main', fontWeight: 600 }}>
            Confirmar Eliminación
          </DialogTitle>
          <DialogContent>
            <Typography>
              ¿Está seguro que desea eliminar la empresa "{companyToDelete?.name}"?
              Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              sx={{ fontWeight: 600 }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
              disabled={loading}
              sx={{ fontWeight: 600 }}
            >
              {loading ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CompaniesPage; 