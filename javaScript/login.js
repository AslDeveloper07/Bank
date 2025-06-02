const form = document.getElementById('form');
const loader = document.getElementById('loader');
const loginForm = document.getElementById('loginForm');









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


// Loader funksiyasi
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Formni to'g'ridan-to'g'ri yuborishni bloklaymiz

  loginForm.classList.add('hidden');
  loader.style.display = 'block';

  // 2 soniyadan so'ng profile sahifasiga o'tish
  setTimeout(() => {
    window.location.href = './html/profile.html';
  }, 2500);
});