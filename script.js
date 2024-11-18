// Función para cargar el archivo CSV y procesar los datos
async function fetchCSV() {
  const response = await fetch('aceleracion.csv');
  const data = await response.text();
  processData(data);
}

// Función para procesar el CSV y graficar los datos
function processData(csv) {
  const rows = csv.split('\n');
  const labels = [];
  const accelerations = [];

  // Saltarse la cabecera del CSV
  rows.slice(1).forEach(row => {
    const cols = row.split(',');
    if (cols.length > 1) {
      labels.push(cols[0]); // Asumiendo que la primera columna es tiempo
      accelerations.push(parseFloat(cols[1])); // Asumiendo que la segunda columna es aceleración
    }
  });

  // Crear la gráfica
  const ctx = document.getElementById('acelerationChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels, // Los tiempos
      datasets: [{
        label: 'Aceleración (g)',
        data: accelerations, // Los datos de aceleración
        borderColor: 'rgb(75, 192, 192)',
        fill: false
      }]
    },
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  });
}

// Llamada a la función para cargar el CSV
fetchCSV();
