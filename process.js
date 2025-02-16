
let processCount = 1;

function addProcess() {
    processCount++;
    const container = document.getElementById('process-container');
    const newProcess = document.createElement('div');
    newProcess.className = 'process-input';
    newProcess.innerHTML = `
        <span>Process ${processCount}</span>
        <input type="number" class="arrival" placeholder="Arrival Time" min="0" value="0">
        <input type="number" class="burst" placeholder="Burst Time" min="1" value="${Math.floor(Math.random() * 10) + 1}">
        <input type="number" class="priority" placeholder="Priority" min="1" value="${Math.floor(Math.random() * 5) + 1}">
        <button class="btn-danger" onclick="removeProcess(this)">Remove</button>
    `;
    container.appendChild(newProcess);
}

function removeProcess(button) {
    if (processCount > 1) {
        button.parentElement.remove();
        processCount--;
        // Renumber remaining processes
        const processes = document.querySelectorAll('.process-input');
        processes.forEach((process, index) => {
            process.querySelector('span').textContent = `Process ${index + 1}`;
        });
    } else {
        alert("You need at least one process.");
    }
}