window.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("ownerName");
  const logOut = document.getElementById("logOut");
  const balance = document.getElementById("balance");
  const avatar=document.getElementById("avatarka")

  const dashboard =JSON.parse( localStorage.getItem('accaunts'))
//   console.log(dashboard);

if(dashboard){
    avatar.src=accaunts.ownerImage??'./../resource/img/defaultavatar.jpg'
}

});
