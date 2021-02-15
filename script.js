// Getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup  = () => {
  let userData = inputBox.value; //getting user entered value
  if(userData.trim() !=0) { //user values aren't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //inactive the add button
  }
}

showTasks(); //calling showtasks function

// if user click on the add button
addBtn.onclick = () => {
  let userData = inputBox.value; //getting user entered value
  let getLocalstorage = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalstorage == null) { //if localstorage is null 
    listArr = []; //creating empty array
  } else {
    listArr = JSON.parse(getLocalstorage); //transforming json string into js object
  }
  listArr.push(userData); //pushing or adding user data 
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
  showTasks(); //calling showtasks function
  addBtn.classList.remove("active"); //inactive the add button
}

// function to add task list inside ul
function showTasks() {
  let getLocalstorage = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalstorage == null) { //if localstorage is null 
    listArr = []; //creating empty array
  } else {
    listArr = JSON.parse(getLocalstorage); //transforming json string into js object
  }
  const pendingNum = document.querySelector(".pendingNumb");
  pendingNum.textContent = listArr.length; //passing the length value in pendingNumb
  if(listArr.length > 0) { // if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the clearall button
  } else {
    deleteAllBtn.classList.remove("active"); //deactive the clearall button
  }
  let newLiTag = '';
  listArr.forEach((element , index) => {
    newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag //adding new li tag inside ul tag
  inputBox.value = ""; // once task added leave the input field blank
}

// delete task function
function deleteTask(index) {
  let getLocalstorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalstorage);
  listArr.splice(index, 1); //delete or remove the particular indexed li
  // after remove the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
  showTasks(); //calling showtasks function
}

// dekete all tasks function 
deleteAllBtn.onclick = () => {
  listArr = []; //empty an array
  //after delete all tasks again update the localstorage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
  showTasks(); //calling showtasks function
}