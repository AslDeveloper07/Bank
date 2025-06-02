"use strict";

const kirdi = document.getElementById("kirdi");
const chiqdi = document.getElementById("chiqdi");
const search = document.getElementById("searchInput");
const balance = document.getElementById("balance");
const avatar = document.getElementById("avatarka");
const date = document.getElementById("date");
const transformInp1 = document.getElementById("input1");
const transformInp2 = document.getElementById("input2");
const transformBtn = document.getElementById("transformBtn");
const setIcon = document.getElementById("set");
const buyIcon = document.getElementById("buy");
const requistInp = document.getElementById("requistInp");
const closeBtn = document.getElementById("closeBtn");
const time = document.getElementById("time");
const requistBtn = document.getElementById("requistBtn");
const closesAkkBtn = document.getElementById("closesAkkBtn");

const typeTxt = document.getElementById("types");
const amountTxt = document.getElementById("amounte");
const dateStatus = document.getElementById("datese");
const symbolIcon = document.getElementById("symbol");


// console.log(
//   kirdi,
//   chiqdi,
//   search,
//   balance,
//   avatar,
//   date,
//   transformBtn,
//   transformInp1,
//   transformInp2,
//   setIcon,
//   buyIcon,
//   requistInp,
//   time,
//   closeBtn,
//   requistBtn,
//   closesAkkBtn,
//   typeTxt,
//   amountTxt,
//   dateStatus,
//   symbolIcon
// );



// LocalStorage'dan foydalanuvchi ma’lumotlarini olish
const user = JSON.parse(localStorage.getItem("loggedInUser"));

if (user) {
  // Foydalanuvchi ma'lumotlarini sahifaga joylash
  avatar.src = user.ownerImage;
  balance.textContent = user.balance.toLocaleString("en-US") + " UZS";

  // (ixtiyoriy) Foydalanuvchi nomini chiqarish
  const usernameDisplay = document.getElementById("username");
  if (usernameDisplay) {
    usernameDisplay.textContent = `Welcome, ${user.owner}`;
  }
} else {
  // Agar localStorage'da foydalanuvchi bo‘lmasa, login sahifasiga qaytarish
  window.location.href = "login.html";
}
