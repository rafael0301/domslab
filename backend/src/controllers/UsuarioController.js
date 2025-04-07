class UsuarioController {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Express handler para login
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const authenticated = await this.usuarioService.autenticar(email, password);
            if (authenticated) {
                // Genera token JWT o establece sesión
                res.status(200).json({ success: true, message: 'Login exitoso' });
            } else {
                res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Express handler para recuperar contraseña
    async recuperarPassword(req, res) {
        const { email } = req.body;
        try {
            // Implementación real enviaría un email
            const newPassword = Math.random().toString(36).substring(7);
            res.status(200).json({ success: true, message: 'Se ha enviado un correo para recuperar contraseña' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}