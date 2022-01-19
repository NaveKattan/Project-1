const DOM = {

    task: null,
    time: null,
    date: null,
    myTasks: null,
    form: null,
    id: null,
}

const config = { notes: "notes" }
const state = { tasks: [] }

function init() {

    DOM.task = document.querySelector("#task")
    DOM.time = document.querySelector("#time")
    DOM.date = document.querySelector("#date")
    DOM.myTasks = document.querySelector("#myTasks")
    DOM.form = document.querySelector("#form")
    try {
        const notesString = localStorage.getItem(config.notes);
        const note = JSON.parse(notesString);
        if (!note) return;
        state.tasks = note;
    } catch { }
    draw(state.tasks);
}

function draw(tasks) {

    DOM.myTasks.innerHTML = ""

    for (let index = 0; index < tasks.length; index++) {
        const currentTask = tasks[index]
        const task = getTask(currentTask)
        if (task) DOM.myTasks.append(task)
    }
}

function addTask() {

    const task = {
        taskText: DOM.task.value,
        taskTime: DOM.time.value,
        taskDate: DOM.date.value,
        taskId: Math.floor(Math.random() * 100)
    }

    if (!task.taskText || !task.taskTime || !task.taskDate) return alert("Please enter all the details")

    state.tasks.push(task)
    localStorage.setItem(config.notes, JSON.stringify(state.tasks))
    draw(state.tasks)
    const form = DOM.form
    form.reset()
}

function getTask(task) {

    const card = document.createElement("div")
    card.classList.add("card", "fade-in")

    const cardBody = document.createElement("div")

    const cardHead = document.createElement("h5")
    cardHead.innerText = `Note #${task.taskId}`

    const cardText = document.createElement("p")
    cardText.innerText = task.taskText
    
    const cardTime = document.createElement("span")
    cardTime.innerText = task.taskTime
    cardTime.classList.add("card-time-date")

    const cardDate = document.createElement("p")
    cardDate.innerText = task.taskDate
    cardDate.classList.add("card-time-date")

    const cardDelete = document.createElement("button")
    cardDelete.classList.add("bi", "bi-x", "btn", "btn-outline-danger")

    cardDelete.onclick = function () {
        const id = task.taskId
        for (let index = 0; index < state.tasks.length; index++) {
            if (state.tasks[index].taskId === id) {
                state.tasks.splice(index, 1)
            }
        }

        localStorage.setItem(config.notes, JSON.stringify(state.tasks))
        draw(state.tasks)
    }

    cardBody.append(cardHead, cardText, cardTime, cardDate)
    card.append(cardDelete, cardBody)

    return card
}


function resetForm() {

    const form = DOM.form
    form.reset()
}

init()