const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class InventarioRepository {
    constructor() {
        this.Material = sequelize.define('Material', {
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
            cantidad: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            },
            unidad: {
                type: DataTypes.STRING,
                allowNull: false
            },
            stockMinimo: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            stockMaximo: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            ubicacion: {
                type: DataTypes.STRING
            },
            proveedorId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Proveedores',
                    key: 'id'
                }
            }
        });
    }

    async crear(material) {
        return await this.Material.create(material);
    }

    async obtenerPorId(id) {
        return await this.Material.findByPk(id);
    }

    async obtenerTodos() {
        return await this.Material.findAll();
    }

    async actualizar(id, material) {
        return await this.Material.update(material, {
            where: { id }
        });
    }

    async eliminar(id) {
        return await this.Material.destroy({
            where: { id }
        });
    }

    async actualizarStock(id, cantidad) {
        const material = await this.obtenerPorId(id);
        if (material) {
            material.cantidad += cantidad;
            await material.save();
            return material;
        }
        return null;
    }

    async obtenerMaterialesBajoStock() {
        return await this.Material.findAll({
            where: {
                cantidad: {
                    [sequelize.Op.lte]: sequelize.col('stockMinimo')
                }
            }
        });
    }

    async obtenerMaterialesPorProveedor(proveedorId) {
        return await this.Material.findAll({
            where: { proveedorId }
        });
    }

    async sincronizar() {
        await this.Material.sync();
    }
}

module.exports = InventarioRepository;
