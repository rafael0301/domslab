class OrdenProduccionController {
    constructor(ordenProduccionService) {
        this.ordenProduccionService = ordenProduccionService;
    }

    async crearOrdenProduccion(req, res) {
        const ordenData = req.body;
        try {
            const orden = await this.ordenProduccionService.crearOrdenProduccion(ordenData);
            res.status(201).json({ success: true, data: orden });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async iniciarProduccion(req, res) {
        const { ordenId } = req.params;
        try {
            const orden = await this.ordenProduccionService.iniciarProduccion(ordenId);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async completarProduccion(req, res) {
        const { ordenId } = req.params;
        try {
            const orden = await this.ordenProduccionService.completarProduccion(ordenId);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async cancelarProduccion(req, res) {
        const { ordenId } = req.params;
        const { motivo } = req.body;
        try {
            const orden = await this.ordenProduccionService.cancelarProduccion(ordenId, motivo);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async registrarUsoMaterial(req, res) {
        const { ordenId } = req.params;
        const { materialId, cantidad } = req.body;
        try {
            const orden = await this.ordenProduccionService.registrarUsoMaterial(ordenId, materialId, cantidad);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden o material no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async agregarNota(req, res) {
        const { ordenId } = req.params;
        const { descripcion } = req.body;
        try {
            const orden = await this.ordenProduccionService.agregarNota(ordenId, descripcion);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
    async obtenerOrdenPorId(req, res) {
        const { ordenId } = req.params;
        try {
            const orden = await this.ordenProduccionService.obtenerOrdenPorId(ordenId);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async obtenerTodasOrdenes(req, res) {
        try {
            const ordenes = await this.ordenProduccionService.obtenerTodasOrdenes();
            res.status(200).json({ success: true, data: ordenes });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async actualizarOrden(req, res) {
        const { ordenId } = req.params;
        const ordenData = req.body;
        try {
            const orden = await this.ordenProduccionService.actualizarOrden(ordenId, ordenData);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async eliminarOrden(req, res) {
        const { ordenId } = req.params;
        try {
            const resultado = await this.ordenProduccionService.eliminarOrden(ordenId);
            if (resultado) {
                res.status(200).json({ success: true, message: 'Orden eliminada correctamente' });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}