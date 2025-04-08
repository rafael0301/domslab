class OrdenProduccionService {
    constructor(ordenProduccionRepository, materialService, inventarioService) {
        this.ordenProduccionRepository = ordenProduccionRepository;
        this.materialService = materialService;
        this.inventarioService = inventarioService;
    }

    async crearOrdenProduccion(ordenData) {
        // Verificar disponibilidad de materiales antes de crear la orden
        const materialesNecesarios = ordenData.tipoConcreto.calcularMaterialesNecesarios(ordenData.volumen);
        for (const [material, cantidad] of materialesNecesarios.entries()) {
            const disponible = await this.materialService.verificarDisponibilidad(material.id, cantidad);
            if (!disponible) {
                throw new Error(`Material ${material.nombre} no disponible en cantidad suficiente`);
            }
        }

        return this.ordenProduccionRepository.create(ordenData);
    }

    async iniciarProduccion(ordenId) {
        const orden = await this.ordenProduccionRepository.findById(ordenId);
        if (orden) {
            orden.iniciarProduccion();
            return this.ordenProduccionRepository.update(ordenId, orden);
        }
        return null;
    }

    async completarProduccion(ordenId) {
        const orden = await this.ordenProduccionRepository.findById(ordenId);
        if (orden) {
            orden.completarProduccion();
            return this.ordenProduccionRepository.update(ordenId, orden);
        }
        return null;
    }

    async cancelarProduccion(ordenId, motivo) {
        const orden = await this.ordenProduccionRepository.findById(ordenId);
        if (orden) {
            orden.cancelarProduccion(motivo);
            return this.ordenProduccionRepository.update(ordenId, orden);
        }
        return null;
    }

    async registrarUsoMaterial(ordenId, materialId, cantidad) {
        const orden = await this.ordenProduccionRepository.findById(ordenId);
        if (orden) {
            const material = await this.materialService.obtenerMaterial(materialId);
            if (material) {
                orden.registrarUsoMaterial(material, cantidad);
                await this.inventarioService.registrarMovimiento(material.id, cantidad, 'SALIDA');
                return this.ordenProduccionRepository.update(ordenId, orden);
            }
        }
        return null;
    }

    async agregarNota(ordenId, descripcion) {
        const orden = await this.ordenProduccionRepository.findById(ordenId);
        if (orden) {
            orden.agregarNota(descripcion);
            return this.ordenProduccionRepository.update(ordenId, orden);
        }
        return null;
    }
}
