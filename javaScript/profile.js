"use strict";

const avatar = document.getElementById("avatarka");
const kirdi = document.getElementById("kirdi");
const chiqdi = document.getElementById("chiqdi");
const depossitInp = document.getElementById("deposit");
const spendBtn = document.getElementById("spendBtn");
const search = document.getElementById("searchInput");
const depositBtn = document.getElementById("depositBtn");
const balanceMoney = document.getElementById("balance");
const modalProfile = document.getElementById("modal");
const logOutBtn = document.getElementById("logOut");
const vaqt = document.getElementById("time");
const closesAkkBtn = document.getElementById("closesAkkBtn");

let isModalOpen = false;

// rasm bosilganda modal ochiladi
avatar.addEventListener("click", () => {
  isModalOpen = !isModalOpen;

  if (isModalOpen) {
    modalProfile.classList.remove("hidden");
    modalProfile.classList.add("flex");
  } else {
    modalProfile.classList.add("hidden");
    modalProfile.classList.remove("flex");
  }
});

// LogOut bosilganda login pagega qaytarib yuboradi
logOutBtn.addEventListener("click", () => {
  window.location.href = "./../index.html";
});

// Modalni yopish
// closeBtn.addEventListener("click", closeModal);
closesAkkBtn.addEventListener("click", closeModal);

// Modalni yopadigan hamma funksiyalar
function closeModal() {
  modalProfile.classList.add("hidden");
  modalProfile.classList.remove("flex");
  isModalOpen = false;
}

// vaqt
function showRealTime() {
  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  vaqt.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(showRealTime, 1000);

showRealTime();
