class Venta {
    constructor(id, tipoConcretoId, volumen, transporteId, facturaId, ubicacionEntrega, clienteId) {
        this.id = id;
        this.tipoConcretoId = tipoConcretoId;
        this.volumen = volumen;
        this.transporteId = transporteId;
        this.facturaId = facturaId;
        this.ubicacionEntrega = ubicacionEntrega;
        this.clienteId = clienteId;
        this.fecha = new Date();
    }

    generarFactura() {
        const factura = new Factura(
            Date.now(),
            this.id,
            this.clienteId,
            this.volumen * this.obtenerPrecioUnitario(),
            new Date(),
            "Pendiente"
        );
        this.facturaId = factura.id;
        return factura;
    }

    asignarTransporte(transporteId) {
        this.transporteId = transporteId;
    }

    obtenerPrecioUnitario() {
        return 100.0;
    }

    calcularTotal() {
        return this.volumen * this.obtenerPrecioUnitario();
    }
}
