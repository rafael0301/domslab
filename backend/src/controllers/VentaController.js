class VentaController {
    constructor(ventaService) {
        this.ventaService = ventaService;
    }

    async crearVenta(req, res) {
        const ventaData = req.body;
        try {
            const venta = await this.ventaService.crearVenta(ventaData);
            res.status(201).json({ success: true, data: venta });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async asignarTransporte(req, res) {
        const { ventaId, transporteId } = req.body;
        try {
            const venta = await this.ventaService.asignarTransporte(ventaId, transporteId);
            if (venta) {
                res.status(200).json({ success: true, data: venta });
            } else {
                res.status(404).json({ success: false, message: 'Venta no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
