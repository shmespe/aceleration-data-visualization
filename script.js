// Espera a que la página se cargue completamente
window.onload = function() {
    // Ruta del archivo CSV en GitHub Pages
    const csvUrl = 'data.csv';

    // Utiliza PapaParse para leer el archivo CSV
    Papa.parse(csvUrl, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            // Almacena los datos procesados
            const timeData = results.data.map(row => row.time_ni);
            const accelData = results.data.map(row => row.acel_ni);

            // Llama a la función para graficar los datos
            createChart(timeData, accelData);
        },
        error: function(error) {
            console.error("Error al cargar el CSV: ", error);
        }
    });
};

// Función para crear la gráfica
function createChart(timeData, accelData) {
    const ctx = document.getElementById('accelerationChart').getContext('2d');

    // Crear el gráfico con Chart.js
    const accelerationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeData,  // Eje X: Tiempo
            datasets: [{
                label: 'Aceleración (g)',
                data: accelData,  // Eje Y: Aceleración
                borderColor: 'rgb(75, 192, 192)',  // Color de la línea
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (s)'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 20  // Limitar el número de etiquetas del eje X
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Aceleración (g)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem) {
                            return 'Aceleración: ' + tooltipItem.raw.toFixed(3) + ' g';
                        }
                    }
                }
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    enabled: true,
                    mode: 'xy',
                    speed: 0.1
                }
            }
        }
    });
}
