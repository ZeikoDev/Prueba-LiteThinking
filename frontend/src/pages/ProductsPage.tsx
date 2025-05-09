import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import { getProducts } from '../services/products.service';
import type { Product } from '../services/products.service';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';
import { getCompanies, type Company } from '../services/companies.service';
import { getAuth } from '../services/auth.service';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deleteProduct } from '../services/products.service';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const userRole = auth?.role;
  const [recommendationOpen, setRecommendationOpen] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [recommendationError, setRecommendationError] = useState('');
  const [askCompanyOpen, setAskCompanyOpen] = useState(false);
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyDescriptionError, setCompanyDescriptionError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [productsData, companiesData] = await Promise.all([
        getProducts(),
        getCompanies()
      ]);
      setProducts(productsData);
      setCompanies(companiesData);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setLoading(true);
    try {
      await deleteProduct(productToDelete.id);
      await fetchProducts();
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (err) {
      setError('Error al eliminar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = () => {
    setCompanyDescription('');
    setCompanyDescriptionError('');
    setRecommendation('');
    setRecommendationError('');
    setAskCompanyOpen(true);
  };

  const handleAskCompanyConfirm = async () => {
    if (!companyDescription.trim()) {
      setCompanyDescriptionError('Por favor describe brevemente de qué es tu empresa.');
      return;
    }
    setAskCompanyOpen(false);
    setRecommendationOpen(true);
    setRecommendation('');
    setRecommendationError('');
    try {
      const response = await axios.get('http://localhost:8000/api/products/recommendation/', {
        headers: {
          Authorization: auth ? `Bearer ${auth.access}` : '',
        },
        params: { description: companyDescription }
      });
      setRecommendation(response.data.recommendation);
    } catch (err: any) {
      setRecommendationError(
        err?.response?.data?.error ||
        (err?.response?.data && JSON.stringify(err.response.data)) ||
        err.message ||
        'No se pudo obtener la recomendación.'
      );
    }
  };

  const getCompanyName = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Empresa no encontrada';
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', px: 2, py: 6, position: 'relative' }}>
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
      <Box sx={{ width: '100%', maxWidth: 1200, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h5" color="primary.main" fontWeight={600} letterSpacing={1}>
            Productos registrados
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<InfoOutlinedIcon />}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              borderWidth: 2,
              borderColor: 'secondary.main',
              ml: 2,
            }}
            onClick={handleRecommendationClick}
          >
            Recomendación de producto tendencia con IA
          </Button>
        </Box>
        {userRole === 'admin' && (
          <Button variant="contained" color="primary" sx={{ mb: 3, fontWeight: 700, borderRadius: 2, py: 1.2, fontSize: '1.1rem', letterSpacing: 1 }} onClick={() => navigate('/products/create')}>
            Crear nuevo producto
          </Button>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        )}
        <TableContainer component={Paper} sx={{ bgcolor: 'background.paper' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Código</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Nombre</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Características</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Precio USD</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Precio EUR</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Precio COP</TableCell>
                  <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Empresa</TableCell>
                  {userRole === 'admin' && <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>Acciones</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.characteristics}</TableCell>
                    <TableCell>${product.price_usd}</TableCell>
                    <TableCell>€{product.price_eur}</TableCell>
                    <TableCell>${product.price_cop}</TableCell>
                    <TableCell>{getCompanyName(product.company)}</TableCell>
                    {userRole === 'admin' && (
                      <TableCell>
                        <Button size="small" color="primary" onClick={() => navigate(`/products/edit/${product.id}`)} sx={{ minWidth: 0, mr: 1 }}>
                          <EditIcon />
                        </Button>
                        <Button size="small" color="error" onClick={() => handleDeleteClick(product)} sx={{ minWidth: 0 }}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
      {userRole === 'admin' && (
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{ sx: { bgcolor: 'background.paper', borderRadius: 2 } }}
        >
          <DialogTitle sx={{ color: 'primary.main', fontWeight: 600 }}>
            Confirmar Eliminación
          </DialogTitle>
          <DialogContent>
            <Typography>
              ¿Está seguro que desea eliminar el producto "{productToDelete?.name}"?
              Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={() => setDeleteDialogOpen(false)} sx={{ fontWeight: 600 }}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={loading} sx={{ fontWeight: 600 }}>
              {loading ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog open={askCompanyOpen} onClose={() => setAskCompanyOpen(false)}>
        <DialogTitle>¿De qué es tu empresa?</DialogTitle>
        <DialogContent>
          <TextField
            label="Describe brevemente a qué se dedica tu empresa"
            value={companyDescription}
            onChange={e => {
              setCompanyDescription(e.target.value);
              setCompanyDescriptionError('');
            }}
            fullWidth
            multiline
            minRows={2}
            sx={{ mt: 1 }}
            error={!!companyDescriptionError}
            helperText={companyDescriptionError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAskCompanyOpen(false)} color="secondary">Cancelar</Button>
          <Button onClick={handleAskCompanyConfirm} color="primary" variant="contained">Solicitar recomendación</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={recommendationOpen} onClose={() => setRecommendationOpen(false)}>
        <DialogTitle>Recomendación IA</DialogTitle>
        <DialogContent>
          {recommendationError ? (
            <Alert severity="error">{recommendationError}</Alert>
          ) : (
            <Typography sx={{ whiteSpace: 'pre-line' }}>{recommendation || 'Cargando recomendación...'}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRecommendationOpen(false)} color="primary" variant="contained">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsPage; 