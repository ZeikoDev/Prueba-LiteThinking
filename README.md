# Prueba Tecnica LiteThinking

## Tecnologías principales

- **Backend:** Django + Django REST Framework + PostgreSQL
- **Frontend:** React 18 + Vite + MUI 5 + Emotion 11 + React Router 6
- **Autenticación:** JWT
- **Diseño:** Atomic Design, dark mode, responsive
- **Recomendación IA:** Integración con OpenAI ChatGPT (API)

## Características

- Gestión de usuarios, empresas, productos e inventario
- Roles: admin y external
- CRUD completo para empresas, productos e inventario
- Protección de rutas y visibilidad según rol
- Formularios y tablas modernos, centrados y responsivos
- Recomendación de productos con IA (ChatGPT)
- Modal de recomendación que pregunta por el giro de la empresa y sugiere productos dropshipping

## Requisitos previos

- Python 3.10+
- Node.js 18+
- PostgreSQL
- (Opcional) Cuenta y API Key de OpenAI para recomendación IA

## Instalación y ejecución

### 1. Clona el repositorio

```bash
git clone <repo-url>
cd Testlitethinking
```

### 2. Backend (Django)

#### a) Instala dependencias

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### b) Configura la base de datos y variables de entorno

Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```
DJANGO_SECRET_KEY=tu_clave_secreta
DB_NAME=testlitethinking
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
# Para recomendación IA:
OPENAI_API_KEY=sk-...tu_api_key...
```

#### c) Aplica migraciones y crea superusuario

```bash
python manage.py migrate
python manage.py createsuperuser
```

#### d) Ejecuta el backend

```bash
python manage.py runserver
```

El backend estará disponible en [http://localhost:8000](http://localhost:8000)

### 3. Frontend (React)

#### a) Instala dependencias

```bash
cd ../frontend
npm install
```

#### b) Ejecuta el frontend

```bash
npm run dev
```

El frontend estará disponible en [http://localhost:5173](http://localhost:5173)

## Funcionalidad de recomendación IA

- En la vista de productos, haz clic en "Recomendación de producto tendencia con IA".
- Se abrirá un modal preguntando "¿De qué es tu empresa?". Ingresa una breve descripción.
- Al confirmar, el frontend envía la descripción al backend.
- El backend consulta la API de OpenAI (ChatGPT) y responde con 3-5 productos dropshipping recomendados para tu nicho, explicando por qué son buena opción y sugiriendo keywords para investigar.
- La respuesta se muestra en un modal con botón "Cerrar".
- Si no tienes API Key, se mostrará un error informativo.

## Notas

- El frontend consume la API en `http://localhost:8000` (ajusta si usas otro puerto).
- La funcionalidad de recomendación IA requiere una API Key válida de OpenAI.
- El código está limpio de comentarios y logs de depuración.

## Licencia

MIT
