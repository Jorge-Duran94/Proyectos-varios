let toggleBtn = document.querySelector(".toggle-btn")
let container = document.querySelector(".container")

toggleBtn.onclick = function(){
    container.classList.toggle("active")
}