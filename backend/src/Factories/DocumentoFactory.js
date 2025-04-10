class DocumentoFactory {
    static crearDocumento(tipo, datos) {
        switch(tipo) {
            case 'FACTURA_VENTA':
                return new FacturaVenta(
                    datos.id,
                    datos.ventaId,
                    datos.clienteId,
                    datos.total,
                    datos.fechaEmision,
                    datos.estado
                );
            case 'FACTURA_COMPRA':
                return new FacturaCompra(
                    datos.id,
                    datos.ordenCompraId,
                    datos.proveedorId,
                    datos.total,
                    datos.fechaEmision,
                    datos.estado
                );
            case 'ORDEN_COMPRA':
                return new OrdenCompra(
                    datos.id,
                    datos.proveedorId,
                    datos.materialesRequeridos,
                    datos.fechaEntrega,
                    datos.ubicacionEntrega
                );
            case 'ORDEN_PRODUCCION':
                return new OrdenProduccion(
                    datos.id,
                    datos.tipoConcreto,
                    datos.volumen,
                    datos.fechaInicio,
                    datos.fechaFinEstimada,
                    datos.empleadoId
                );
            default:
                throw new Error('Tipo de documento no soportado');
        }
    }
}
