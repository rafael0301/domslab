class Operacion {
    constructor(id, tipo, descripcion, fechaInicio, duracionEstimada) {
        this.id = id;
        this.tipo = tipo; // 'MEZCLADO', 'TRANSPORTE', 'BOMBEO', etc.
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.duracionEstimada = duracionEstimada; // en minutos
        this.estado = 'PENDIENTE'; // 'PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA'
        this.equiposAsignados = new Set();
        this.empleadosAsignados = new Set();
        this.costos = [];
        this.notas = [];
    }

    iniciarOperacion() {
        if (this.estado !== 'PENDIENTE') {
            throw new Error('Solo se pueden iniciar operaciones pendientes');
        }
        if (this.equiposAsignados.size === 0) {
            throw new Error('No hay equipos asignados a la operación');
        }
        if (this.empleadosAsignados.size === 0) {
            throw new Error('No hay empleados asignados a la operación');
        }
        this.estado = 'EN_PROCESO';
        this.fechaInicioReal = new Date();
    }

    completarOperacion() {
        if (this.estado !== 'EN_PROCESO') {
            throw new Error('Solo se pueden completar operaciones en proceso');
        }
        this.estado = 'COMPLETADA';
        this.fechaFinReal = new Date();
        this.calcularCostoTotal();
    }

    asignarEquipo(equipo) {
        if (equipo.estado !== 'DISPONIBLE') {
            throw new Error('El equipo no está disponible');
        }
        this.equiposAsignados.add(equipo);
        equipo.asignarOperacion(this.id);
    }

    asignarEmpleado(empleado) {
        this.empleadosAsignados.add(empleado);
    }

    registrarCosto(tipo, monto, descripcion) {
        this.costos.push({
            fecha: new Date(),
            tipo, // 'MATERIAL', 'MANO_OBRA', 'EQUIPO', 'OTROS'
            monto,
            descripcion
        });
    }

    calcularCostoTotal() {
        return this.costos.reduce((total, costo) => total + costo.monto, 0);
    }

    agregarNota(descripcion) {
        this.notas.push({
            fecha: new Date(),
            descripcion
        });
    }

    toJSON() {
        return {
            id: this.id,
            tipo: this.tipo,
            descripcion: this.descripcion,
            fechaInicio: this.fechaInicio,
            fechaInicioReal: this.fechaInicioReal,
            fechaFinReal: this.fechaFinReal,
            duracionEstimada: this.duracionEstimada,
            estado: this.estado,
            equiposAsignados: Array.from(this.equiposAsignados).map(equipo => equipo.toJSON()),
            empleadosAsignados: Array.from(this.empleadosAsignados).map(empleado => empleado.toJSON()),
            costos: this.costos,
            notas: this.notas
        };
    }
}

module.exports = Operacion; 