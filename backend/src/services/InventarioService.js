class InventarioService {
    constructor(inventarioRepository) {
        this.inventarioRepository = inventarioRepository;
    }

    async registrarInventario(inventarioData) {
        return this.inventarioRepository.create(inventarioData);
    }

    async verificarDisponibilidad(inventarioId, materialId, cantidad) {
        const inventario = await this.inventarioRepository.findById(inventarioId);
        if (inventario) {
            return inventario.verificarDisponibilidad(materialId, cantidad);
        }
        return false;
    }

    async registrarMovimiento(inventarioId, materialId, cantidad, tipoMovimiento) {
        const inventario = await this.inventarioRepository.findById(inventarioId);
        if (inventario) {
            try {
                inventario.registrarMovimiento(materialId, cantidad, tipoMovimiento);
                return this.inventarioRepository.update(inventarioId, inventario);
            } catch (error) {
                throw error;
            }
        }
        return null;
    }

    async obtenerStockBajo(inventarioId) {
        const inventario = await this.inventarioRepository.findById(inventarioId);
        if (inventario) {
            return inventario.obtenerStockBajo();
        }
        return [];
    }

    async generarReporteInventario(inventarioId) {
        const inventario = await this.inventarioRepository.findById(inventarioId);
        if (inventario) {
            return inventario.generarReporteInventario();
        }
        return null;
    }
}
