class Cliente extends Persona {
    constructor(id, nombre, telefono, direccion, email) {
        super(id, nombre, telefono, direccion, email);
        this.historialCompras = [];
    }

    agregarCompra(venta) {
        this.historialCompras.push(venta);
    }

    obtenerHistorial() {
        return this.historialCompras;
    }

    calcularTotalCompras() {
        return this.historialCompras.reduce((total, venta) => total + venta.total, 0);
    }
}
