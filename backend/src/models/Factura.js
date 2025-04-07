class Factura {
    constructor(id, ventaId, clienteId, total, fechaEmision, estado) {
        this.id = id;
        this.ventaId = ventaId;
        this.clienteId = clienteId;
        this.total = total;
        this.fechaEmision = fechaEmision;
        this.estado = estado; // "Pendiente", "Pagada", "Cancelada"
        this.fechaPago = null;
    }

    registrarPago(fecha) {
        this.estado = "Pagada";
        this.fechaPago = fecha || new Date();
    }

    anular(motivo) {
        this.estado = "Cancelada";
        this.motivoAnulacion = motivo;
    }
}