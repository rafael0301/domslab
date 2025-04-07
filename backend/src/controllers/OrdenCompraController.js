class OrdenCompraController {
    constructor(ordenCompraService) {
        this.ordenCompraService = ordenCompraService;
    }

    async crearOrdenCompra(req, res) {
        const ordenData = req.body;
        try {
            const orden = await this.ordenCompraService.crearOrdenCompra(ordenData);
            res.status(201).json({ success: true, data: orden });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async confirmarRecepcion(req, res) {
        const { ordenId } = req.params;
        try {
            const orden = await this.ordenCompraService.confirmarRecepcion(ordenId);
            if (orden) {
                res.status(200).json({ success: true, data: orden });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async registrarDevolucion(req, res) {
        const { ordenId, materialId, cantidad, motivo } = req.body;
        try {
            const devolucion = await this.ordenCompraService.registrarDevolucion(
                ordenId, materialId, cantidad, motivo
            );
            if (devolucion) {
                res.status(201).json({ success: true, data: devolucion });
            } else {
                res.status(404).json({ success: false, message: 'Orden no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}