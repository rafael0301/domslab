class EquipoService {
    constructor(equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    async registrarEquipo(equipoData) {
        return this.equipoRepository.create(equipoData);
    }

    async actualizarEstado(equipoId, nuevoEstado) {
        const equipo = await this.equipoRepository.findById(equipoId);
        if (equipo) {
            equipo.estado = nuevoEstado;
            return this.equipoRepository.update(equipoId, equipo);
        }
        return null;
    }

    async registrarMantenimiento(equipoId, descripcion, tipo, costo) {
        const equipo = await this.equipoRepository.findById(equipoId);
        if (equipo) {
            equipo.registrarMantenimiento(descripcion, tipo, costo);
            return this.equipoRepository.update(equipoId, equipo);
        }
        return null;
    }

    async completarMantenimiento(equipoId) {
        const equipo = await this.equipoRepository.findById(equipoId);
        if (equipo) {
            equipo.completarMantenimiento();
            return this.equipoRepository.update(equipoId, equipo);
        }
        return null;
    }

    async registrarHorasUso(equipoId, horas) {
        const equipo = await this.equipoRepository.findById(equipoId);
        if (equipo) {
            equipo.registrarHorasUso(horas);
            return this.equipoRepository.update(equipoId, equipo);
        }
        return null;
    }
}