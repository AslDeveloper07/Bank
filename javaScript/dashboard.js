window.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("ownerName");
  const logOut = document.getElementById("logOut");
  const balance = document.getElementById("balance");
  const avatar = document.getElementById("avatarka");
  const ownerName = document.getElementById("ownerName");
  const modalProfile = document.getElementById("modal");
  console.log(logOut);

  let isModalOpen = false;

  const dashboard = JSON.parse(localStorage.getItem("accaunts"));
  //   console.log(dashboard);

  if (dashboard) {
    avatar.src = dashboard?.ownerImage ?? "./../resource/img/defaultavatar.jpg";

    ownerName.textContent = dashboard.owner ?? "Username ";
    balance.textContent = dashboard.balance ?? "0.00";

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

    logOut.addEventListener("click", () => {
      checkLogOut = confirm("Profiledan chiqishni hohlaysizmi?");
      if (checkLogOut) {
        localStorage.removeItem("accaunts");
        window.location.replace("./../index.html");
      }
    });
  }
});
