const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Inicialización de repositorios
const usuarioRepository = new UsuarioRepository();
const rolRepository = new RolRepository();
const permisoRepository = new PermisoRepository();
const personaRepository = new PersonaRepository();
const clienteRepository = new ClienteRepository();
const proveedorRepository = new ProveedorRepository();
const empleadoRepository = new EmpleadoRepository();
const ventaRepository = new VentaRepository();
const materialRepository = new MaterialRepository();
const ordenCompraRepository = new OrdenCompraRepository();
const facturaRepository = new FacturaRepository();
const devolucionRepository = new DevolucionRepository();


// Inicialización de servicios
const serviceLocator = ServiceLocator.getInstance();
const usuarioService = new UsuarioService(usuarioRepository, rolRepository);
const rolService = new RolService(rolRepository, permisoRepository);
const ventaService = new VentaService(ventaRepository, facturaRepository);
const materialService = new MaterialService(materialRepository);
const ordenCompraService = new OrdenCompraService(ordenCompraRepository, materialService, devolucionRepository);
const gestionUsuariosService = new GestionUsuariosService(
    usuarioService,
    personaRepository,
    clienteRepository,
    proveedorRepository,
    empleadoRepository
);

serviceLocator.register('usuarioService', usuarioService);
serviceLocator.register('rolService', rolService);
serviceLocator.register('gestionUsuariosService', gestionUsuariosService);
serviceLocator.register('ventaService', ventaService);
serviceLocator.register('materialService', materialService);
serviceLocator.register('ordenCompraService', ordenCompraService);

// Inicialización de controladores
const usuarioController = new UsuarioController(usuarioService);
const gestionUsuariosController = new GestionUsuariosController(gestionUsuariosService);
const ventaController = new VentaController(ventaService);
const materialController = new MaterialController(materialService);
const ordenCompraController = new OrdenCompraController(ordenCompraService);

// Rutas de Usuarios
app.post('/api/usuarios/login', (req, res) => usuarioController.login(req, res));
app.post('/api/usuarios/recuperar-password', (req, res) => usuarioController.recuperarPassword(req, res));

// Rutas de Gestión de Usuarios
app.post('/api/gestion/clientes', (req, res) => gestionUsuariosController.registrarCliente(req, res));
app.post('/api/gestion/proveedores', (req, res) => gestionUsuariosController.registrarProveedor(req, res));
app.post('/api/gestion/empleados', (req, res) => gestionUsuariosController.registrarEmpleado(req, res));

app.put('/api/materiales/stock', (req, res) => materialController.actualizarStock(req, res));
app.post('/api/materiales/abastecimiento', (req, res) => materialController.solicitarAbastecimiento(req, res));

app.post('/api/ventas', (req, res) => ventaController.crearVenta(req, res));
app.put('/api/ventas/transporte', (req, res) => ventaController.asignarTransporte(req, res));

app.post('/api/ordenes-compra', (req, res) => ordenCompraController.crearOrdenCompra(req, res));
app.put('/api/ordenes-compra/:ordenId/confirmar', (req, res) => ordenCompraController.confirmarRecepcion(req, res));
app.post('/api/ordenes-compra/devolucion', (req, res) => ordenCompraController.registrarDevolucion(req, res));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});