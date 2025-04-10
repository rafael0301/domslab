const DocumentoFactory = require('../factories/DocumentoFactory');

class VentaService {
    constructor(ventaRepository, facturaRepository) {
        this.ventaRepository = ventaRepository;
        this.facturaRepository = facturaRepository;
    }

    async crearVenta(ventaData) {
        const venta = await this.ventaRepository.create(ventaData);

        const facturaData = {
            id: Date.now(),
            ventaId: venta.id,
            clienteId: venta.clienteId,
            total: venta.volumen * venta.obtenerPrecioUnitario(),
            fechaEmision: new Date(),
            estado: "Pendiente"
        };

        const factura = DocumentoFactory.crearDocumento('FACTURA_VENTA', facturaData);
        await this.facturaRepository.create(factura);

        return venta;
    }

    async asignarTransporte(ventaId, transporteId) {
        const venta = await this.ventaRepository.findById(ventaId);
        if (venta) {
            venta.asignarTransporte(transporteId);
            return this.ventaRepository.update(ventaId, venta);
        }
        return null;
    }
}