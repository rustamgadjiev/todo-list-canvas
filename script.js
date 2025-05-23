const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const addTaskForm = document.getElementById("add-task-form");
const addTaskInput = document.getElementById("add-task-input");

const BUTTON_SIZE = 20;
const TASK_HEIGHT = 50;
const TASK_Y = 40;
const CHECKBOX_X = 50;
const DELETE_X = 500;

let tasks = [];
let shapes = [];

ctx.font = "18px Arial";

canvas.addEventListener("mousemove", handleMouseMove);

canvas.addEventListener("click", function (e) {
  const x = e.offsetX;
  const y = e.offsetY;

  tasks.forEach(function (task, i) {
    const yPos = i * TASK_HEIGHT + TASK_Y - 15;

    if (
      x >= CHECKBOX_X &&
      x <= CHECKBOX_X + BUTTON_SIZE &&
      y >= yPos &&
      y <= yPos + BUTTON_SIZE
    ) {
      task.complete = !task.complete;
      tasksView();
    }

    if (
      x >= DELETE_X &&
      x <= DELETE_X + BUTTON_SIZE &&
      y >= yPos &&
      y <= yPos + BUTTON_SIZE
    ) {
      tasks = tasks.filter(function (t) {
        return t.id !== task.id;
      });
      shapes = shapes.filter(shape => shape.id !== task.id)      

      canvas.classList.remove("pointer");
      tasksView();
    }
  });
});

function handleMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;

  if (shapes.some(shape => x >= shape.x && x <= shape.x + BUTTON_SIZE && y >= shape.y && y <= shape.y + BUTTON_SIZE)) {
    canvas.classList.add("pointer");
  } else {
    canvas.classList.remove("pointer");
  }
};

addTaskForm.onsubmit = function (e) {
  e.preventDefault();

  if (!addTaskInput.value.length) {
    alert("Заполните поле");
    return;
  }

  if (tasks.some((t) => t.text === addTaskInput.value)) {
    alert("Вы уже создавали задачу с таким названием");
    return;
  }

  const task = {
    id: (tasks.at(-1)?.id || 0) + 1,
    text: addTaskInput.value,
    complete: false,
  };

  tasks.push(task);
  addTaskInput.value = "";

  tasksView();
};

function tasksView() {
  shapes = [];
  ctx.clearRect(0, 0, 600, 500);
  tasks.forEach(function (task, i) {
    const dynamicPosition = i * TASK_HEIGHT + TASK_Y;
    const yPos = dynamicPosition - 15;

    ctx.beginPath();
    ctx.fillStyle = "#000";
    ctx.fillText(task.text, 100, dynamicPosition);

    completeTaskButton(task.complete, yPos);
    deleteTaskButton(dynamicPosition, yPos);

    if (!shapes.some(shape => shape.x1 === CHECKBOX_X && shape.x2 === CHECKBOX_X + BUTTON_SIZE && shape.y1 === yPos && shape.y2 === (yPos + BUTTON_SIZE))) {
      shapes.push({
        id: task.id,
        x: CHECKBOX_X,
        y: yPos,
      });
    }

    if (!shapes.some(shape => shape.x1 === DELETE_X && shape.x2 === DELETE_X + BUTTON_SIZE && shape.y1 === yPos && shape.y2 === (yPos + BUTTON_SIZE))) {
      shapes.push({
        id: task.id,
        x: DELETE_X,
        y: yPos,
      });
    }
  });
}

function deleteTaskButton(dynamicPosition, yPos) {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.fillRect(500, yPos, BUTTON_SIZE, BUTTON_SIZE);

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.moveTo(517, dynamicPosition - 12);
  ctx.lineTo(503, dynamicPosition + 2);
  ctx.moveTo(503, dynamicPosition - 12);
  ctx.lineTo(517, dynamicPosition + 2);
  ctx.stroke();
}

function completeTaskButton(taskComplete, yPos) {
  ctx.beginPath();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.strokeRect(50, yPos, BUTTON_SIZE, BUTTON_SIZE);

  if (taskComplete) {
    ctx.fillStyle = "greenyellow";
    ctx.fillRect(50, yPos, BUTTON_SIZE, BUTTON_SIZE);
  }
}
