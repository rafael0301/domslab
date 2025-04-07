class Material {
    constructor(id, nombre, descripcion, unidadMedida, proveedorId, stock, precioUnitario, ubicacionAlmacen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidadMedida = unidadMedida;
        this.proveedorId = proveedorId;
        this.stock = stock;
        this.precioUnitario = precioUnitario;
        this.ubicacionAlmacen = ubicacionAlmacen;
    }

    actualizarStock(cantidad) {
        this.stock += cantidad;
        // Si el stock baja de cierto umbral, podríamos solicitar abastecimiento automáticamente
        if (this.stock < 10) {
            this.solicitarAbastecimiento(50);
        }
    }

    solicitarAbastecimiento(cantidad) {
        console.log(`Solicitando abastecimiento de ${cantidad} ${this.unidadMedida} de ${this.nombre}`);
        // En una implementación real, esto podría crear una nueva OrdenCompra
        // o añadir este material a una orden de compra pendiente
        return {
            materialId: this.id,
            cantidad: cantidad,
            proveedorId: this.proveedorId,
            fechaSolicitud: new Date()
        };
    }

    verificarDisponibilidad(cantidad) {
        return this.stock >= cantidad;
    }
}