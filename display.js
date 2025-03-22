function displayResults(results) {
    const outputSection = document.getElementById('output-section');
    const resultsContainer = document.getElementById('results-container');
    
    resultsContainer.innerHTML = '';
    outputSection.classList.remove('hidden');
    
    for (const [algorithm, result] of Object.entries(results)) {
        const algorithmDiv = document.createElement('div');
        algorithmDiv.className = 'card';
        
        // Algorithm title
        const title = document.createElement('h3');
        title.textContent = algorithm;
        algorithmDiv.appendChild(title);
        
        // Process table
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Process</th>
                    <th>Arrival Time</th>
                    <th>Burst Time</th>
                    <th>Priority</th>
                    <th>Start Time</th>
                    <th>Completion Time</th>
                    <th>Turnaround Time</th>
                    <th>Waiting Time</th>
                </tr>
            </thead>
            <tbody id="${algorithm.toLowerCase().replace(' ', '-')}-table">
            </tbody>
        `;
        
        const tbody = table.querySelector('tbody');
        result.processes.forEach(proc => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>P${proc.pid}</td>
                <td>${proc.arrival}</td>
                <td>${proc.burst}</td>
                <td>${proc.priority}</td>
                <td>${proc.start}</td>
                <td>${proc.completion}</td>
                <td>${proc.turnaround}</td>
                <td>${proc.waiting}</td>
            `;
            tbody.appendChild(row);
        });
        
        algorithmDiv.appendChild(table);
        
        // Metrics
        const metricsDiv = document.createElement('div');
        metricsDiv.className = 'metrics';
        metricsDiv.innerHTML = `
            <div class="metric-card">
                <div>Average Turnaround Time</div>
                <div class="metric-value">${result.avgTurnaround.toFixed(2)}</div>
            </div>
            <div class="metric-card">
                <div>Average Waiting Time</div>
                <div class="metric-value">${result.avgWaiting.toFixed(2)}</div>
            </div>
        `;
        algorithmDiv.appendChild(metricsDiv);
        
        // Gantt chart
        const ganttDiv = document.createElement('div');
        ganttDiv.innerHTML = `<h3>Gantt Chart</h3>`;
        
        const container = document.createElement('div');
        container.className = 'gantt-container';
        
        const canvas = document.createElement('canvas');
        canvas.className = 'gantt-chart';
        canvas.id = `${algorithm.toLowerCase().replace(' ', '-')}-gantt`;
        container.appendChild(canvas);
        ganttDiv.appendChild(container);
        algorithmDiv.appendChild(ganttDiv);
        
        resultsContainer.appendChild(algorithmDiv);
        
        // Render Gantt chart
        renderGanttChart(algorithm.toLowerCase().replace(' ', '-') + '-gantt', result.gantt);
    }
}