class GestionUsuariosService {
    constructor(usuarioService, personaRepository, clienteRepository, proveedorRepository, empleadoRepository) {
        this.usuarioService = usuarioService;
        this.personaRepository = personaRepository;
        this.clienteRepository = clienteRepository;
        this.proveedorRepository = proveedorRepository;
        this.empleadoRepository = empleadoRepository;
    }

    async registrarCliente(clienteData, usuarioData) {
        const cliente = await this.clienteRepository.create(clienteData);
        usuarioData.rolId = 2; // Asumiendo que 2 es el ID para el rol "Cliente"
        const usuario = await this.usuarioService.crearUsuario(usuarioData);
        return { cliente, usuario };
    }

    async registrarProveedor(proveedorData, usuarioData) {
        const proveedor = await this.proveedorRepository.create(proveedorData);
        usuarioData.rolId = 3; // Asumiendo que 3 es el ID para el rol "Proveedor"
        const usuario = await this.usuarioService.crearUsuario(usuarioData);
        return { proveedor, usuario };
    }

    async registrarEmpleado(empleadoData, usuarioData) {
        const empleado = await this.empleadoRepository.create(empleadoData);
        usuarioData.rolId = 4; // Asumiendo que 4 es el ID para el rol "Empleado"
        const usuario = await this.usuarioService.crearUsuario(usuarioData);
        return { empleado, usuario };
    }
}