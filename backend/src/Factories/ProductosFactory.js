class ProductoFactory {
    static crearProducto(tipo, datos) {
        switch(tipo) {
            case 'TIPO_CONCRETO':
                return new TipoConcreto(
                    datos.id,
                    datos.nombre,
                    datos.descripcion,
                    datos.resistencia,
                    datos.precio
                );
            case 'MATERIAL':
                return new Material(
                    datos.id,
                    datos.nombre,
                    datos.descripcion,
                    datos.unidadMedida,
                    datos.proveedorId,
                    datos.stock,
                    datos.precioUnitario,
                    datos.ubicacionAlmacen
                );
            default:
                throw new Error('Tipo de producto no soportado');
        }
    }
}

module.exports = ProductoFactory; 