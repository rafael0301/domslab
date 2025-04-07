class GestionUsuariosController {
    constructor(gestionUsuariosService) {
        this.gestionUsuariosService = gestionUsuariosService;
    }

    // Express handler para registrar cliente
    async registrarCliente(req, res) {
        const { clienteData, usuarioData } = req.body;
        try {
            const result = await this.gestionUsuariosService.registrarCliente(clienteData, usuarioData);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Express handler para registrar proveedor
    async registrarProveedor(req, res) {
        const { proveedorData, usuarioData } = req.body;
        try {
            const result = await this.gestionUsuariosService.registrarProveedor(proveedorData, usuarioData);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Express handler para registrar empleado
    async registrarEmpleado(req, res) {
        const { empleadoData, usuarioData } = req.body;
        try {
            const result = await this.gestionUsuariosService.registrarEmpleado(empleadoData, usuarioData);
            res.status(201).json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
