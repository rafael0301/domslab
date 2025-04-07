class OrdenCompraRepository extends BaseRepository {
    constructor() {
        super(OrdenCompra);
    }

    async findByProveedor(proveedorId) {
        return this.items.filter(orden => orden.proveedorId === proveedorId);
    }

    async findPendientes() {
        return this.items.filter(orden => orden.estado === "Pendiente");
    }
}