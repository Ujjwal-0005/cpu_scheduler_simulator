function roundRobin(processes, timeQuantum) {
    // Sort by arrival time
    processes.sort((a, b) => a.arrival - b.arrival);
    
    let currentTime = 0;
    const completed = [];
    const gantt = [];
    const queue = [];
    const remainingBurst = processes.map(proc => proc.burst);
    
    // Initialize queue with processes that arrive at time 0
    for (const proc of processes) {
        if (proc.arrival <= currentTime) {
            queue.push(proc.pid - 1); // Store indices
        }
    }
    
    while (completed.length < processes.length) {
        if (queue.length === 0) {
            currentTime++;
            // Check if any new processes arrived during idle time
            for (const proc of processes) {
                if (proc.arrival === currentTime && !queue.includes(proc.pid - 1) && !completed.includes(proc.pid - 1)) {
                    queue.push(proc.pid - 1);
                }
            }
            continue;
        }
        
        const currentIdx = queue.shift();
        const currentProc = processes[currentIdx];
        
        const startTime = currentTime;
        const execTime = Math.min(timeQuantum, remainingBurst[currentIdx]);
        
        gantt.push({
            pid: currentProc.pid,
            start: startTime,
            end: startTime + execTime
        });
        
        remainingBurst[currentIdx] -= execTime;
        currentTime += execTime;
        
        // Check for newly arrived processes during execution
        for (const proc of processes) {
            if (proc.arrival > startTime && proc.arrival <= currentTime && 
                !queue.includes(proc.pid - 1) && !completed.includes(proc.pid - 1)) {
                queue.push(proc.pid - 1);
            }
        }
        
        if (remainingBurst[currentIdx] > 0) {
            queue.push(currentIdx);
        } else {
            currentProc.completion = currentTime;
            currentProc.turnaround = currentProc.completion - currentProc.arrival;
            currentProc.waiting = currentProc.turnaround - currentProc.burst;
            completed.push(currentIdx);
        }
    }
    
    // Calculate start times for each process (earliest appearance in Gantt chart)
    processes.forEach(proc => {
        const procGantt = gantt.filter(g => g.pid === proc.pid);
        if (procGantt.length > 0) {
            proc.start = procGantt[0].start;
        }
    });
    
    const avgTurnaround = processes.reduce((sum, proc) => sum + proc.turnaround, 0) / processes.length;
    const avgWaiting = processes.reduce((sum, proc) => sum + proc.waiting, 0) / processes.length;
    
    return {
        processes: processes,
        gantt: gantt,
        avgTurnaround: avgTurnaround,
        avgWaiting: avgWaiting
    };
}
