function renderGanttChart(canvasId, ganttData) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Prepare data for Chart.js
    const labels = [];
    const data = [];
    const backgroundColors = [];
    
    // Find maximum time for scaling
    let maxTime = 0;
    ganttData.forEach(segment => {
        maxTime = Math.max(maxTime, segment.end);
        labels.push(`P${segment.pid}`);
        data.push({
            x: segment.start,
            x2: segment.end,
            y: `P${segment.pid}`
        });
        backgroundColors.push(getProcessColor(segment.pid));
    });
    
    // Create the chart
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [...new Set(labels)], // Unique process labels
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                borderColor: 'rgba(0, 0, 0, 0.8)',
                borderWidth: 1,
                barPercentage: 0.8,
                categoryPercentage: 0.8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: 0,
                    max: maxTime,
                    title: {
                        display: true,
                        text: 'Time',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        stepSize: 1
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Process',
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = context.raw;
                            return `P${context.label}: ${data.x} - ${data.x2}`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            parsing: {
                xAxisKey: 'x',
                yAxisKey: 'y'
            }
        }
    });
}