export default function Modal() {
    const modalWrapper = document.querySelector(".modal-wrapper");
    const btnModalCancel = document.querySelector(".modal-btn-cancel");

    //close modal
    btnModalCancel.addEventListener("click", close);

    // functions
    function open(){
        modalWrapper.classList.add("open")
    }

    function close(){
        modalWrapper.classList.remove("open")
    }

    return { open, close }
}
