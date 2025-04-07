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
        // Simulación de recuperación de contraseña
        return Math.random().toString(36).substring(7);
    }

    agregarMetodoPago(metodo) {
        // Lógica para agregar método de pago
    }

    realizarPago(transaccion) {
        // Lógica para procesar un pago
        return true;
    }

    cambiarRol(nuevoRolId) {
        this.rolId = nuevoRolId;
    }

    editarPerfil(nombre, email) {
        this.email = email || this.email;
        // Si el usuario tiene referencia a Persona, actualizaría su nombre
    }
}