class UsuarioService {
    constructor(usuarioRepository, rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
    }

    async autenticar(email, password) {
        return this.usuarioRepository.validateCredentials(email, password);
    }

    async crearUsuario(userData) {
        return this.usuarioRepository.create(userData);
    }

    async cambiarRol(userId, rolId) {
        const usuario = await this.usuarioRepository.findById(userId);
        const rol = await this.rolRepository.findById(rolId);

        if (usuario && rol) {
            usuario.cambiarRol(rolId);
            return this.usuarioRepository.update(userId, usuario);
        }
        return null;
    }
}