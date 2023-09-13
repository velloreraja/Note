const addBox = document.querySelector(".addbox");
const popupBox = document.querySelector(".popup-box");
const popuptitle = popupBox.querySelector("header p");
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const addBtn = popupBox.querySelector("button");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octobar",
  "Navambar",
  "Decembar",
];

//getting localstorage notes if exist and parsing them to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false,
  updateId;

addBox.addEventListener("click", function () {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", function () {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add a new Note";
  popuptitle.innerText = "Add Note";
  popupBox.classList.remove("show");
});

function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  notes.forEach((note, index) => {
    let boxTag = `
                    <div class="note box">
                    <div class="details">
                        <h3 class="note_title">${note.title}</h3>
                        <p class="note_content">${note.description}</p>
                    </div>
                    <div class="bottom_content">
                        <span>${note.date}</span>
                        <div class="setting">
                            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis-vertical"></i>
                            <div class="menu">
                                <div onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="box"><i class="fa-solid fa-pen"></i>Edit</div>
                                <div onclick="deleteNote(${index})" class="box"><i class="fa-solid fa-trash"></i>Delete</div>
                            </div>
                        </div>
                        
                    </div>
                </div> `;
    addBox.insertAdjacentHTML("afterend", boxTag);
  });
}
showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDe = confirm("You want to delete this Note?");
  if (!confirmDe) return;
  notes.splice(noteId, 1); // remove note in array
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  popuptitle.innerText = "Update a Note";
}

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if (noteTitle || noteDesc) {
    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day} ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo); // adding new note to notes
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo; // updating a specified note
    }

    //saving note to localstorage
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
