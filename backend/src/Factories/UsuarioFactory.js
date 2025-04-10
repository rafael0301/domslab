class UsuarioFactory {
    static crearUsuario(tipo, datos) {
        switch(tipo) {
            case 'CLIENTE':
                return new Cliente(
                    datos.id,
                    datos.nombre,
                    datos.telefono,
                    datos.direccion,
                    datos.email
                );
            case 'PROVEEDOR':
                return new Proveedor(
                    datos.id,
                    datos.nombre,
                    datos.telefono,
                    datos.direccion,
                    datos.email,
                    datos.contacto
                );
            case 'EMPLEADO':
                return new Empleado(
                    datos.id,
                    datos.nombre,
                    datos.telefono,
                    datos.direccion,
                    datos.email,
                    datos.cargo,
                    datos.salario,
                    datos.horasTrabajadas,
                    datos.especialidad,
                    datos.ubicacionTrabajo
                );
            default:
                throw new Error('Tipo de usuario no soportado');
        }
    }
}

module.exports = UsuarioFactory;