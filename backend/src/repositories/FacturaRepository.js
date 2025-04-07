class FacturaRepository extends BaseRepository {
    constructor() {
        super(Factura);
    }

    async findByCliente(clienteId) {
        return this.items.filter(factura => factura.clienteId === clienteId);
    }

    async findPendientesPago() {
        return this.items.filter(factura => factura.estado === "Pendiente");
    }
}
