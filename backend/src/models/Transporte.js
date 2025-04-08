class Transporte {
    constructor(id, vehiculo, capacidad, conductor) {
        this.id = id;
        this.vehiculo = vehiculo; // Información del vehículo
        this.capacidad = capacidad; // Capacidad en m³
        this.conductor = conductor; // ID del empleado conductor
        this.estado = 'DISPONIBLE'; // 'DISPONIBLE', 'EN_RUTA', 'MANTENIMIENTO'
        this.ubicacionActual = null;
        this.rutaActual = null;
        this.historialViajes = [];
    }

    asignarRuta(origen, destino, volumen) {
        if (this.estado !== 'DISPONIBLE') {
            throw new Error('Vehículo no disponible');
        }
        if (volumen > this.capacidad) {
            throw new Error('Volumen excede la capacidad del vehículo');
        }

        this.rutaActual = {
            origen,
            destino,
            volumen,
            fechaInicio: new Date(),
            estado: 'EN_CURSO'
        };
        this.estado = 'EN_RUTA';
    }

    actualizarUbicacion(latitud, longitud) {
        this.ubicacionActual = { latitud, longitud, timestamp: new Date() };
        if (this.rutaActual) {
            this.rutaActual.ultimaUbicacion = this.ubicacionActual;
        }
    }

    completarViaje() {
        if (!this.rutaActual || this.estado !== 'EN_RUTA') {
            throw new Error('No hay viaje en curso');
        }

        this.rutaActual.fechaFin = new Date();
        this.rutaActual.estado = 'COMPLETADO';
        this.historialViajes.push(this.rutaActual);
        this.rutaActual = null;
        this.estado = 'DISPONIBLE';
    }

    registrarMantenimiento(descripcion) {
        if (this.estado === 'EN_RUTA') {
            throw new Error('No se puede registrar mantenimiento durante un viaje');
        }
        this.estado = 'MANTENIMIENTO';
        // Registrar detalles del mantenimiento
    }

    calcularCostoViaje(distancia, tiempo) {
        // Cálculo básico del costo del viaje
        const costoPorKm = 2.5; // ejemplo
        const costoPorHora = 30; // ejemplo
        return (distancia * costoPorKm) + (tiempo * costoPorHora);
    }

    toJSON() {
        return {
            id: this.id,
            vehiculo: this.vehiculo,
            capacidad: this.capacidad,
            conductor: this.conductor,
            estado: this.estado,
            ubicacionActual: this.ubicacionActual,
            rutaActual: this.rutaActual,
            historialViajes: this.historialViajes
        };
    }
}

module.exports = Transporte; 