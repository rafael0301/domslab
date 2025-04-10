class OrdenCompraService {
    constructor(ordenCompraRepository, materialService, devolucionRepository) {
        this.ordenCompraRepository = ordenCompraRepository;
        this.materialService = materialService;
        this.devolucionRepository = devolucionRepository;
    }

    async crearOrdenCompra(ordenData) {
        return this.ordenCompraRepository.create(ordenData);
    }

    async confirmarRecepcion(ordenId) {
        const orden = await this.ordenCompraRepository.findById(ordenId);
        if (orden) {
            orden.confirmarRecepcion();
            return this.ordenCompraRepository.update(ordenId, orden);
        }
        return null;
    }

    async registrarDevolucion(ordenId, materialId, cantidad, motivo) {
        const orden = await this.ordenCompraRepository.findById(ordenId);
        if (orden) {
            try {
                const devolucion = orden.registrarDevolucion(materialId, cantidad, motivo);
                await this.devolucionRepository.create(devolucion);
                await this.ordenCompraRepository.update(ordenId, orden);
                return devolucion;
            } catch (error) {
                throw new Error(`Error al registrar devolución: ${error.message}`);
            }
        }
        return null;
    }
}
