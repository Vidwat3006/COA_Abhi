// Initialize charts
const utilizationChart = new Chart(
    document.getElementById('utilizationChart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Utilization %',
                data: [],
                borderColor: '#3498db',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    }
);

const throughputChart = new Chart(
    document.getElementById('throughputChart'),
    {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Instructions/Cycle',
                data: [],
                borderColor: '#2ecc71',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);

const stallsChart = new Chart(
    document.getElementById('stallsChart'),
    {
        type: 'bar',
        data: {
            labels: ['Data Hazards', 'Control Hazards', 'Structural Hazards'],
            datasets: [{
                label: 'Stall Count',
                data: [0, 0, 0],
                backgroundColor: [
                    '#e74c3c',
                    '#f39c12',
                    '#9b59b6'
                ]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
);

const branchChart = new Chart(
    document.getElementById('branchChart'),
    {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                data: [0, 0],
                backgroundColor: [
                    '#2ecc71',
                    '#e74c3c'
                ]
            }]
        },
        options: {
            responsive: true
        }
    }
);

// Pipeline simulation
let simulationInterval;
let cycleCount = 0;
const stages = ['fetch', 'decode', 'execute', 'memory', 'writeback'];
let pipelineState = new Array(5).fill(null);

function updatePipelineVisualization() {
    stages.forEach((stage, index) => {
        const element = document.getElementById(stage);
        element.classList.remove('active', 'stalled');
        
        if (pipelineState[index]) {
            element.classList.add('active');
        }
    });
}

function simulatePipeline() {
    cycleCount++;
    
    // Update pipeline state
    for (let i = pipelineState.length - 1; i > 0; i--) {
        pipelineState[i] = pipelineState[i - 1];
    }
    
    // Randomly add new instruction to fetch stage
    if (Math.random() > 0.3) {
        pipelineState[0] = `I${cycleCount}`;
    } else {
        pipelineState[0] = null;
    }
    
    // Update metrics
    const utilization = (pipelineState.filter(x => x !== null).length / pipelineState.length) * 100;
    const throughput = pipelineState.filter(x => x !== null).length;
    
    // Update charts
    utilizationChart.data.labels.push(cycleCount);
    utilizationChart.data.datasets[0].data.push(utilization);
    utilizationChart.update();
    
    throughputChart.data.labels.push(cycleCount);
    throughputChart.data.datasets[0].data.push(throughput);
    throughputChart.update();
    
    // Randomly update stall counts
    stallsChart.data.datasets[0].data = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
    ];
    stallsChart.update();
    
    // Update branch prediction accuracy
    branchChart.data.datasets[0].data = [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 30)
    ];
    branchChart.update();
    
    updatePipelineVisualization();
}

// Event listeners for control buttons
document.getElementById('startSimulation').addEventListener('click', () => {
    if (!simulationInterval) {
        simulationInterval = setInterval(simulatePipeline, 1000);
    }
});

document.getElementById('pauseSimulation').addEventListener('click', () => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
    }
});

document.getElementById('resetSimulation').addEventListener('click', () => {
    if (simulationInterval) {
        clearInterval(simulationInterval);
        simulationInterval = null;
    }
    
    cycleCount = 0;
    pipelineState = new Array(5).fill(null);
    
    // Reset charts
    utilizationChart.data.labels = [];
    utilizationChart.data.datasets[0].data = [];
    utilizationChart.update();
    
    throughputChart.data.labels = [];
    throughputChart.data.datasets[0].data = [];
    throughputChart.update();
    
    stallsChart.data.datasets[0].data = [0, 0, 0];
    stallsChart.update();
    
    branchChart.data.datasets[0].data = [0, 0];
    branchChart.update();
    
    updatePipelineVisualization();
}); 