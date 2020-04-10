window.addEventListener('load', startFunction);
let emptyRow;
// the function of buttons, response for creating and sorting functions
function startFunction() {
  emptyRow = document.querySelector('.row-div');

  let addButton = document.querySelector(".addList");
  addButton.addEventListener("click", addTask);

  let sorting = document.querySelector(".sort");
  sorting.addEventListener("click", handleSort);
}
// the function creating new empty task and calling delete and moving functions
function addTask() {
  let container = document.querySelector(".container-div");

  let copy = emptyRow.cloneNode(true);
  copy.children[1].value = '';

  container.append(copy);
  deleteTask();
  addMovement();
}
// the function which helps via dots button to move task list
function addMovement() {
  let moveButton = document.querySelectorAll(".dots img");

  moveButton.forEach((button) => {
    button.addEventListener("mousedown", handleMouseDown);
  });
}
// function helps to move task via mousedown event(adding classes)
function handleMouseDown(event) {
  event.preventDefault();

  let rowContainer = event.target.parentNode.parentNode;
  rowContainer.classList.add('yellow', 'absolute');
  rowContainer.children[1].classList.add('yellow');

  rowContainer.style.top = (event.pageY - 20) + 'px';
  // function helps to put task in appropriate place
  let handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    let container = document.querySelector('.container-div');
    let rows = document.querySelectorAll('.row-div');
    let arrayRows = [...rows];

    arrayRows.sort((a, b) => (a.getBoundingClientRect().y - b.getBoundingClientRect().y));

    rowContainer.classList.remove('yellow', 'absolute');
    rowContainer.children[1].classList.remove('yellow');

    rowContainer.style.top = 'auto';

    container.innerHTML = '';

    arrayRows.forEach(item => container.append(item));
  }
  // function helps to move task over the tasklist, replace every 15px and not to overflow through the container borders
  let handleMouseMove = (event) => {
    let container = rowContainer.parentNode.getBoundingClientRect();
    if (event.y > (container.top + 15) && event.y < (container.bottom - 15)) {
      rowContainer.style.top = (event.pageY - 20) + 'px';
    }
  }
  // this events helps mouse to react to the whole document
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("mousemove", handleMouseMove);
}
// function removes tasks via clicking on cross button
function deleteTask() {
  let deleteBtn = document.querySelectorAll(".delete img");

  deleteBtn.forEach((element) => {
    element.addEventListener("click", () => {
      element.parentNode.parentNode.remove();
    });
  });
}

// function sorts values of inputs
let check = 0;
function handleSort() {
  let rows = document.querySelectorAll('input');
  let rowsValueArray = [];
  // each input pushes to new empty array
  rows.forEach(item => rowsValueArray.push(item.value));
  console.log(rowsValueArray);

  rowsValueArray.sort();
  // check helps to count clicks on sort button, which with every click changes sort image (up or down)
  if (check % 2 != 0) {
    rowsValueArray.reverse();
  }
  check++;

  document.querySelector('.sort').src = `./images/notselected-${check % 2}.svg`

  for (let i = 0; i < rowsValueArray.length; i++) {
    rows[i].value = rowsValueArray[i];
  }
}











