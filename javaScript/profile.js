"use strict";

const kirdi = document.getElementById("kirdi");
const chiqdi = document.getElementById("chiqdi");
const search = document.getElementById("searchInput");
const balanceMoney = document.getElementById("balance");
const avatar = document.getElementById("avatarka");
const date = document.getElementById("date");
const transformInp1 = document.getElementById("input1");
const transformInp2 = document.getElementById("input2");
const transformBtn = document.getElementById("transformBtn");
const setIcon = document.getElementById("set");
const buyIcon = document.getElementById("buy");
const requistInp = document.getElementById("requistInp");
const closeBtn = document.getElementById("closeBtn");
const vaqt = document.getElementById("time");
const requistBtn = document.getElementById("requistBtn");
const closesAkkBtn = document.getElementById("closesAkkBtn");
const modalProfile = document.getElementById("modal");
const typeTxt = document.getElementById("types");
const amountTxt = document.getElementById("amounte");
const dateStatus = document.getElementById("datese");
const symbolIcon = document.getElementById("symbol");
const logOutBtn = document.getElementById("logOut");

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
closeBtn.addEventListener("click", closeModal);
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
