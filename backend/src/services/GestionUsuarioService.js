const UsuarioFactory = require('../factories/UsuarioFactory');

class GestionUsuariosService {
    constructor(usuarioService, personaRepository, clienteRepository, proveedorRepository, empleadoRepository) {
        this.usuarioService = usuarioService;
        this.personaRepository = personaRepository;
        this.clienteRepository = clienteRepository;
        this.proveedorRepository = proveedorRepository;
        this.empleadoRepository = empleadoRepository;
    }

    async registrarCliente(clienteData, usuarioData) {
        const cliente = UsuarioFactory.crearUsuario('CLIENTE', clienteData);
        await this.clienteRepository.create(cliente);

        usuarioData.rolId = 2;
        const usuario = await this.usuarioService.crearUsuario(usuarioData);
        return { cliente, usuario };
    }

    async registrarProveedor(proveedorData, usuarioData) {
        const proveedor = UsuarioFactory.crearUsuario('PROVEEDOR', proveedorData);
        await this.proveedorRepository.create(proveedor);

        usuarioData.rolId = 3;
        const usuario = await this.usuarioService.crearUsuario(usuarioData);
        return { proveedor, usuario };
    }

    async registrarEmpleado(empleadoData, usuarioData) {
        const empleado = UsuarioFactory.crearUsuario('EMPLEADO', empleadoData);
        await this.empleadoRepository.create(empleado);

        usuarioData.rolId = 4;
        const usuario = await this.usuarioService.crearUsuario(usuarioData);
        return { empleado, usuario };
    }
}

module.exports = GestionUsuariosService;