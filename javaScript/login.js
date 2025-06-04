const form = document.getElementById("form");
const loader = document.getElementById("loader");
const loginForm = document.getElementById("loginForm");

const ownerEmail = document.getElementById("ownerEmail");
const ownerPass = document.getElementById("ownerPass");
const submitBtn = document.getElementById("submitBtn");

const accaunts = [
  {
    owner: "Asilbek",
    ownerImage: "./../resource/img/avatar.jpg",
    email: "Asilbekjon@gmail.com",
    password: "root2008",
    balance: 2345236475,
    transactions: [],
  },
  {
    owner: "Azizbek",
    ownerImage: "./../resource/img/azizbek.png",
    email: "Azizbekjon@gmail.com",
    password: "root2010",
    balance: 3543646546,
    transactions: [],
  },
];

// // inputga kirib kelayotgan ma'lumotlarni tekshirish
// submitBtn.addEventListener('click', () => {
//   const email = ownerEmail.value.trim().toLowerCase();
//   const password = ownerPass.value.trim();

//   const accountFind = accaunts.find((accaunt) => {
//     return accaunt.email.toLowerCase() === email && accaunt.password === password;
//   });

//   console.log(accountFind);
// });

// // Agar tugri bulsa Profile.html ga utkazib yuborish uchun

// // Loader ishlashi uchun
// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   loginForm.classList.add('hidden');
//   loader.style.display = 'block';

//   setTimeout(() => {
//     window.location.href = './html/profile.html';
//   }, 1000);
// });

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = ownerEmail.value.trim().toLowerCase();
  const password = ownerPass.value.trim();

  const accauntFind = accaunts.find((accaunt) => {
    return (
      accaunt.email.toLowerCase() === email && accaunt.password === password
    );
  });

  if (accauntFind) {
    loginForm.classList.add("hidden");
    loader.style.display = "block";
    localStorage.setItem("accaunts", JSON.stringify(accauntFind));
    setTimeout(() => {
      window.location.href = "./html/profile.html";
    }, 1000);
  } else {
    Toastify({
      text: "Email yoki password xato !",
      duration: 2000,
      gravity: "top",
      position: "right",
      backgroundColor: "red",
      // close: true
    }).showToast();
  }
});
