class Usuario {
    constructor(id, email, password, rolId) {
        this.id = id;
        this.email = email;
        this.password = password; // En producción debería ser hash
        this.rolId = rolId;
    }

    autenticar(email, password) {
        return this.email === email && this.password === password;
    }

    recuperarPassword(email) {
        return Math.random().toString(36).substring(7);
    }

    agregarMetodoPago(metodo) {
    }

    realizarPago(transaccion) {
        return true;
    }

    cambiarRol(nuevoRolId) {
        this.rolId = nuevoRolId;
    }

    editarPerfil(nombre, email) {
        this.email = email || this.email;
    }
}