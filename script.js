const canvas = document.getElementById("can");
const ctx = canvas.getContext("2d");

const addTaskForm = document.getElementById("add-task-form");
const addTaskInput = document.getElementById("add-task-input");

let tasks = [];

ctx.font = "18px Arial";

addTaskForm.onsubmit = function (e) {
  e.preventDefault();

  if (!addTaskInput.value.length) {
    alert("Заполните поле");
    return;
  }

  const task = {
    id: (tasks.at(-1)?.id || 0) + 1,
    text: addTaskInput.value,
    complete: false,
  };

  tasks.push(task);
  addTaskInput.value = "";

  tasksView(tasks);
};

function tasksView(tasks) {
  ctx.clearRect(0, 0, 600, 500);
  tasks.forEach(function (task, i) {
    const dynamicPosition = i * 50 + 40;

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillText(task.text, 100, dynamicPosition);

    completeTaskButton(dynamicPosition, task.id, task.complete);
    deleteTaskButton(dynamicPosition, task.id);
  });
}

function deleteTaskButton(dynamicPosition, taskId) {
  const yPos = dynamicPosition - 15;

  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(500, yPos, 20, 20);

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.moveTo(517, dynamicPosition - 12);
  ctx.lineTo(503, dynamicPosition + 2);
  ctx.moveTo(503, dynamicPosition - 12);
  ctx.lineTo(517, dynamicPosition + 2);
  ctx.stroke();

  canvas.addEventListener("click", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;

    const isBtnPosition = x >= 500 && x <= 520 && y >= yPos && y <= yPos + 20;

    if (isBtnPosition) {
      tasks = tasks.filter((t) => t.id !== taskId);
      tasksView(tasks);
    }
  });
}

function completeTaskButton(dynamicPosition, taskId, taskComplete) {
  const yPos = dynamicPosition - 15;

  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeRect(50, dynamicPosition - 15, 20, 20);

  if (taskComplete) {
    ctx.fillStyle = "greenyellow";
    ctx.fillRect(50, dynamicPosition - 15, 20, 20);
  }

  canvas.addEventListener("click", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;

    const isBtnPosition = x >= 50 && x <= 70 && y >= yPos && y <= yPos + 20;

    if (isBtnPosition) {
      tasks = tasks.map(function (task) {
        if (task.id === taskId) {
          task.complete = true;
        }

        return task;
      });

      tasksView(tasks);
    }
  });
}
