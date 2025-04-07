class Proveedor extends Persona {
    constructor(id, nombre, telefono, direccion, email, contacto) {
        super(id, nombre, telefono, direccion, email);
        this.contacto = contacto;
        this.materialProvisto = []; // Lista<Material>
    }

    agregarMaterial(material) {
        this.materialProvisto.push(material);
    }

    generarOrdenCompra(materiales, fecha) {
        return new OrdenCompra(Date.now(), materiales, this.id, fecha);
    }
}