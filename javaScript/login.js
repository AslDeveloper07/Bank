const form = document.getElementById('form');
const loader = document.getElementById('loader');
const loginForm = document.getElementById('loginForm');

const ownerEmail = document.getElementById('ownerEmail');
const ownerPass = document.getElementById('ownerEmail');
const submitBtn = document.getElementById('submitBtn');



// kichkinagina datacha
const accaunts = [
    {
      owner: "Asilbek",
      ownerImage: "./../resource/img/avatar.jpg",
      email: "Asilbekjon@gmail.com",
      password: "root2008",
      balance: 2345236475,
    },
    {
      owner: "Azizbek",
      ownerImage: "./../resource/img/azizbek.png",
      email: "Azizbekjon@gmail.com",
      password: "root2010",
      balance: 3543646546,
    },
  ];


form.addEventListener('submit', function (e) {
  e.preventDefault();

  loginForm.classList.add('hidden');
  loader.style.display = 'block';


  setTimeout(() => {
    window.location.href = './html/profile.html';
  }, 1000);
});