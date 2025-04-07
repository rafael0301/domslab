class VentaRepository extends BaseRepository {
    constructor() {
        super(Venta);
    }

    async findByClienteId(clienteId) {
        return this.items.filter(venta => venta.clienteId === clienteId);
    }
}