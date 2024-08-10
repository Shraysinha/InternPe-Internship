document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const datetimeInput = document.getElementById('datetime-input');
  const taskList = document.getElementById('task-list');
  const historyList = document.getElementById('history-list');
  const showHistoryButton = document.getElementById('show-history');
  const toggleThemeButton = document.getElementById('toggle-theme');

  const tasks = [];
  const history = [];
  let darkMode = false;

  // Toggle Light/Dark Mode
  toggleThemeButton.addEventListener('click', () => {
      darkMode = !darkMode;
      document.body.classList.toggle('dark-mode');
      toggleThemeButton.textContent = darkMode ? 'Light Mode' : 'Dark Mode';
  });

  // Add Task
  document.getElementById('add-task').addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      const datetimeValue = datetimeInput.value;

      if (taskText) {
          const task = { text: taskText, datetime: datetimeValue, timeoutId: null };
          tasks.push(task);
          renderTasks();
          taskInput.value = '';
          datetimeInput.value = '';

          // Schedule Notification
          if (datetimeValue) {
              task.timeoutId = scheduleNotification(task);
          }
      }
  });

  // Show/Hide Task History
  showHistoryButton.addEventListener('click', () => {
      historyList.classList.toggle('hidden');
      renderHistory();
  });

  // Render Tasks
  function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';

          listItem.innerHTML = `
              ${task.text} 
              ${task.datetime ? `<small>${task.datetime}</small>` : ''}
              <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">Delete</button>
          `;

          taskList.appendChild(listItem);
      });
  }

  // Render Task History
  function renderHistory() {
      historyList.innerHTML = '';
      history.forEach(task => {
          const listItem = document.createElement('li');
          listItem.className = 'list-group-item';
          listItem.textContent = `${task.text} - ${task.datetime}`;
          historyList.appendChild(listItem);
      });
  }

  // Remove Task
  window.removeTask = function(index) {
      const removedTask = tasks.splice(index, 1)[0];
      if (removedTask.timeoutId) {
          clearTimeout(removedTask.timeoutId);
      }
      history.push(removedTask);
      renderTasks();
  };

  // Schedule Notification
  function scheduleNotification(task) {
      const taskTime = new Date(task.datetime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = taskTime - currentTime;

      if (timeDifference > 0) {
          return setTimeout(() => {
              alert(`Reminder: ${task.text}`);
              // Play alarm sound
              const audio = new Audio('alarm.mp3');
              audio.play();
          }, timeDifference);
      }
      return null;
  }
});
