const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class OrdenProduccionRepository {
    constructor() {
        this.OrdenProduccion = sequelize.define('OrdenProduccion', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            clienteId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Clientes',
                    key: 'id'
                },
                allowNull: false
            },
            tipoConcretoId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'TiposConcreto',
                    key: 'id'
                },
                allowNull: false
            },
            cantidad: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM('PENDIENTE', 'EN_PROCESO', 'COMPLETADA', 'CANCELADA'),
                defaultValue: 'PENDIENTE'
            },
            fecha: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            fechaEntrega: {
                type: DataTypes.DATE,
                allowNull: false
            },
            tiempoEstimado: {
                type: DataTypes.INTEGER, // en minutos
                allowNull: false
            },
            tiempoTranscurrido: {
                type: DataTypes.INTEGER, // en minutos
                defaultValue: 0
            },
            notas: {
                type: DataTypes.TEXT
            }
        });
    }

    async crear(orden) {
        return await this.OrdenProduccion.create(orden);
    }

    async obtenerPorId(id) {
        return await this.OrdenProduccion.findByPk(id);
    }

    async obtenerTodos() {
        return await this.OrdenProduccion.findAll();
    }

    async actualizar(id, orden) {
        return await this.OrdenProduccion.update(orden, {
            where: { id }
        });
    }

    async eliminar(id) {
        return await this.OrdenProduccion.destroy({
            where: { id }
        });
    }

    async actualizarEstado(id, estado) {
        return await this.OrdenProduccion.update({ estado }, {
            where: { id }
        });
    }

    async actualizarTiempoTranscurrido(id, minutos) {
        const orden = await this.obtenerPorId(id);
        if (orden) {
            orden.tiempoTranscurrido += minutos;
            await orden.save();
            return orden;
        }
        return null;
    }

    async obtenerOrdenesPendientes() {
        return await this.OrdenProduccion.findAll({
            where: { estado: 'PENDIENTE' }
        });
    }

    async obtenerOrdenesEnProceso() {
        return await this.OrdenProduccion.findAll({
            where: { estado: 'EN_PROCESO' }
        });
    }

    async obtenerOrdenesPorCliente(clienteId) {
        return await this.OrdenProduccion.findAll({
            where: { clienteId }
        });
    }

    async obtenerOrdenesPorTipoConcreto(tipoConcretoId) {
        return await this.OrdenProduccion.findAll({
            where: { tipoConcretoId }
        });
    }

    async obtenerOrdenesPorFecha(fechaInicio, fechaFin) {
        return await this.OrdenProduccion.findAll({
            where: {
                fecha: {
                    [sequelize.Op.between]: [fechaInicio, fechaFin]
                }
            }
        });
    }

    async sincronizar() {
        await this.OrdenProduccion.sync();
    }
}

module.exports = OrdenProduccionRepository;