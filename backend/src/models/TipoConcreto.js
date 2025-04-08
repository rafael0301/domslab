class TipoConcreto {
    constructor(id, nombre, descripcion, resistencia, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.resistencia = resistencia; // Resistencia en MPa
        this.precio = precio;
        this.receta = new Map(); // Map<Material, cantidad> para la receta base por m³
    }

    definirReceta(materiales) {
        // materiales es un Map<Material, cantidad> donde cantidad es por m³
        this.receta = new Map(materiales);
    }

    calcularMaterialesNecesarios(volumen) {
        const materialesNecesarios = new Map();
        for (const [material, cantidadBase] of this.receta.entries()) {
            materialesNecesarios.set(material, cantidadBase * volumen);
        }
        return materialesNecesarios;
    }

    calcularCosto(volumen) {
        let costoTotal = 0;
        for (const [material, cantidadBase] of this.receta.entries()) {
            costoTotal += material.precioUnitario * cantidadBase * volumen;
        }
        return costoTotal;
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            resistencia: this.resistencia,
            precio: this.precio,
            receta: Array.from(this.receta.entries()).map(([material, cantidad]) => ({
                material: material.toJSON(),
                cantidadPorMetroCubico: cantidad
            }))
        };
    }
}

module.exports = TipoConcreto;