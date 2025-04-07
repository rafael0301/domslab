class MaterialController {
    constructor(materialService) {
        this.materialService = materialService;
    }

    async actualizarStock(req, res) {
        const { materialId, cantidad } = req.body;
        try {
            const material = await this.materialService.actualizarStock(materialId, cantidad);
            if (material) {
                res.status(200).json({ success: true, data: material });
            } else {
                res.status(404).json({ success: false, message: 'Material no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async solicitarAbastecimiento(req, res) {
        const { materialId, cantidad } = req.body;
        try {
            const solicitud = await this.materialService.solicitarAbastecimiento(materialId, cantidad);
            if (solicitud) {
                res.status(200).json({ success: true, data: solicitud });
            } else {
                res.status(404).json({ success: false, message: 'Material no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
