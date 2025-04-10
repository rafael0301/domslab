<template>
  <div class="space-y-8">
    <section>
      <h2 class="text-xl font-semibold text-text-primary mb-4">Métricas Clave</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary truncate">Volumen Despachado</p>
              <p class="text-lg font-semibold text-text-primary">12,450 m³</p>
              <p class="text-xs text-green-600">↑ 8%</p>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-green-100 rounded-md p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary truncate">Pedidos Completados</p>
              <p class="text-lg font-semibold text-text-primary">87</p>
              <p class="text-xs text-green-600">↑ 5</p>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary truncate">Clientes Activos</p>
              <p class="text-lg font-semibold text-text-primary">124</p>
              <p class="text-xs text-green-600">+ 3</p>
            </div>
          </div>
        </div>
        <div class="card p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-red-100 rounded-md p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-text-secondary truncate">Eficiencia Despacho</p>
              <p class="text-lg font-semibold text-text-primary">98.5%</p>
              <p class="text-xs text-red-600">↓ 0.5%</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-6">
        <div class="card">
          <div class="p-6">
            <h3 class="text-lg font-medium text-text-primary mb-4">Volumen Despachado por Mes (m³)</h3>
            <div class="h-72">
              <canvas ref="volumenMensualChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="px-6 py-4 border-b border-border flex justify-between items-center">
            <h3 class="text-lg font-medium text-text-primary">Últimos Pedidos</h3>
            <router-link to="/pedidos" class="text-sm text-primary hover:underline">Ver todos</router-link>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-border">
              <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">ID Pedido</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Cliente</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Tipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Vol.</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Fecha</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Estado</th>
              </tr>
              </thead>
              <tbody class="bg-white divide-y divide-border">
              <tr v-for="pedido in ultimosPedidosMostrados" :key="pedido.id" class="hover:bg-secondary-light">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{{ pedido.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary text-truncate" style="max-width: 150px;">{{ pedido.cliente }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ pedido.tipo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ pedido.volumen }} m³</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ pedido.fecha }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                        :class="[
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                        pedido.estado === 'Completado' ? 'bg-green-100 text-green-800' :
                        pedido.estado === 'En Proceso' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      ]"
                    >
                      {{ pedido.estado }}
                    </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="lg:col-span-1 space-y-6">
        <div class="card">
          <div class="p-6">
            <h3 class="text-lg font-medium text-text-primary mb-4">Distribución por Tipo</h3>
            <div class="h-72 flex items-center justify-center">
              <canvas ref="tiposConcretoChart"></canvas>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <h3 class="text-lg font-medium text-text-primary mb-4">Accesos Rápidos</h3>
          <div class="space-y-3">
            <button class="w-full btn btn-primary">Nuevo Pedido</button>
            <button class="w-full btn btn-secondary">Registrar Cliente</button>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns'

const volumenMensualChart = ref(null)
const tiposConcretoChart = ref(null)
let chartVolumen = null
let chartTipos = null

const ultimosPedidos = ref([
  { id: 'PED-00125', cliente: 'Constructora XYZ', tipo: 'H25', volumen: '150', fecha: '2024-04-08', estado: 'Completado' },
  { id: 'PED-00124', cliente: 'Inversiones ABC', tipo: 'H30 Bomb.', volumen: '220', fecha: '2024-04-07', estado: 'Completado' },
  { id: 'PED-00123', cliente: 'Proyectos Delta', tipo: 'M5', volumen: '50', fecha: '2024-04-09', estado: 'En Proceso' },
  { id: 'PED-00122', cliente: 'Edificaciones Sol', tipo: 'H20', volumen: '95', fecha: '2024-04-06', estado: 'Completado' },
  { id: 'PED-00121', cliente: 'Grupo Omega', tipo: 'H25', volumen: '180', fecha: '2024-04-05', estado: 'Completado' },
  { id: 'PED-00120', cliente: 'Constructora XYZ', tipo: 'H20', volumen: '120', fecha: '2024-04-04', estado: 'Completado' },
])

const ultimosPedidosMostrados = computed(() => ultimosPedidos.value.slice(0, 5))

const createCharts = () => {
  const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom', 
        labels: {
          color: '#374151' 
        }
      }
    }
  }

  if (volumenMensualChart.value) {
    chartVolumen = new Chart(volumenMensualChart.value, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Volumen (m³)',
          data: [8500, 9200, 11050, 10800, 12450, 13100],
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 1,
          borderRadius: 4,
        }]
      },
      options: {
        ...chartOptionsBase,
        plugins: { legend: { display: false } }, 
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e5e7eb' },
            ticks: { color: '#6b7280' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#6b7280' }
          }
        }
      }
    })
  }

  if (tiposConcretoChart.value) {
    chartTipos = new Chart(tiposConcretoChart.value, {
      type: 'doughnut',
      data: {
        labels: ['H20', 'H25', 'H30', 'Morteros', 'Otros'],
        datasets: [{
          data: [25, 35, 20, 15, 5],
          backgroundColor: [
            '#60a5fa', 
            '#2563eb', 
            '#1d4ed8', 
            '#93c5fd', 
            '#dbeafe'  
          ],
          borderColor: '#ffffff',
          borderWidth: 2,
        }]
      },
      options: { ...chartOptionsBase, cutout: '60%' } 
    })
  }
}

const destroyCharts = () => {
  if (chartVolumen) chartVolumen.destroy()
  if (chartTipos) chartTipos.destroy()
  chartVolumen = null
  chartTipos = null
}

onMounted(() => {
  createCharts()
})

</script>

<style scoped>
section + section {
  margin-top: 2.5rem; 
}
</style>