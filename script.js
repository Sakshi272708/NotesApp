let noteInput = document.querySelector("#note-input");
let noteArea = document.querySelector("#note-area");
let addBtn = document.getElementById("add-notebtn");
let cardHold = document.querySelector("#cards-container");

function savedata() {
    let saved = localStorage.setItem("dataobj", JSON.stringify(notesData))
}
let notesData = [];

addBtn.addEventListener("click", function (e) {
    console.log("add btn clickied ")
    let inputVal = noteInput.value;
    let areaVal = noteArea.value
    if (!inputVal && !areaVal) return;
    let colorArr = ["note-yellow", "note-blue", "note-pink", "note-green"];
    let randomIndex = Math.floor(Math.random() * colorArr.length);
    let randomColor = colorArr[randomIndex];

    let dataobj = {
        id: Date.now(),
        title: inputVal,
        content: areaVal,
        color: randomColor,
    }
    notesData.push(dataobj);


    createnoteCard(dataobj)

    savedata();
    noteArea.value = "";
    noteInput.value = "";
    
})
noteInput.addEventListener("click", function () {
    noteArea.style.display = "block";
})

function createnoteCard(note){
    let noteCard = document.createElement("div");
    noteCard.classList.add("notes-card",note.color);

    noteCard.dataset.id = note.id;
    
    let noteTitle = document.createElement("h3");
    noteTitle.textContent = note.title;

    let paraText = document.createElement("p");
    paraText.textContent = note.content;

    let editBtn = document.createElement("button")
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    let dltBtn = document.createElement("button")
    dltBtn.textContent = "Delete"
    dltBtn.classList.add("dlt-btn");

    noteCard.append(noteTitle);
    noteCard.append(paraText);
    noteCard.append(editBtn);
    noteCard.append(dltBtn);

    cardHold.appendChild(noteCard);
}


function updateValues(id,title,content) {
    notesData = notesData.map(note => {
        if (note.id == id) {
            return {
                ...note,
                title: title,
                content: content,
            };
        }
        return note;
    })
}

cardHold.addEventListener("click", function (e) {
    if (e.target.classList.contains("dlt-btn")) {
        let card = e.target.parentElement; //same as closest but another name just
        let cardId = card.dataset.id;
        card.remove();

        notesData=notesData.filter(note=> note.id != cardId);
        savedata()
    }
    
    if (e.target.classList.contains("edit-btn")) {
        let card = e.target.closest(".notes-card");
        let id = card.dataset.id;

        let title = card.querySelector("h3");
        let content = card.querySelector("p");
        // M-1
        // noteInput.value=title.textContent;
        // noteArea.value=content.textContent;
        let editBtn = e.target;
        if (editBtn.textContent === "Edit") {
            // M-2
            title.contentEditable = true;
            content.contentEditable = true;
            e.target.textContent = "Save";
        } else {
            title.contentEditable = false;
            content.contentEditable = false;
            e.target.textContent = "Edit"
        }

        // update notesdata

        updateValues(
            id,
            title.textContent,
            content.textContent
        )
    }
    savedata();
})

function loadData() {
    cardHold.innerHTML="";
    let getdata = localStorage.getItem("dataobj");

    if (getdata) {
        notesData = JSON.parse(getdata);
    }
    notesData.forEach(note => {
        createnoteCard(note)
    })
    
}
loadData()