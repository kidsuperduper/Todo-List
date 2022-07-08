const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const editBtnDOM = document.querySelector(".task-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");
let tempName;

const showTask = async () => {
    try {
        const res = await axios.get(`/api/v1/todo/${id}`);

        const { _id: todoID, name } = res.data;

        taskIDDOM.textContent = todoID;
        taskNameDOM.value = name;
        tempName = name;
    } catch (error) {
        console.log(error);
    }
};

showTask();

editFormDOM.addEventListener("submit", async (e) => {
    editBtnDOM.textContent = "Loading...";
    e.preventDefault();
    try {
        const taskName = taskNameDOM.value;

        const res = await axios.patch(`/api/v1/todo/${id}`, {
            name: taskName,
        });

        const { _id: todoID, name } = res.data;

        taskIDDOM.textContent = todoID;
        taskNameDOM.value = name;
        tempName = name;

        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = `success, edited task`;
        formAlertDOM.classList.add("text-success");
    } catch (error) {
        console.error(error);
        taskNameDOM.value = tempName;
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = `error, please try again`;
    }
    editBtnDOM.textContent = "Edit";
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});
