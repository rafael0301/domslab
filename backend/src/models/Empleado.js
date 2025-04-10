class Empleado extends Persona {
    constructor(id, nombre, telefono, direccion, email, cargo, salario, horasTrabajadas, especialidad, ubicacionTrabajo) {
        super(id, nombre, telefono, direccion, email);
        this.cargo = cargo;
        this.salario = salario;
        this.horasTrabajadas = horasTrabajadas;
        this.especialidad = especialidad;
        this.ubicacionTrabajo = ubicacionTrabajo;
    }

    registrarHoras(horas) {
        this.horasTrabajadas += horas;
        return this.horasTrabajadas;
    }

    calcularHorasExtra() {
        const HORAS_ESTANDAR = 40;
        return Math.max(0, this.horasTrabajadas - HORAS_ESTANDAR);
    }

    asignarOrden(orden) {
    }
}