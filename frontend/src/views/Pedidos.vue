<template>
  <div class="space-y-6">
    <!-- Encabezado -->
    <section class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-text-primary">Gestión de Pedidos</h1>
      <button @click="abrirModal()" class="btn btn-primary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Nuevo Pedido
      </button>
    </section>

    <!-- Filtros -->
    <section class="card p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
          type="text"
          placeholder="Buscar por ID o Cliente..."
          class="input md:col-span-2"
          v-model="filtroBusqueda"
      >
      <select class="select" v-model="filtroEstado">
        <option value="">Todos los Estados</option>
        <option value="Pendiente">Pendiente</option>
        <option value="En Proceso">En Proceso</option>
        <option value="Despachado">Despachado</option>
        <option value="Completado">Completado</option>
        <option value="Cancelado">Cancelado</option>
      </select>
      <input
          type="date"
          class="input"
          v-model="filtroFecha"
      >
    </section>

    <!-- Tabla de Pedidos -->
    <section class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-border">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">ID Pedido</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Cliente</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Fecha Pedido</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Fecha Despacho Prog.</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Volumen Total (m³)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Monto Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Estado</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">Acciones</th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-border">
          <tr v-for="pedido in pedidosFiltrados" :key="pedido.id" class="hover:bg-secondary-light">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary hover:underline cursor-pointer" @click="verDetalle(pedido)">{{ pedido.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ clientes.find(c => c.id === pedido.clienteId)?.nombre || 'N/A' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ pedido.fechaPedido }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ pedido.fechaDespachoProg }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ calcularVolumenTotal(pedido.items) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">${{ calcularMontoTotal(pedido.items).toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                    :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    pedido.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                    pedido.estado === 'Despachado' ? 'bg-blue-100 text-blue-800' :
                    pedido.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                    pedido.estado === 'Pendiente' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800' // Cancelado
                  ]"
                >
                  {{ pedido.estado }}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
              <!-- Podríamos añadir un dropdown aquí con más acciones -->
              <button @click="abrirModal(pedido)" class="text-primary hover:text-primary-dark">Editar</button>
              <button v-if="pedido.estado === 'Pendiente'" @click="cancelarPedido(pedido.id)" class="text-red-600 hover:text-red-800">Cancelar</button>
            </td>
          </tr>
          <tr v-if="pedidosFiltrados.length === 0">
            <td colspan="8" class="px-6 py-12 text-center text-sm text-text-secondary">No se encontraron pedidos.</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto">
        <div class="flex justify-between items-center p-5 border-b border-border">
          <h3 class="text-lg font-semibold text-text-primary">{{ pedidoSeleccionado ? 'Editar Pedido' : 'Nuevo Pedido' }} <span v-if="pedidoSeleccionado" class="text-sm font-normal text-text-secondary">({{ pedidoSeleccionado.id }})</span></h3>
          <button @click="cerrarModal" class="text-text-secondary hover:text-text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <form @submit.prevent="guardarPedido">
          <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary">Cliente</label>
                <select v-model="formPedido.clienteId" required class="select">
                  <option disabled value="">Seleccione un cliente</option>
                  <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nombre }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary">Fecha Pedido</label>
                <input v-model="formPedido.fechaPedido" type="date" required class="input">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary">Fecha Despacho Prog.</label>
                <input v-model="formPedido.fechaDespachoProg" type="date" required class="input">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-secondary">Dirección de Entrega</label>
              <input v-model="formPedido.direccionEntrega" type="text" required class="input">
            </div>
            <hr class="my-4">
            <h4 class="text-md font-semibold text-text-primary mb-2">Items del Pedido</h4>
            <div v-for="(item, index) in formPedido.items" :key="index" class="grid grid-cols-12 gap-3 items-end border-b border-border pb-3 mb-3">
              <div class="col-span-6 md:col-span-5">
                <label class="block text-xs font-medium text-text-secondary">Tipo Concreto</label>
                <select v-model="item.tipoConcretoId" required class="select text-sm py-1.5">
                  <option disabled value="">Seleccione tipo</option>
                  <option v-for="tipo in tiposConcreto" :key="tipo.id" :value="tipo.id">
                    {{ tipo.nombre }} ({{ tipo.codigo }})
                  </option>
                </select>
              </div>
              <div class="col-span-3 md:col-span-2">
                <label class="block text-xs font-medium text-text-secondary">Vol. (m³)</label>
                <input v-model.number="item.volumen" type="number" min="0.5" step="0.1" required class="input text-sm py-1.5">
              </div>
              <div class="col-span-3 md:col-span-2">
                <label class="block text-xs font-medium text-text-secondary">Precio/m³</label>
                <input :value="getPrecioTipo(item.tipoConcretoId)" type="text" readonly class="input text-sm bg-gray-100 py-1.5">
              </div>
              <div class="col-span-12 md:col-span-2">
                <label class="block text-xs font-medium text-text-secondary">Subtotal</label>
                <input :value="(item.volumen * getPrecioTipo(item.tipoConcretoId)).toFixed(2)" type="text" readonly class="input text-sm bg-gray-100 py-1.5">
              </div>
              <div class="col-span-12 md:col-span-1 flex justify-end">
                <button type="button" @click="eliminarItem(index)" class="text-red-500 hover:text-red-700 p-1" title="Eliminar Item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <button type="button" @click="agregarItem" class="btn btn-secondary btn-sm">
              + Agregar Item
            </button>
            <hr class="my-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary">Estado del Pedido</label>
                <select v-model="formPedido.estado" required class="select">
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Despachado">Despachado</option>
                  <option value="Completado">Completado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div class="text-right mt-4 md:mt-0">
                <p class="text-sm text-text-secondary">Monto Total:</p>
                <p class="text-xl font-bold text-text-primary">${{ calcularMontoTotal(formPedido.items).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center p-5 border-t border-border space-x-3">
            <button type="button" @click="cerrarModal" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Pedido</button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Datos de ejemplo (Idealmente vendrían de stores/API) ---
const clientes = ref([
  { id: 1, nombre: 'Constructora XYZ' },
  { id: 2, nombre: 'Inversiones ABC' },
  { id: 3, nombre: 'Juan Rodríguez (Personal)' },
  { id: 4, nombre: 'Proyectos Delta' },
  { id: 5, nombre: 'Edificaciones Sol' },
  { id: 6, nombre: 'Grupo Omega' },
])

const tiposConcreto = ref([
  { id: 1, nombre: 'Hormigón H20', codigo: 'HE-H20', precio_m3: 85.50 },
  { id: 2, nombre: 'Hormigón H30', codigo: 'HE-H30', precio_m3: 95.00 },
  { id: 3, nombre: 'Mortero M5', codigo: 'MO-M5', precio_m3: 60.00 },
  { id: 4, nombre: 'Hormigón H25', codigo: 'HB-H25', precio_m3: 92.75 },
])

const pedidos = ref([
  { id: 'PED-00125', clienteId: 1, fechaPedido: '2024-04-05', fechaDespachoProg: '2024-04-08', estado: 'Completado', direccionEntrega: 'Obra Edificio Central', items: [{ tipoConcretoId: 4, volumen: 150 }] },
  { id: 'PED-00124', clienteId: 2, fechaPedido: '2024-04-05', fechaDespachoProg: '2024-04-07', estado: 'Completado', direccionEntrega: 'Proyecto Torre Alta', items: [{ tipoConcretoId: 2, volumen: 220 }] },
  { id: 'PED-00123', clienteId: 4, fechaPedido: '2024-04-06', fechaDespachoProg: '2024-04-09', estado: 'En Proceso', direccionEntrega: 'Condominio Los Pinos', items: [{ tipoConcretoId: 3, volumen: 50 }] },
  { id: 'PED-00122', clienteId: 5, fechaPedido: '2024-04-04', fechaDespachoProg: '2024-04-06', estado: 'Completado', direccionEntrega: 'Residencial El Sol, Etapa II', items: [{ tipoConcretoId: 1, volumen: 95 }] },
  { id: 'PED-00121', clienteId: 6, fechaPedido: '2024-04-03', fechaDespachoProg: '2024-04-05', estado: 'Completado', direccionEntrega: 'Plaza Comercial Omega', items: [{ tipoConcretoId: 4, volumen: 180 }] },
  { id: 'PED-00120', clienteId: 1, fechaPedido: '2024-04-02', fechaDespachoProg: '2024-04-04', estado: 'Cancelado', direccionEntrega: 'Obra Edificio Central', items: [{ tipoConcretoId: 1, volumen: 120 }] },
])
// --------------------------------------------------------------

const showModal = ref(false)
const pedidoSeleccionado = ref(null)
const filtroBusqueda = ref('')
const filtroEstado = ref('')
const filtroFecha = ref('')

const getInitialFormState = () => ({
  id: null,
  clienteId: '',
  fechaPedido: new Date().toISOString().split('T')[0], // Fecha actual por defecto
  fechaDespachoProg: '',
  estado: 'Pendiente',
  direccionEntrega: '',
  items: [{ tipoConcretoId: '', volumen: 1 }]
})

const formPedido = ref(getInitialFormState())

const getPrecioTipo = (tipoId) => {
  const tipo = tiposConcreto.value.find(t => t.id === tipoId)
  return tipo ? tipo.precio_m3 : 0
}

const calcularVolumenTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.volumen || 0), 0)
}

const calcularMontoTotal = (items) => {
  return items.reduce((sum, item) => {
    const precio = getPrecioTipo(item.tipoConcretoId)
    return sum + (item.volumen || 0) * precio
  }, 0)
}

const pedidosFiltrados = computed(() => {
  return pedidos.value.filter(p => {
    const search = filtroBusqueda.value.toLowerCase()
    const cliente = clientes.value.find(c => c.id === p.clienteId)
    const matchSearch = !search || p.id.toLowerCase().includes(search) || (cliente && cliente.nombre.toLowerCase().includes(search))
    const matchEstado = !filtroEstado.value || p.estado === filtroEstado.value
    const matchFecha = !filtroFecha.value || p.fechaPedido === filtroFecha.value || p.fechaDespachoProg === filtroFecha.value
    return matchSearch && matchEstado && matchFecha
  }).sort((a, b) => new Date(b.fechaPedido) - new Date(a.fechaPedido)) // Ordenar por fecha pedido descendente
})

const abrirModal = (pedido = null) => {
  if (pedido) {
    pedidoSeleccionado.value = pedido
    formPedido.value = JSON.parse(JSON.stringify(pedido)) // Deep copy para edición
  } else {
    pedidoSeleccionado.value = null
    formPedido.value = getInitialFormState()
  }
  showModal.value = true
}

const cerrarModal = () => {
  showModal.value = false
  setTimeout(() => {
    pedidoSeleccionado.value = null
    formPedido.value = getInitialFormState()
  }, 300)
}

const agregarItem = () => {
  formPedido.value.items.push({ tipoConcretoId: '', volumen: 1 })
}

const eliminarItem = (index) => {
  if(formPedido.value.items.length > 1) {
    formPedido.value.items.splice(index, 1)
  } else {
    alert("Un pedido debe tener al menos un item.") // O manejo más sofisticado
  }
}

const guardarPedido = () => {
  if (pedidoSeleccionado.value) {
    const index = pedidos.value.findIndex(p => p.id === pedidoSeleccionado.value.id)
    if (index !== -1) pedidos.value[index] = { ...formPedido.value }
  } else {
    const newId = `PED-${String(pedidos.value.length + 126).padStart(5, '0')}` // Simulación de ID
    pedidos.value.unshift({ ...formPedido.value, id: newId }) // Añadir al principio
  }
  cerrarModal()
}

const cancelarPedido = (id) => {
  if (confirm('¿Estás seguro de cancelar este pedido?')) {
    const index = pedidos.value.findIndex(p => p.id === id)
    if (index !== -1) pedidos.value[index].estado = 'Cancelado'
    // Llamada API para cancelar
  }
}

const verDetalle = (pedido) => {
  // Implementar lógica para mostrar detalle (ej: abrir modal en modo lectura o ir a otra ruta)
  console.log("Ver detalle:", pedido)
  abrirModal(pedido) // Por ahora, reusamos el modal de edición
}

</script>

<style scoped>
/* Estilos modal */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>