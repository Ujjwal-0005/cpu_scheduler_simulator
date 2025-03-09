function sjf(processes) {
    // Sort by arrival time first
    processes.sort((a, b) => a.arrival - b.arrival);
    
    let currentTime = 0;
    const completed = [];
    const gantt = [];
    const queue = [];
    
    while (completed.length < processes.length) {
        // Add arrived processes to queue
        for (const proc of processes) {
            if (proc.arrival <= currentTime && !queue.includes(proc) && !completed.includes(proc)) {
                queue.push(proc);
            }
        }
        
        if (queue.length === 0) {
            currentTime++;
            continue;
        }
        
        // Sort queue by burst time (SJF)
        queue.sort((a, b) => a.burst - b.burst);
        
        const currentProc = queue.shift();
        currentProc.start = currentTime;
        currentProc.completion = currentTime + currentProc.burst;
        currentProc.turnaround = currentProc.completion - currentProc.arrival;
        currentProc.waiting = currentProc.start - currentProc.arrival;
        
        gantt.push({
            pid: currentProc.pid,
            start: currentProc.start,
            end: currentProc.completion
        });
        
        currentTime = currentProc.completion;
        completed.push(currentProc);
    }
    
    const avgTurnaround = processes.reduce((sum, proc) => sum + proc.turnaround, 0) / processes.length;
    const avgWaiting = processes.reduce((sum, proc) => sum + proc.waiting, 0) / processes.length;
    
    return {
        processes: processes,
        gantt: gantt,
        avgTurnaround: avgTurnaround,
        avgWaiting: avgWaiting
    };
}