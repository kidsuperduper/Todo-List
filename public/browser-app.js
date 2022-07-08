const itemsDOM = document.querySelector(".items");
const formDOM = document.querySelector(".item-form");
const itemInputDOM = document.querySelector(".item-input");
const formAlertDOM = document.querySelector(".form-alert");

// Load list from /api/todo
const showList = async () => {
    try {
        const res = await axios.get("/api/v1/todo");

        if (res.data.length < 1) {
            itemsDOM.innerHTML = "<h2>No task in your list</h2>";
            return;
        }

        const allTodo = res.data
            .map((todo) => {
                const { _id: todoID, name } = todo;
                return `<div class="round">
            <input type="checkbox" id="${todoID}" class="delete-checkbox" onchange="deleteTodo(this)">
            <label for="checkbox"></label>
            <a href="task.html?id=${todoID}" class="edit-link" style="margin-left: 10px;">
              <i class="fas fa-edit"></i>
            </a>
            </div>
            <p>${name}</p>
            <br>`;
            })
            .join("");

        itemsDOM.innerHTML = allTodo;
    } catch (err) {
        console.log(err);
        itemsDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later!</h5>';
    }
};

showList();

// Delete task /api/tasks/:id
function deleteTodo(item) {
    try {
        let id = item.id;
        axios.delete(`/api/v1/todo/${id}`);
        showList();
    } catch (error) {
        console.log(error);
    }
}

// Add task form
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = itemInputDOM.value;

    if (name === "") {
        formAlertDOM.style.display = "block";
        formAlertDOM.style.color = "red";
        formAlertDOM.innerHTML = "Please input task!";
    } else {
        try {
            await axios.post("/api/v1/todo", { name });
            showList();
            itemInputDOM.value = "";
            formAlertDOM.style.display = "block";
            formAlertDOM.textContent = "Success, task added!";
            formAlertDOM.style.color = "green";
        } catch (error) {
            formAlertDOM.style.display = "block";
            formAlertDOM.style.color = "red";
            formAlertDOM.innerHTML = "Error, please try again";
        }
    }

    setTimeout(() => {
        formAlertDOM.style.display = "none";
    }, 3000);
});
