function fcfs(processes) {
    // Sort by arrival time
    processes.sort((a, b) => a.arrival - b.arrival);
    
    let currentTime = 0;
    const gantt = [];
    
    processes.forEach(proc => {
        // If process arrives after current time, wait for it
        if (proc.arrival > currentTime) {
            currentTime = proc.arrival;
        }
        
        proc.start = currentTime;
        proc.completion = currentTime + proc.burst;
        proc.turnaround = proc.completion - proc.arrival;
        proc.waiting = proc.start - proc.arrival;
        
        gantt.push({
            pid: proc.pid,
            start: proc.start,
            end: proc.completion
        });
        
        currentTime = proc.completion;
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