let tasks = [];
window.onload = () => {
  const stored = localStorage.getItem('tasks');
  if (stored) {
    tasks = JSON.parse(stored);
  }
  renderTasks();
};

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask() {
  const input = document.getElementById('task-input');
  const text = input.value.trim();
  if (text === '') return;

  tasks.push({ text, completed: false });
  input.value = '';
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}
let lastCelebration = false;

function renderTasks() {
  const taskList = document.getElementById('task-list');
  const taskCount = document.getElementById('task-count');
  const progressFill = document.getElementById('progress-fill');

  taskList.innerHTML = '';
  let completedCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button onclick="deleteTask(${index})">🗑</button>
    `;
    taskList.appendChild(li);
    if (task.completed) completedCount++;
  });

  const total = tasks.length;
  taskCount.textContent = `${completedCount}/${total}`;
  const percent = total === 0 ? 0 : (completedCount / total) * 100;
  progressFill.style.width = percent + '%';

  // 🎉 Confetti Trigger
  if (completedCount === total && total > 0 && !lastCelebration) {
    confettiSpray();
    lastCelebration = true;
  } else if (completedCount !== total) {
    lastCelebration = false;
  }
}
function confettiSpray() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#bb0000', '#ffffff', '#00ff99', '#ffcc00']
  });
}