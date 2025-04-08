class TransporteController {
    constructor(transporteService) {
        this.transporteService = transporteService;
    }

    async registrarTransporte(req, res) {
        const transporteData = req.body;
        try {
            const transporte = await this.transporteService.registrarTransporte(transporteData);
            res.status(201).json({ success: true, data: transporte });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async asignarRuta(req, res) {
        const { transporteId } = req.params;
        const { origen, destino, volumen } = req.body;
        try {
            const transporte = await this.transporteService.asignarRuta(transporteId, origen, destino, volumen);
            if (transporte) {
                res.status(200).json({ success: true, data: transporte });
            } else {
                res.status(404).json({ success: false, message: 'Transporte no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async actualizarUbicacion(req, res) {
        const { transporteId } = req.params;
        const { latitud, longitud } = req.body;
        try {
            const transporte = await this.transporteService.actualizarUbicacion(transporteId, latitud, longitud);
            if (transporte) {
                res.status(200).json({ success: true, data: transporte });
            } else {
                res.status(404).json({ success: false, message: 'Transporte no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async completarViaje(req, res) {
        const { transporteId } = req.params;
        try {
            const transporte = await this.transporteService.completarViaje(transporteId);
            if (transporte) {
                res.status(200).json({ success: true, data: transporte });
            } else {
                res.status(404).json({ success: false, message: 'Transporte no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async registrarMantenimiento(req, res) {
        const { transporteId } = req.params;
        const { descripcion } = req.body;
        try {
            const transporte = await this.transporteService.registrarMantenimiento(transporteId, descripcion);
            if (transporte) {
                res.status(200).json({ success: true, data: transporte });
            } else {
                res.status(404).json({ success: false, message: 'Transporte no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async obtenerTransportesDisponibles(req, res) {
        try {
            const transportes = await this.transporteService.obtenerTransportesDisponibles();
            res.status(200).json({ success: true, data: transportes });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async calcularCostoViaje(req, res) {
        const { transporteId } = req.params;
        const { distancia, tiempo } = req.body;
        try {
            const costo = await this.transporteService.calcularCostoViaje(transporteId, distancia, tiempo);
            if (costo !== null) {
                res.status(200).json({ success: true, data: { costo } });
            } else {
                res.status(404).json({ success: false, message: 'Transporte no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}