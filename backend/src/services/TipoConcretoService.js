class TipoConcretoService {
    constructor(tipoConcretoRepository) {
        this.tipoConcretoRepository = tipoConcretoRepository;
    }

    async crearTipoConcreto(tipoConcretoData) {
        return this.tipoConcretoRepository.create(tipoConcretoData);
    }

    async definirReceta(tipoConcretoId, materiales) {
        const tipoConcreto = await this.tipoConcretoRepository.findById(tipoConcretoId);
        if (tipoConcreto) {
            tipoConcreto.definirReceta(materiales);
            return this.tipoConcretoRepository.update(tipoConcretoId, tipoConcreto);
        }
        return null;
    }

    async calcularMaterialesNecesarios(tipoConcretoId, volumen) {
        const tipoConcreto = await this.tipoConcretoRepository.findById(tipoConcretoId);
        if (tipoConcreto) {
            return tipoConcreto.calcularMaterialesNecesarios(volumen);
        }
        return null;
    }

    async calcularCosto(tipoConcretoId, volumen) {
        const tipoConcreto = await this.tipoConcretoRepository.findById(tipoConcretoId);
        if (tipoConcreto) {
            return tipoConcreto.calcularCosto(volumen);
        }
        return null;
    }

    async actualizarPrecio(tipoConcretoId, nuevoPrecio) {
        const tipoConcreto = await this.tipoConcretoRepository.findById(tipoConcretoId);
        if (tipoConcreto) {
            tipoConcreto.precio = nuevoPrecio;
            return this.tipoConcretoRepository.update(tipoConcretoId, tipoConcreto);
        }
        return null;
    }

    async obtenerTiposConcreto() {
        return this.tipoConcretoRepository.findAll();
    }
}