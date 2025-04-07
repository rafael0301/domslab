class MaterialService {
    constructor(materialRepository) {
        this.materialRepository = materialRepository;
    }

    async actualizarStock(materialId, cantidad) {
        const material = await this.materialRepository.findById(materialId);
        if (material) {
            material.actualizarStock(cantidad);
            return this.materialRepository.update(materialId, material);
        }
        return null;
    }

    async solicitarAbastecimiento(materialId, cantidad) {
        const material = await this.materialRepository.findById(materialId);
        if (material) {
            const solicitud = material.solicitarAbastecimiento(cantidad);
            // Aquí podríamos crear una orden de compra o notificar al proveedor
            return solicitud;
        }
        return null;
    }

    async verificarDisponibilidadMultiple(materialesRequeridos) {
        // materialesRequeridos es un Map<materialId, cantidad>
        for (const [materialId, cantidad] of materialesRequeridos.entries()) {
            const material = await this.materialRepository.findById(materialId);
            if (!material || !material.verificarDisponibilidad(cantidad)) {
                return false;
            }
        }
        return true;
    }
}