class OrdenCompra {
    constructor(id, proveedorId, materialesRequeridos, fechaEntrega, ubicacionEntrega) {
        this.id = id;
        this.proveedorId = proveedorId;
        this.materialesRequeridos = materialesRequeridos; // Map<Material, float>
        this.fechaEntrega = fechaEntrega;
        this.ubicacionEntrega = ubicacionEntrega;
        this.estado = "Pendiente"; // "Pendiente", "Entregada", "Cancelada"
        this.fechaCreacion = new Date();
    }

    confirmarRecepcion() {
        this.estado = "Entregada";
        this.fechaRecepcion = new Date();

        // Actualizar stock de materiales recibidos
        for (const [material, cantidad] of this.materialesRequeridos.entries()) {
            material.actualizarStock(cantidad);
        }
    }

    calcularTotalOrden() {
        let total = 0;
        for (const [material, cantidad] of this.materialesRequeridos.entries()) {
            total += material.precioUnitario * cantidad;
        }
        return total;
    }

    registrarDevolucion(materialId, cantidad, motivo) {
        // Buscar el material en la orden
        let materialDevuelto = null;
        let cantidadOriginal = 0;

        for (const [material, cant] of this.materialesRequeridos.entries()) {
            if (material.id === materialId) {
                materialDevuelto = material;
                cantidadOriginal = cant;
                break;
            }
        }

        if (!materialDevuelto) {
            throw new Error("Material no encontrado en esta orden");
        }

        // Validar que la cantidad a devolver no exceda la cantidad original
        if (cantidad > cantidadOriginal) {
            throw new Error("La cantidad a devolver excede la cantidad original");
        }

        // Actualizar el stock (restar la cantidad devuelta)
        materialDevuelto.actualizarStock(-cantidad);

        // Crear un registro de devolución
        const devolucion = new Devolucion(
            Date.now(),
            this.id,
            materialId,
            cantidad,
            motivo,
            new Date()
        );

        return devolucion;
    }
}