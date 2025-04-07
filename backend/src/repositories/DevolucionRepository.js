class DevolucionRepository extends BaseRepository {
    constructor() {
        super(Devolucion);
    }

    async findByOrdenCompra(ordenCompraId) {
        return this.items.filter(devolucion => devolucion.ordenCompraId === ordenCompraId);
    }
}