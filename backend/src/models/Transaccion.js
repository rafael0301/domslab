class Transaccion {
    constructor(id, monto, metodoPagoId, tipo, estado = 'PENDIENTE') {
        this.id = id;
        this.monto = monto;
        this.metodoPagoId = metodoPagoId;
        this.tipo = tipo; // 'VENTA', 'COMPRA', 'DEVOLUCION'
        this.estado = estado; // 'PENDIENTE', 'COMPLETADA', 'FALLIDA', 'REEMBOLSADA'
        this.fechaCreacion = new Date();
        this.fechaActualizacion = new Date();
        this.detalles = {};
    }

    procesarPago() {
        try {
            this.estado = 'COMPLETADA';
            this.fechaActualizacion = new Date();
            return true;
        } catch (error) {
            this.estado = 'FALLIDA';
            this.fechaActualizacion = new Date();
            throw error;
        }
    }

    reembolsar() {
        if (this.estado !== 'COMPLETADA') {
            throw new Error('Solo se pueden reembolsar transacciones completadas');
        }

        try {
            this.estado = 'REEMBOLSADA';
            this.fechaActualizacion = new Date();
            return true;
        } catch (error) {
            throw error;
        }
    }

    agregarDetalles(detalles) {
        this.detalles = { ...this.detalles, ...detalles };
    }

    toJSON() {
        return {
            id: this.id,
            monto: this.monto,
            metodoPagoId: this.metodoPagoId,
            tipo: this.tipo,
            estado: this.estado,
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
            detalles: this.detalles
        };
    }
}

module.exports = Transaccion;