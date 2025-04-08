class Permiso {
    constructor(id, codigo, descripcion, modulo) {
        this.id = id;
        this.validarCodigo(codigo);
        this.codigo = codigo.toUpperCase();
        this.descripcion = descripcion;
        this.modulo = modulo;
        this.activo = true;
        this.fechaCreacion = new Date();
        this.historialCambios = [{
            tipo: 'CREACION',
            fecha: new Date(),
            descripcion: 'Permiso creado'
        }];
    }

    validarCodigo(codigo) {
        if (!codigo || typeof codigo !== 'string') {
            throw new Error('El código del permiso es requerido y debe ser una cadena');
        }

        const formatoValido = /^[A-Z_]{3,50}$/i;
        if (!formatoValido.test(codigo)) {
            throw new Error('El código debe contener solo letras mayúsculas y guiones bajos, entre 3 y 50 caracteres');
        }
    }

    desactivar() {
        if (!this.activo) {
            throw new Error('El permiso ya está desactivado');
        }
        this.activo = false;
        this.registrarCambio('DESACTIVACION', 'Permiso desactivado');
    }

    activar() {
        if (this.activo) {
            throw new Error('El permiso ya está activo');
        }
        this.activo = true;
        this.registrarCambio('ACTIVACION', 'Permiso activado');
    }

    actualizarDescripcion(nuevaDescripcion) {
        if (!nuevaDescripcion || typeof nuevaDescripcion !== 'string') {
            throw new Error('La descripción es requerida y debe ser una cadena');
        }
        const descripcionAnterior = this.descripcion;
        this.descripcion = nuevaDescripcion;
        this.registrarCambio('ACTUALIZACION_DESCRIPCION',
            `Descripción actualizada de "${descripcionAnterior}" a "${nuevaDescripcion}"`);
    }

    actualizarModulo(nuevoModulo) {
        if (!nuevoModulo || typeof nuevoModulo !== 'string') {
            throw new Error('El módulo es requerido y debe ser una cadena');
        }
        const moduloAnterior = this.modulo;
        this.modulo = nuevoModulo;
        this.registrarCambio('ACTUALIZACION_MODULO',
            `Módulo actualizado de "${moduloAnterior}" a "${nuevoModulo}"`);
    }

    registrarCambio(tipo, descripcion) {
        this.historialCambios.push({
            tipo,
            fecha: new Date(),
            descripcion
        });
    }

    obtenerHistorialCambios(fechaInicio = null, fechaFin = null) {
        let historial = this.historialCambios;

        if (fechaInicio) {
            historial = historial.filter(h => h.fecha >= fechaInicio);
        }
        if (fechaFin) {
            historial = historial.filter(h => h.fecha <= fechaFin);
        }

        return historial;
    }

    toJSON() {
        return {
            id: this.id,
            codigo: this.codigo,
            descripcion: this.descripcion,
            modulo: this.modulo,
            activo: this.activo,
            fechaCreacion: this.fechaCreacion,
            ultimosCambios: this.historialCambios.slice(-5) // Últimos 5 cambios
        };
    }
}

module.exports = Permiso; 