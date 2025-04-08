const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TransporteRepository {
    constructor() {
        this.Vehiculo = sequelize.define('Vehiculo', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            placa: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            tipo: {
                type: DataTypes.ENUM('MIXER', 'BOMBA', 'CISTERNA'),
                allowNull: false
            },
            capacidad: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            conductor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM('DISPONIBLE', 'EN_RUTA', 'MANTENIMIENTO'),
                defaultValue: 'DISPONIBLE'
            },
            ultimaEntrega: {
                type: DataTypes.JSON,
                defaultValue: null
            },
            historialMantenimiento: {
                type: DataTypes.JSON,
                defaultValue: []
            }
        });

        this.Entrega = sequelize.define('Entrega', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            vehiculoId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Vehiculos',
                    key: 'id'
                }
            },
            ordenId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'OrdenesProduccion',
                    key: 'id'
                }
            },
            fechaEstimada: {
                type: DataTypes.DATE,
                allowNull: false
            },
            fechaReal: {
                type: DataTypes.DATE
            },
            estado: {
                type: DataTypes.ENUM('PENDIENTE', 'EN_CAMINO', 'COMPLETADA', 'CANCELADA'),
                defaultValue: 'PENDIENTE'
            },
            notas: {
                type: DataTypes.TEXT
            }
        });
    }

    // Métodos para Vehículos
    async crearVehiculo(vehiculo) {
        return await this.Vehiculo.create(vehiculo);
    }

    async obtenerVehiculoPorId(id) {
        return await this.Vehiculo.findByPk(id);
    }

    async obtenerTodosVehiculos() {
        return await this.Vehiculo.findAll();
    }

    async actualizarVehiculo(id, vehiculo) {
        return await this.Vehiculo.update(vehiculo, {
            where: { id }
        });
    }

    async eliminarVehiculo(id) {
        return await this.Vehiculo.destroy({
            where: { id }
        });
    }

    async actualizarEstadoVehiculo(id, estado) {
        return await this.Vehiculo.update({ estado }, {
            where: { id }
        });
    }

    async agregarMantenimiento(id, mantenimiento) {
        const vehiculo = await this.obtenerVehiculoPorId(id);
        if (vehiculo) {
            vehiculo.historialMantenimiento.push(mantenimiento);
            await vehiculo.save();
            return vehiculo;
        }
        return null;
    }

    // Métodos para Entregas
    async crearEntrega(entrega) {
        return await this.Entrega.create(entrega);
    }

    async obtenerEntregaPorId(id) {
        return await this.Entrega.findByPk(id);
    }

    async obtenerEntregasPorVehiculo(vehiculoId) {
        return await this.Entrega.findAll({
            where: { vehiculoId }
        });
    }

    async actualizarEntrega(id, entrega) {
        return await this.Entrega.update(entrega, {
            where: { id }
        });
    }

    async actualizarEstadoEntrega(id, estado) {
        return await this.Entrega.update({ estado }, {
            where: { id }
        });
    }

    async obtenerEntregasPendientes() {
        return await this.Entrega.findAll({
            where: { estado: 'PENDIENTE' }
        });
    }

    async sincronizar() {
        await this.Vehiculo.sync();
        await this.Entrega.sync();
    }
}

module.exports = TransporteRepository;