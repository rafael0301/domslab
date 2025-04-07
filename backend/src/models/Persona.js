class Persona {
    constructor(id, nombre, telefono, direccion, email) {
        this.id = id;
        this.nombre = nombre;
        this.telefono = telefono;
        this.direccion = direccion;
        this.email = email;
    }

    actualizarDatos(nombre, telefono, direccion) {
        this.nombre = nombre || this.nombre;
        this.telefono = telefono || this.telefono;
        this.direccion = direccion || this.direccion;
    }
}