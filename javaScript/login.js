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
    balance: 2000,
    transactions: [],
  },
  {
    owner: "Azizbek",
    ownerImage: "./../resource/img/azizbek.png",
    email: "Azizbekjon@gmail.com",
    password: "root2010",
    balance: 8000,
    transactions: [],
  },
];

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
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      text: `Email yoki Password xato !`,
      showConfirmButton: false,
      timer: 3000,
      background: "rgb(255, 203, 203)",
      color: "rgb(255, 116, 116)",
      showClass: {
        popup: "swal2-show-top swal2-animate-popup",
      },
      hideClass: {
        popup: "swal2-hide-top swal2-animate-popup",
      },
    });
  }
});
