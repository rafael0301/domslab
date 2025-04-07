class MaterialRepository extends BaseRepository {
    constructor() {
        super(Material);
    }

    async findByProveedor(proveedorId) {
        return this.items.filter(material => material.proveedorId === proveedorId);
    }

    async findByBajoStock(umbral) {
        return this.items.filter(material => material.stock < umbral);
    }
}