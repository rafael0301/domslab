<template>
  <div class="space-y-8">
    <!-- Encabezado y Filtros -->
    <section class="md:flex justify-between items-center space-y-4 md:space-y-0">
      <h1 class="text-2xl font-semibold text-text-primary">Reportes y Análisis</h1>
      <div class="flex items-center space-x-4">
        <select class="select w-48">
          <option>Últimos 30 días</option>
          <option>Últimos 90 días</option>
          <option>Este año</option>
          <option>Año pasado</option>
        </select>
        <button class="btn btn-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm4 6a1 1 0 10-2 0v4a1 1 0 102 0V8zm2-3a1 1 0 011 1v5a1 1 0 11-2 0V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Exportar
        </button>
      </div>
    </section>

    <!-- Resumen de Métricas de Reporte -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card p-5">
        <p class="text-sm font-medium text-text-secondary">Ingresos Totales (Periodo)</p>
        <p class="text-2xl font-semibold text-text-primary mt-1">$158,340.50</p>
        <p class="text-xs text-green-600 mt-1">↑ 15% vs periodo anterior</p>
      </div>
      <div class="card p-5">
        <p class="text-sm font-medium text-text-secondary">Volumen Promedio / Pedido</p>
        <p class="text-2xl font-semibold text-text-primary mt-1">18.5 m³</p>
        <p class="text-xs text-green-600 mt-1">↑ 1.2 m³</p>
      </div>
      <div class="card p-5">
        <p class="text-sm font-medium text-text-secondary">Tipo Concreto Más Pedido</p>
        <p class="text-2xl font-semibold text-text-primary mt-1">H25</p>
        <p class="text-xs text-text-secondary mt-1">(45% del volumen total)</p>
      </div>
      <div class="card p-5">
        <p class="text-sm font-medium text-text-secondary">Cliente Principal (Volumen)</p>
        <p class="text-2xl font-semibold text-text-primary mt-1">Constructora XYZ</p>
        <p class="text-xs text-text-secondary mt-1">(2,850 m³)</p>
      </div>
    </section>

    <!-- Gráficos de Reporte -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico Tendencia Ingresos/Volumen -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-text-primary mb-4">Tendencia de Ingresos y Volumen</h3>
          <div class="h-80">
            <canvas ref="tendenciaChart"></canvas>
          </div>
        </div>
      </div>
      <!-- Gráfico Distribución por Cliente -->
      <div class="card">
        <div class="p-6">
          <h3 class="text-lg font-medium text-text-primary mb-4">Distribución de Volumen por Cliente (Top 5)</h3>
          <div class="h-80">
            <canvas ref="clientesChart"></canvas>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabla de Datos (Ej: Resumen por Tipo) -->
    <section class="card">
      <div class="px-6 py-4 border-b border-border">
        <h3 class="text-lg font-medium text-text-primary">Resumen por Tipo de Concreto (Periodo)</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-border">
          <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Tipo Concreto</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Volumen Total (m³)</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Nº Pedidos</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Ingreso Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">% Ingreso Total</th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-border">
          <tr v-for="item in resumenTipos" :key="item.tipo" class="hover:bg-secondary-light">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">{{ item.tipo }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ item.volumen }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ item.numPedidos }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">${{ item.ingreso.toFixed(2) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{{ item.porcentajeIngreso }}%</td>
          </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const tendenciaChart = ref(null)
const clientesChart = ref(null)
let chartTendencia = null
let chartClientes = null

// Datos de ejemplo para tabla
const resumenTipos = ref([
  { tipo: 'H25', volumen: 4500, numPedidos: 85, ingreso: 420750.00, porcentajeIngreso: 45 },
  { tipo: 'H20', volumen: 3200, numPedidos: 60, ingreso: 273600.00, porcentajeIngreso: 29 },
  { tipo: 'H30', volumen: 2800, numPedidos: 40, ingreso: 266000.00, porcentajeIngreso: 28 },
  { tipo: 'Mortero M5', volumen: 1500, numPedidos: 35, ingreso: 90000.00, porcentajeIngreso: 10 },
])

const createCharts = () => {
  const chartOptionsBase = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#374151' }
      }
    },
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

  // Gráfico Tendencia
  if (tendenciaChart.value) {
    chartTendencia = new Chart(tendenciaChart.value, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], // Periodo seleccionado
        datasets: [
          {
            label: 'Ingresos ($)',
            data: [85000, 92000, 110500, 108000, 124500, 131000],
            borderColor: '#2563eb', // primary
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            tension: 0.1,
            fill: true,
            yAxisID: 'y-ingresos' // Asociar al eje Y de ingresos
          },
          {
            label: 'Volumen (m³)',
            data: [850, 920, 1105, 1080, 1245, 1310], // Escala diferente
            borderColor: '#6b7280', // text-secondary
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            tension: 0.1,
            fill: false, // Sin relleno para la línea de volumen
            yAxisID: 'y-volumen' // Asociar al eje Y de volumen
          }
        ]
      },
      options: {
        ...chartOptionsBase,
        scales: {
          x: chartOptionsBase.scales.x,
          'y-ingresos': {
            type: 'linear',
            display: true,
            position: 'left',
            title: { display: true, text: 'Ingresos ($)', color: '#2563eb' },
            grid: { drawOnChartArea: false }, // Solo cuadrícula para un eje
            ticks: { color: '#2563eb' }
          },
          'y-volumen': {
            type: 'linear',
            display: true,
            position: 'right',
            title: { display: true, text: 'Volumen (m³)', color: '#6b7280' },
            grid: { drawOnChartArea: false }, // Evitar doble cuadrícula
            ticks: { color: '#6b7280' }
          }
        }
      }
    })
  }

  // Gráfico Clientes
  if (clientesChart.value) {
    chartClientes = new Chart(clientesChart.value, {
      type: 'bar',
      data: {
        labels: ['Constr. XYZ', 'Inv. ABC', 'Proy. Delta', 'Edif. Sol', 'Grupo Omega'],
        datasets: [{
          label: 'Volumen (m³)',
          data: [2850, 2100, 1800, 1550, 1200],
          backgroundColor: [
            'rgba(37, 99, 235, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(96, 165, 250, 0.7)',
            'rgba(147, 197, 253, 0.7)',
            'rgba(191, 219, 254, 0.7)'
          ],
          borderRadius: 4
        }]
      },
      options: {
        ...chartOptionsBase,
        indexAxis: 'y', // Barras horizontales para mejor legibilidad de nombres
        plugins: { legend: { display: false } }
      }
    })
  }
}

const destroyCharts = () => {
  if (chartTendencia) chartTendencia.destroy()
  if (chartClientes) chartClientes.destroy()
}

onMounted(() => {
  createCharts()
})

// Falta lógica para exportar y cambiar periodo

</script>

<style scoped>
/* Puedes añadir estilos específicos si lo necesitas */
</style>