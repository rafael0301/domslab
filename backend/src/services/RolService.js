class RolService {
    constructor(rolRepository, permisoRepository) {
        this.rolRepository = rolRepository;
        this.permisoRepository = permisoRepository;
    }

    async asignarPermiso(rolId, permisoId) {
        const rol = await this.rolRepository.findById(rolId);
        const permiso = await this.permisoRepository.findById(permisoId);

        if (rol && permiso) {
            rol.asignarPermiso(permiso);
            return this.rolRepository.update(rolId, rol);
        }
        return null;
    }
}