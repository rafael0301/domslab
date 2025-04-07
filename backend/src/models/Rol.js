class Rol {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
        this.permisos = []; // Lista<Permiso>
    }

    asignarPermiso(permiso) {
        this.permisos.push(permiso);
    }

    revocarPermiso(permisoId) {
        this.permisos = this.permisos.filter(p => p.id !== permisoId);
    }

    verificarPermiso(permisoId) {
        return this.permisos.some(p => p.id === permisoId);
    }
}
