const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TipoConcretoRepository {
    constructor() {
        this.TipoConcreto = sequelize.define('TipoConcreto', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.TEXT
            },
            resistencia: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            precio: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            composicion: {
                type: DataTypes.JSON,
                allowNull: false,
                defaultValue: {}
            },
            ventas: {
                type: DataTypes.FLOAT,
                defaultValue: 0
            }
        });
    }

    async crear(tipoConcreto) {
        return await this.TipoConcreto.create(tipoConcreto);
    }

    async obtenerPorId(id) {
        return await this.TipoConcreto.findByPk(id);
    }

    async obtenerTodos() {
        return await this.TipoConcreto.findAll();
    }

    async actualizar(id, tipoConcreto) {
        return await this.TipoConcreto.update(tipoConcreto, {
            where: { id }
        });
    }

    async eliminar(id) {
        return await this.TipoConcreto.destroy({
            where: { id }
        });
    }

    async actualizarVentas(id, cantidad) {
        const tipoConcreto = await this.obtenerPorId(id);
        if (tipoConcreto) {
            tipoConcreto.ventas += cantidad;
            await tipoConcreto.save();
            return tipoConcreto;
        }
        return null;
    }

    async obtenerMasVendidos(limite = 5) {
        return await this.TipoConcreto.findAll({
            order: [['ventas', 'DESC']],
            limit: limite
        });
    }

    async obtenerPorResistencia(resistencia) {
        return await this.TipoConcreto.findAll({
            where: { resistencia }
        });
    }

    async sincronizar() {
        await this.TipoConcreto.sync();
    }
}

module.exports = TipoConcretoRepository;