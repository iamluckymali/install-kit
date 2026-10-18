const barBtn = document.querySelector("#barBtn");
const closeBtn = document.querySelector("#closeBtn");
const overlay = document.querySelector("#overlay");
const sidebar = document.querySelector("#sidebar");

function openSideBar() {
    sidebar.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0","pointer-events-none");
}
function closeSidebar(){
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("opacity-0","pointer-events-none");
}

barBtn.addEventListener('click',openSideBar);
closeBtn.addEventListener('click',closeSidebar);
overlay.addEventListener('click',closeSidebar);