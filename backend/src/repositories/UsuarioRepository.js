class UsuarioRepository extends BaseRepository {
    constructor() {
        super(Usuario);
    }

    async findByEmail(email) {
        return this.items.find(u => u.email === email);
    }

    async validateCredentials(email, password) {
        const user = await this.findByEmail(email);
        return user && user.autenticar(email, password);
    }
}