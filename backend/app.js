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
const ordenProduccionRepository = new OrdenProduccionRepository();
const transporteRepository = new TransporteRepository();
const tipoConcretoRepository = new TipoConcretoRepository();
const inventarioRepository = new InventarioRepository();
const equipoRepository = new EquipoRepository();

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
const ordenProduccionService = new OrdenProduccionService(ordenProduccionRepository);
const transporteService = new TransporteService(transporteRepository);
const tipoConcretoService = new TipoConcretoService(tipoConcretoRepository);
const inventarioService = new InventarioService(inventarioRepository);
const equipoService = new EquipoService(equipoRepository);

// Registro de servicios
serviceLocator.register('usuarioService', usuarioService);
serviceLocator.register('rolService', rolService);
serviceLocator.register('gestionUsuariosService', gestionUsuariosService);
serviceLocator.register('ventaService', ventaService);
serviceLocator.register('materialService', materialService);
serviceLocator.register('ordenCompraService', ordenCompraService);
serviceLocator.register('ordenProduccionService', ordenProduccionService);
serviceLocator.register('transporteService', transporteService);
serviceLocator.register('tipoConcretoService', tipoConcretoService);
serviceLocator.register('inventarioService', inventarioService);
serviceLocator.register('equipoService', equipoService);

// Inicialización de controladores
const usuarioController = new UsuarioController(usuarioService);
const gestionUsuariosController = new GestionUsuariosController(gestionUsuariosService);
const ventaController = new VentaController(ventaService);
const materialController = new MaterialController(materialService);
const ordenCompraController = new OrdenCompraController(ordenCompraService);
const ordenProduccionController = new OrdenProduccionController(ordenProduccionService);
const transporteController = new TransporteController(transporteService);
const tipoConcretoController = new TipoConcretoController(tipoConcretoService);
const inventarioController = new InventarioController(inventarioService);
const equipoController = new EquipoController(equipoService);

// Rutas de Usuarios
app.post('/api/usuarios/login', (req, res) => usuarioController.login(req, res));
app.post('/api/usuarios/recuperar-password', (req, res) => usuarioController.recuperarPassword(req, res));
app.get('/api/usuarios', (req, res) => usuarioController.listarUsuarios(req, res));
app.get('/api/usuarios/:id', (req, res) => usuarioController.obtenerUsuario(req, res));
app.post('/api/usuarios', (req, res) => usuarioController.crearUsuario(req, res));
app.put('/api/usuarios/:id', (req, res) => usuarioController.actualizarUsuario(req, res));
app.delete('/api/usuarios/:id', (req, res) => usuarioController.eliminarUsuario(req, res));

// Rutas de Gestión de Usuarios
app.post('/api/gestion/clientes', (req, res) => gestionUsuariosController.registrarCliente(req, res));
app.put('/api/gestion/clientes/:id', (req, res) => gestionUsuariosController.actualizarCliente(req, res));
app.delete('/api/gestion/clientes/:id', (req, res) => gestionUsuariosController.eliminarCliente(req, res));
app.get('/api/gestion/clientes', (req, res) => gestionUsuariosController.listarClientes(req, res));

app.post('/api/gestion/proveedores', (req, res) => gestionUsuariosController.registrarProveedor(req, res));
app.put('/api/gestion/proveedores/:id', (req, res) => gestionUsuariosController.actualizarProveedor(req, res));
app.delete('/api/gestion/proveedores/:id', (req, res) => gestionUsuariosController.eliminarProveedor(req, res));
app.get('/api/gestion/proveedores', (req, res) => gestionUsuariosController.listarProveedores(req, res));

app.post('/api/gestion/empleados', (req, res) => gestionUsuariosController.registrarEmpleado(req, res));
app.put('/api/gestion/empleados/:id', (req, res) => gestionUsuariosController.actualizarEmpleado(req, res));
app.delete('/api/gestion/empleados/:id', (req, res) => gestionUsuariosController.eliminarEmpleado(req, res));
app.get('/api/gestion/empleados', (req, res) => gestionUsuariosController.listarEmpleados(req, res));

// Rutas de Materiales
app.get('/api/materiales', (req, res) => materialController.listarMateriales(req, res));
app.get('/api/materiales/:id', (req, res) => materialController.obtenerMaterial(req, res));
app.post('/api/materiales', (req, res) => materialController.crearMaterial(req, res));
app.put('/api/materiales/:id', (req, res) => materialController.actualizarMaterial(req, res));
app.delete('/api/materiales/:id', (req, res) => materialController.eliminarMaterial(req, res));
app.put('/api/materiales/stock', (req, res) => materialController.actualizarStock(req, res));
app.post('/api/materiales/abastecimiento', (req, res) => materialController.solicitarAbastecimiento(req, res));

// Rutas de Ventas
app.get('/api/ventas', (req, res) => ventaController.listarVentas(req, res));
app.get('/api/ventas/:id', (req, res) => ventaController.obtenerVenta(req, res));
app.post('/api/ventas', (req, res) => ventaController.crearVenta(req, res));
app.put('/api/ventas/:id', (req, res) => ventaController.actualizarVenta(req, res));
app.delete('/api/ventas/:id', (req, res) => ventaController.eliminarVenta(req, res));
app.put('/api/ventas/transporte', (req, res) => ventaController.asignarTransporte(req, res));

// Rutas de Órdenes de Compra
app.get('/api/ordenes-compra', (req, res) => ordenCompraController.listarOrdenes(req, res));
app.get('/api/ordenes-compra/:id', (req, res) => ordenCompraController.obtenerOrden(req, res));
app.post('/api/ordenes-compra', (req, res) => ordenCompraController.crearOrdenCompra(req, res));
app.put('/api/ordenes-compra/:id', (req, res) => ordenCompraController.actualizarOrden(req, res));
app.delete('/api/ordenes-compra/:id', (req, res) => ordenCompraController.eliminarOrden(req, res));
app.put('/api/ordenes-compra/:ordenId/confirmar', (req, res) => ordenCompraController.confirmarRecepcion(req, res));
app.post('/api/ordenes-compra/devolucion', (req, res) => ordenCompraController.registrarDevolucion(req, res));

// Rutas de Órdenes de Producción
app.get('/api/ordenes-produccion', (req, res) => ordenProduccionController.listarOrdenes(req, res));
app.get('/api/ordenes-produccion/:id', (req, res) => ordenProduccionController.obtenerOrden(req, res));
app.post('/api/ordenes-produccion', (req, res) => ordenProduccionController.crearOrden(req, res));
app.put('/api/ordenes-produccion/:id', (req, res) => ordenProduccionController.actualizarOrden(req, res));
app.delete('/api/ordenes-produccion/:id', (req, res) => ordenProduccionController.eliminarOrden(req, res));
app.put('/api/ordenes-produccion/:id/iniciar', (req, res) => ordenProduccionController.iniciarProduccion(req, res));
app.put('/api/ordenes-produccion/:id/completar', (req, res) => ordenProduccionController.completarProduccion(req, res));

// Rutas de Transporte
app.get('/api/transporte', (req, res) => transporteController.listarTransportes(req, res));
app.get('/api/transporte/:id', (req, res) => transporteController.obtenerTransporte(req, res));
app.post('/api/transporte', (req, res) => transporteController.crearTransporte(req, res));
app.put('/api/transporte/:id', (req, res) => transporteController.actualizarTransporte(req, res));
app.delete('/api/transporte/:id', (req, res) => transporteController.eliminarTransporte(req, res));
app.put('/api/transporte/:id/asignar', (req, res) => transporteController.asignarConductor(req, res));
app.put('/api/transporte/:id/estado', (req, res) => transporteController.actualizarEstado(req, res));

// Rutas de Tipos de Concreto
app.get('/api/tipos-concreto', (req, res) => tipoConcretoController.listarTipos(req, res));
app.get('/api/tipos-concreto/:id', (req, res) => tipoConcretoController.obtenerTipo(req, res));
app.post('/api/tipos-concreto', (req, res) => tipoConcretoController.crearTipo(req, res));
app.put('/api/tipos-concreto/:id', (req, res) => tipoConcretoController.actualizarTipo(req, res));
app.delete('/api/tipos-concreto/:id', (req, res) => tipoConcretoController.eliminarTipo(req, res));

// Rutas de Inventario
app.get('/api/inventario', (req, res) => inventarioController.listarInventario(req, res));
app.get('/api/inventario/:id', (req, res) => inventarioController.obtenerItem(req, res));
app.post('/api/inventario', (req, res) => inventarioController.agregarItem(req, res));
app.put('/api/inventario/:id', (req, res) => inventarioController.actualizarItem(req, res));
app.delete('/api/inventario/:id', (req, res) => inventarioController.eliminarItem(req, res));
app.put('/api/inventario/:id/ajuste', (req, res) => inventarioController.ajustarStock(req, res));

// Rutas de Equipos
app.get('/api/equipos', (req, res) => equipoController.listarEquipos(req, res));
app.get('/api/equipos/:id', (req, res) => equipoController.obtenerEquipo(req, res));
app.post('/api/equipos', (req, res) => equipoController.crearEquipo(req, res));
app.put('/api/equipos/:id', (req, res) => equipoController.actualizarEquipo(req, res));
app.delete('/api/equipos/:id', (req, res) => equipoController.eliminarEquipo(req, res));
app.put('/api/equipos/:id/mantenimiento', (req, res) => equipoController.registrarMantenimiento(req, res));
app.put('/api/equipos/:id/estado', (req, res) => equipoController.actualizarEstado(req, res));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});