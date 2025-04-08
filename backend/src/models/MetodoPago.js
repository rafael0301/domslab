class MetodoPago {
    constructor(id, tipo, detalles, activo = true) {
        this.id = id;
        this.tipo = tipo; // 'TARJETA', 'TRANSFERENCIA', 'EFECTIVO', etc.
        this.detalles = detalles; // Información específica del método de pago
        this.activo = activo;
        this.fechaCreacion = new Date();
    }

    validar() {
        // Validar que el método de pago esté activo y tenga los detalles necesarios
        if (!this.activo) {
            throw new Error('Método de pago inactivo');
        }

        switch (this.tipo) {
            case 'TARJETA':
                if (!this.detalles.numero || !this.detalles.cvv || !this.detalles.fechaVencimiento) {
                    throw new Error('Detalles de tarjeta incompletos');
                }
                break;
            case 'TRANSFERENCIA':
                if (!this.detalles.cuenta || !this.detalles.banco) {
                    throw new Error('Detalles de transferencia incompletos');
                }
                break;
            case 'EFECTIVO':
                // No requiere detalles adicionales
                break;
            default:
                throw new Error('Tipo de método de pago no válido');
        }
    }

    desactivar() {
        this.activo = false;
    }

    activar() {
        this.activo = true;
    }

    toJSON() {
        return {
            id: this.id,
            tipo: this.tipo,
            activo: this.activo,
            fechaCreacion: this.fechaCreacion
        };
    }
}

module.exports = MetodoPago;