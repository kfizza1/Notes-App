const notesContainer = document.querySelector(".notes-container");
const btn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes() {
    try{

        notesContainer.innerHTML = localStorage.getItem("notes");
    }
    catch (error) {
        console.error("Error loading notes from localStorage:", error);
    }
}

function updateStorage() {
    try{
        localStorage.setItem("notes", notesContainer.innerHTML);
    }
    catch (error) {
        console.error("Error saving notes to localStorage:", error);
    }
}
showNotes();

btn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.textContent = "";
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
});

notesContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "p") {
        notes = document.querySelectorAll(".input-box")
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
});
document.addEventListener("keydown", event => {
    if(event.key === "enter"){
        event.preventDefault()
        document.execCommand("insertHTML" , false , "<br><br>");
    }
});