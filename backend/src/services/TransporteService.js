class TransporteService {
    constructor(transporteRepository) {
        this.transporteRepository = transporteRepository;
    }

    async registrarTransporte(transporteData) {
        return this.transporteRepository.create(transporteData);
    }

    async asignarRuta(transporteId, origen, destino, volumen) {
        const transporte = await this.transporteRepository.findById(transporteId);
        if (transporte) {
            transporte.asignarRuta(origen, destino, volumen);
            return this.transporteRepository.update(transporteId, transporte);
        }
        return null;
    }

    async actualizarUbicacion(transporteId, latitud, longitud) {
        const transporte = await this.transporteRepository.findById(transporteId);
        if (transporte) {
            transporte.actualizarUbicacion(latitud, longitud);
            return this.transporteRepository.update(transporteId, transporte);
        }
        return null;
    }

    async completarViaje(transporteId) {
        const transporte = await this.transporteRepository.findById(transporteId);
        if (transporte) {
            transporte.completarViaje();
            return this.transporteRepository.update(transporteId, transporte);
        }
        return null;
    }

    async registrarMantenimiento(transporteId, descripcion) {
        const transporte = await this.transporteRepository.findById(transporteId);
        if (transporte) {
            transporte.registrarMantenimiento(descripcion);
            return this.transporteRepository.update(transporteId, transporte);
        }
        return null;
    }

    async obtenerTransportesDisponibles() {
        const transportes = await this.transporteRepository.findAll();
        return transportes.filter(t => t.estado === 'DISPONIBLE');
    }

    async calcularCostoViaje(transporteId, distancia, tiempo) {
        const transporte = await this.transporteRepository.findById(transporteId);
        if (transporte) {
            return transporte.calcularCostoViaje(distancia, tiempo);
        }
        return null;
    }
}