class Inventario {
    constructor(id, ubicacion, capacidad) {
        this.id = id;
        this.ubicacion = ubicacion;
        this.capacidad = capacidad;
        this.materiales = new Map(); // Map<Material, cantidad>
    }

    verificarDisponibilidad(materialId, cantidad) {
        const material = this.materiales.get(materialId);
        return material && material.stock >= cantidad;
    }

    registrarMovimiento(materialId, cantidad, tipoMovimiento) {
        const material = this.materiales.get(materialId);
        if (!material) {
            throw new Error('Material no encontrado en el inventario');
        }

        if (tipoMovimiento === 'ENTRADA') {
            material.actualizarStock(cantidad);
        } else if (tipoMovimiento === 'SALIDA') {
            if (!this.verificarDisponibilidad(materialId, cantidad)) {
                throw new Error('Stock insuficiente');
            }
            material.actualizarStock(-cantidad);
        }
    }

    obtenerStockBajo() {
        const stockBajo = [];
        for (const [material, cantidad] of this.materiales.entries()) {
            if (cantidad < material.stockMinimo) {
                stockBajo.push(material);
            }
        }
        return stockBajo;
    }

    generarReporteInventario() {
        const reporte = {
            fecha: new Date(),
            totalMateriales: this.materiales.size,
            stockBajo: this.obtenerStockBajo().length,
            materiales: []
        };

        for (const [material, cantidad] of this.materiales.entries()) {
            reporte.materiales.push({
                id: material.id,
                nombre: material.nombre,
                cantidad: cantidad,
                unidadMedida: material.unidadMedida,
                ubicacion: material.ubicacionAlmacen
            });
        }

        return reporte;
    }

    actualizarStockMasivo(materiales) {
        for (const material of materiales) {
            this.materiales.set(material.id, material);
        }
    }

    toJSON() {
        return {
            id: this.id,
            ubicacion: this.ubicacion,
            capacidad: this.capacidad,
            materiales: Array.from(this.materiales.entries()).map(([material, cantidad]) => ({
                material: material.toJSON(),
                cantidad: cantidad
            }))
        };
    }
}

module.exports = Inventario;