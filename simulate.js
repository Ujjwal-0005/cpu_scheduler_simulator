function simulate() {
    // Collect process data
    const processes = [];
    const processInputs = document.querySelectorAll('.process-input');
    
    processInputs.forEach((process, index) => {
        const arrival = parseInt(process.querySelector('.arrival').value) || 0;
        const burst = parseInt(process.querySelector('.burst').value) || 1;
        const priority = parseInt(process.querySelector('.priority').value) || 1;
        
        processes.push({
            pid: index + 1,
            arrival: arrival,
            burst: burst,
            priority: priority
        });
    });
    
    const timeQuantum = parseInt(document.getElementById('time-quantum').value) || 2;
    const algorithm = document.getElementById('algorithm').value;
    
    // Call appropriate scheduling algorithms
    const results = {};
    
    if (algorithm === 'fcfs' || algorithm === 'all') {
        results['FCFS'] = fcfs([...processes]);
    }
    if (algorithm === 'sjf' || algorithm === 'all') {
        results['SJF'] = sjf([...processes]);
    }
    if (algorithm === 'rr' || algorithm === 'all') {
        results['Round Robin'] = roundRobin([...processes], timeQuantum);
    }
    if (algorithm === 'priority' || algorithm === 'all') {
        results['Priority'] = priorityScheduling([...processes]);
    }
    
    // Display results
    displayResults(results);
}