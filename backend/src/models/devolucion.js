class Devolucion {
    constructor(id, ordenCompraId, materialId, cantidad, motivo, fecha) {
        this.id = id;
        this.ordenCompraId = ordenCompraId;
        this.materialId = materialId;
        this.cantidad = cantidad;
        this.motivo = motivo;
        this.fecha = fecha;
        this.estado = "Pendiente"; // "Pendiente", "Procesada", "Rechazada"
    }

    procesarDevolucion() {
        this.estado = "Procesada";
        this.fechaProcesamiento = new Date();
    }

    rechazarDevolucion(motivoRechazo) {
        this.estado = "Rechazada";
        this.motivoRechazo = motivoRechazo;
    }
}