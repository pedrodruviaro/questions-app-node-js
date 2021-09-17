import Modal from "./modal.js";
const modal = Modal();

// getting modal parts
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const modalButtonConfirm = document.querySelector(".modal-btn-confirm");

// Delete button
const btnDelete = document.querySelectorAll(".btn-delete");

btnDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (event) => handleClick(event, false));
});

// Mark as read button
const btnRead = document.querySelectorAll(".btn-read");

btnRead.forEach((btnRead) => {
    btnRead.addEventListener("click", (event) => handleClick(event));
});

/*----------------------------------------------------------------------------*/
function handleClick(event, check = true) {
    const roomId = document
        .querySelector("#room-id")
        .getAttribute("data-roomId");
    const slug = check ? "check" : "delete";
    const questionId = event.target.getAttribute("data-id");

    console.log(roomId, questionId);

    const modalForm = document.querySelector("#modal-form");
    console.log(modalForm);
    //`/question/:roomId/:questionid/:action`
    modalForm.setAttribute(
        "action",
        `/question/${roomId.trim()}/${questionId.trim()}/${slug}`
    );

    // preventDefault
    event.preventDefault();

    modalTitle.textContent = check
        ? "Mark Questions As Read"
        : "Delete Question";
    modalDescription.textContent = check
        ? "Are you sure you wanna check the question as read?"
        : "Are you sure you wanna delete the question?";
    modalButtonConfirm.textContent = check
        ? "Yes, mark as read"
        : "Yes, delete";

    !check
        ? modalButtonConfirm.classList.add("red")
        : modalButtonConfirm.classList.remove("red");

    modal.open();
}
