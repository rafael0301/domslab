class TipoConcretoController {
    constructor(tipoConcretoService) {
        this.tipoConcretoService = tipoConcretoService;
    }

    async crearTipoConcreto(req, res) {
        const tipoConcretoData = req.body;
        try {
            const tipoConcreto = await this.tipoConcretoService.crearTipoConcreto(tipoConcretoData);
            res.status(201).json({ success: true, data: tipoConcreto });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async definirReceta(req, res) {
        const { tipoConcretoId } = req.params;
        const { materiales } = req.body;
        try {
            const tipoConcreto = await this.tipoConcretoService.definirReceta(tipoConcretoId, materiales);
            if (tipoConcreto) {
                res.status(200).json({ success: true, data: tipoConcreto });
            } else {
                res.status(404).json({ success: false, message: 'Tipo de concreto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async calcularMaterialesNecesarios(req, res) {
        const { tipoConcretoId } = req.params;
        const { volumen } = req.query;
        try {
            const materiales = await this.tipoConcretoService.calcularMaterialesNecesarios(tipoConcretoId, parseFloat(volumen));
            if (materiales) {
                res.status(200).json({ success: true, data: materiales });
            } else {
                res.status(404).json({ success: false, message: 'Tipo de concreto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async calcularCosto(req, res) {
        const { tipoConcretoId } = req.params;
        const { volumen } = req.query;
        try {
            const costo = await this.tipoConcretoService.calcularCosto(tipoConcretoId, parseFloat(volumen));
            if (costo !== null) {
                res.status(200).json({ success: true, data: { costo } });
            } else {
                res.status(404).json({ success: false, message: 'Tipo de concreto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async actualizarPrecio(req, res) {
        const { tipoConcretoId } = req.params;
        const { nuevoPrecio } = req.body;
        try {
            const tipoConcreto = await this.tipoConcretoService.actualizarPrecio(tipoConcretoId, nuevoPrecio);
            if (tipoConcreto) {
                res.status(200).json({ success: true, data: tipoConcreto });
            } else {
                res.status(404).json({ success: false, message: 'Tipo de concreto no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async obtenerTiposConcreto(req, res) {
        try {
            const tiposConcreto = await this.tipoConcretoService.obtenerTiposConcreto();
            res.status(200).json({ success: true, data: tiposConcreto });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
