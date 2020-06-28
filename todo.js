const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
// const completedBtn = document.querySelector(".fa-check-circle");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo() {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // console.log(event.target.parentNode);
  const cleanToDos = toDos.filter(function (toDo) {
    console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const ck = document.createElement("button");
  ck.innerHTML = `<i class="fas fa-check-circle"></i>`;
  const delBtn = document.createElement("button");
  delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
  // delBtn.classList.add(btn);
  delBtn.addEventListener("click", deleteToDo);
  //   completed
  ck.addEventListener("click", function () {
    // console.log(ck.parentElement);

    ck.parentNode.classList.add("completed");
  });
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(ck);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const a = toDoInput.value;
  paintToDo(a);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  // To load to do list if there are some lists
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
