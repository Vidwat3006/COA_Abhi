# CPU Pipeline Performance Dashboard

A web-based dashboard for visualizing CPU pipeline performance metrics and pipeline stages in real-time.

## Features

- Real-time pipeline stage visualization
- Performance metrics including:
  - Pipeline utilization
  - Instruction throughput
  - Pipeline stalls (data, control, and structural hazards)
  - Branch prediction accuracy
- Interactive controls for simulation
- Responsive design

## How to Use

1. Open `index.html` in a web browser
2. Use the control buttons to:
   - Start the pipeline simulation
   - Pause the simulation
   - Reset the simulation

## Metrics Explained

- **Pipeline Utilization**: Shows the percentage of pipeline stages being used at any given time
- **Instruction Throughput**: Displays the number of instructions being processed per cycle
- **Pipeline Stalls**: Visualizes different types of pipeline hazards:
  - Data Hazards: When instructions depend on results from previous instructions
  - Control Hazards: Caused by branch instructions
  - Structural Hazards: When multiple instructions need the same resource
- **Branch Prediction Accuracy**: Shows the ratio of correct to incorrect branch predictions

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Chart.js for data visualization

## Browser Compatibility

The dashboard is compatible with modern web browsers including:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari 