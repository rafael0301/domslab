class EquipoController {
    constructor(equipoService) {
        this.equipoService = equipoService;
    }

    async registrarEquipo(req, res) {
        const equipoData = req.body;
        try {
            const equipo = await this.equipoService.registrarEquipo(equipoData);
            res.status(201).json({ success: true, data: equipo });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async actualizarEstado(req, res) {
        const { equipoId } = req.params;
        const { nuevoEstado } = req.body;
        try {
            const equipo = await this.equipoService.actualizarEstado(equipoId, nuevoEstado);
            if (equipo) {
                res.status(200).json({ success: true, data: equipo });
            } else {
                res.status(404).json({ success: false, message: 'Equipo no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async registrarMantenimiento(req, res) {
        const { equipoId } = req.params;
        const { descripcion, tipo, costo } = req.body;
        try {
            const equipo = await this.equipoService.registrarMantenimiento(equipoId, descripcion, tipo, costo);
            if (equipo) {
                res.status(200).json({ success: true, data: equipo });
            } else {
                res.status(404).json({ success: false, message: 'Equipo no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async completarMantenimiento(req, res) {
        const { equipoId } = req.params;
        try {
            const equipo = await this.equipoService.completarMantenimiento(equipoId);
            if (equipo) {
                res.status(200).json({ success: true, data: equipo });
            } else {
                res.status(404).json({ success: false, message: 'Equipo no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async registrarHorasUso(req, res) {
        const { equipoId } = req.params;
        const { horas } = req.body;
        try {
            const equipo = await this.equipoService.registrarHorasUso(equipoId, horas);
            if (equipo) {
                res.status(200).json({ success: true, data: equipo });
            } else {
                res.status(404).json({ success: false, message: 'Equipo no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
