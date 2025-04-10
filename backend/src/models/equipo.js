class Equipo {
    constructor(id, nombre, tipo, capacidad, estado = 'DISPONIBLE') {
        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo; // 'MEZCLADORA', 'BOMBA', 'TRANSPORTADOR', etc.
        this.capacidad = capacidad;
        this.estado = estado; // 'DISPONIBLE', 'EN_USO', 'MANTENIMIENTO', 'FUERA_SERVICIO'
        this.historialMantenimiento = [];
        this.horasUso = 0;
    }

    asignarOperacion(operacionId) {
        if (this.estado !== 'DISPONIBLE') {
            throw new Error('Equipo no disponible');
        }
        this.estado = 'EN_USO';
        this.operacionActual = operacionId;
    }

    liberarEquipo() {
        if (this.estado !== 'EN_USO') {
            throw new Error('El equipo no está en uso');
        }
        this.estado = 'DISPONIBLE';
        this.operacionActual = null;
    }

    registrarMantenimiento(descripcion, tipo, costo) {
        const mantenimiento = {
            fecha: new Date(),
            descripcion,
            tipo, // 'PREVENTIVO', 'CORRECTIVO'
            costo,
            horasUsoAlMomento: this.horasUso
        };
        this.historialMantenimiento.push(mantenimiento);
        this.estado = 'MANTENIMIENTO';
    }

    completarMantenimiento() {
        if (this.estado !== 'MANTENIMIENTO') {
            throw new Error('El equipo no está en mantenimiento');
        }
        this.estado = 'DISPONIBLE';
    }

    registrarHorasUso(horas) {
        this.horasUso += horas;
        if (this.horasUso >= 100) { // ejemplo: cada 100 horas
            this.programarMantenimientoPreventivo();
        }
    }

    programarMantenimientoPreventivo() {
        console.log(`Mantenimiento preventivo requerido para equipo ${this.id}`);
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            tipo: this.tipo,
            capacidad: this.capacidad,
            estado: this.estado,
            horasUso: this.horasUso,
            historialMantenimiento: this.historialMantenimiento,
            operacionActual: this.operacionActual
        };
    }
}
module.exports = Equipo;