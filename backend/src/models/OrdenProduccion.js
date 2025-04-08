class OrdenProduccion {
    constructor(id, tipoConcreto, volumen, fechaInicio, fechaFinEstimada, empleadoId) {
        this.id = id;
        this.tipoConcreto = tipoConcreto;
        this.volumen = volumen;
        this.fechaInicio = fechaInicio;
        this.fechaFinEstimada = fechaFinEstimada;
        this.empleadoId = empleadoId;
        this.estado = 'PENDIENTE'; // 'PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA'
        this.materialesUtilizados = new Map(); // Map<Material, cantidad>
        this.notas = [];
    }

    iniciarProduccion() {
        if (this.estado !== 'PENDIENTE') {
            throw new Error('Solo se pueden iniciar órdenes pendientes');
        }
        this.estado = 'EN_PROCESO';
        this.fechaInicio = new Date();
    }

    completarProduccion() {
        if (this.estado !== 'EN_PROCESO') {
            throw new Error('Solo se pueden completar órdenes en proceso');
        }
        this.estado = 'COMPLETADA';
        this.fechaFin = new Date();
    }

    cancelarProduccion(motivo) {
        if (this.estado === 'COMPLETADA') {
            throw new Error('No se puede cancelar una orden completada');
        }
        this.estado = 'CANCELADA';
        this.notas.push({
            fecha: new Date(),
            tipo: 'CANCELACION',
            descripcion: motivo
        });
    }

    registrarUsoMaterial(material, cantidad) {
        if (this.estado !== 'EN_PROCESO') {
            throw new Error('Solo se pueden registrar materiales en órdenes en proceso');
        }
        this.materialesUtilizados.set(material, (this.materialesUtilizados.get(material) || 0) + cantidad);
    }

    agregarNota(descripcion) {
        this.notas.push({
            fecha: new Date(),
            tipo: 'NOTA',
            descripcion: descripcion
        });
    }

    calcularMaterialesNecesarios() {
        // Aquí iría la lógica para calcular los materiales necesarios según el tipo y volumen
        const materialesNecesarios = new Map();
        // TODO: Implementar cálculo real basado en recetas de concreto
        return materialesNecesarios;
    }

    toJSON() {
        return {
            id: this.id,
            tipoConcreto: this.tipoConcreto,
            volumen: this.volumen,
            fechaInicio: this.fechaInicio,
            fechaFinEstimada: this.fechaFinEstimada,
            fechaFin: this.fechaFin,
            empleadoId: this.empleadoId,
            estado: this.estado,
            materialesUtilizados: Array.from(this.materialesUtilizados.entries()).map(([material, cantidad]) => ({
                material: material.toJSON(),
                cantidad: cantidad
            })),
            notas: this.notas
        };
    }
}

module.exports = OrdenProduccion; 