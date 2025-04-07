class VentaService {
    constructor(ventaRepository, facturaRepository) {
        this.ventaRepository = ventaRepository;
        this.facturaRepository = facturaRepository;
    }

    async crearVenta(ventaData) {
        const venta = await this.ventaRepository.create(ventaData);

        // Generar factura automáticamente
        const factura = venta.generarFactura();
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