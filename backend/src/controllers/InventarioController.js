class InventarioController {
    constructor(inventarioService) {
        this.inventarioService = inventarioService;
    }

    async registrarInventario(req, res) {
        const inventarioData = req.body;
        try {
            const inventario = await this.inventarioService.registrarInventario(inventarioData);
            res.status(201).json({ success: true, data: inventario });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async verificarDisponibilidad(req, res) {
        const { inventarioId, materialId, cantidad } = req.params;
        try {
            const disponible = await this.inventarioService.verificarDisponibilidad(inventarioId, materialId, cantidad);
            res.status(200).json({ success: true, disponible });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async registrarMovimiento(req, res) {
        const { inventarioId } = req.params;
        const { materialId, cantidad, tipoMovimiento } = req.body;
        try {
            const inventario = await this.inventarioService.registrarMovimiento(
                inventarioId,
                materialId,
                cantidad,
                tipoMovimiento
            );
            if (inventario) {
                res.status(200).json({ success: true, data: inventario });
            } else {
                res.status(404).json({ success: false, message: 'Inventario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async obtenerStockBajo(req, res) {
        const { inventarioId } = req.params;
        try {
            const stockBajo = await this.inventarioService.obtenerStockBajo(inventarioId);
            res.status(200).json({ success: true, data: stockBajo });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async generarReporteInventario(req, res) {
        const { inventarioId } = req.params;
        try {
            const reporte = await this.inventarioService.generarReporteInventario(inventarioId);
            if (reporte) {
                res.status(200).json({ success: true, data: reporte });
            } else {
                res.status(404).json({ success: false, message: 'Inventario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}