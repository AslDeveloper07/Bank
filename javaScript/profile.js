window.addEventListener("DOMContentLoaded", () => {
  const profileName = document.getElementById("ownerName");
  const logOut = document.getElementById("logOut");
  const balance = document.getElementById("balance");
  const avatar = document.getElementById("avatarka");
  const ownerName = document.getElementById("ownerName");
  const modalProfile = document.getElementById("modal");
  const spendBtn = document.getElementById("spendBtn");
  const depositBtn = document.getElementById("depositBtn");
  const transactionList = document.getElementById("transactionList");
  const depossitInp = document.getElementById("deposit");
  const depositTotalEl = document.getElementById("depositTotal");
  const spendTotalEl = document.getElementById("spendTotal");
  const search = document.getElementById("searchInput");
  const currentTimeEl = document.getElementById("currentTime");
  const dearUser = document.getElementById("dear");

  let isModalOpen = false;

  let dashboard = JSON.parse(localStorage.getItem("accaunts")) || {
    owner: "User",
    balance: 0,
    transactions: [],
    ownerImage: "./../resource/img/defaultavatar.jpg",
  };

  avatar.src = dashboard.ownerImage ?? "./../resource/img/defaultavatar.jpg";
  ownerName.textContent = dashboard.owner ?? "Username";
  balance.textContent = dashboard.balance.toFixed(2) ?? "0.00";
  dearUser.textContent = `Dear ${dashboard.owner}, welcome back!`;

  avatar.addEventListener("click", () => {
    isModalOpen = !isModalOpen;
    modalProfile.classList.toggle("hidden", !isModalOpen);
    modalProfile.classList.toggle("flex", isModalOpen);
  });

  logOut.addEventListener("click", () => {
    if (confirm("Profiledan chiqishni hohlaysizmi?")) {
      localStorage.removeItem("accaunts");
      window.location.replace("./../index.html");
    }
  });

  const addTransaction = (amount, type) => {
    const transaction = {
      type,
      amount,
      date: new Date().toLocaleString("uz-UZ", {
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    dashboard.transactions.push(transaction);

    if (type === "deposit") {
      dashboard.balance += amount;
    } else if (type === "spend" && dashboard.balance >= amount) {
      dashboard.balance -= amount;
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: `Hisobingizda mablag' yetarli emas`,
        showConfirmButton: false,
        timer: 2000,
        background: "rgb(255, 203, 203)",
        color: "rgb(255, 116, 116)",
        showClass: {
          popup: "swal2-show-top swal2-animate-popup",
        },
        hideClass: {
          popup: "swal2-hide-top swal2-animate-popup",
        },
      });
      return;
    }

    localStorage.setItem("accaunts", JSON.stringify(dashboard));
    balance.textContent = dashboard.balance.toFixed(2);
    updateUI();
  };

  const updateUI = (filtered = dashboard.transactions) => {
    balance.textContent = dashboard.balance.toFixed(2);
    transactionList.innerHTML = "";

    let totalDeposit = 0;
    let totalSpend = 0;

    filtered.forEach((trans) => {
      const tr = document.createElement("tr");
      const isDeposit = trans.type === "deposit";

      const tdType = document.createElement("td");
      tdType.textContent = trans.type.toUpperCase();
      tdType.style.textTransform = "uppercase";
      tdType.style.color = isDeposit ? "rgb(0, 255, 0)" : "red";

      const tdAmount = document.createElement("td");
      tdAmount.textContent = `${trans.amount.toFixed(2)} $`;

      const tdDate = document.createElement("td");
      tdDate.textContent = trans.date;

      const tdIcon = document.createElement("td");
      tdIcon.innerHTML = `<i class="ri-corner-down-${
        isDeposit ? "left" : "right"
      }-fill" style="color:${
        isDeposit ? "rgb(0, 255, 0)" : "rgb(253, 0, 0)"
      }"></i>`;

      tr.appendChild(tdType);
      tr.appendChild(tdAmount);
      tr.appendChild(tdDate);
      tr.appendChild(tdIcon);

      transactionList.appendChild(tr);

      if (isDeposit) totalDeposit += trans.amount;
      else totalSpend += trans.amount;
    });

    depositTotalEl.textContent = totalDeposit.toFixed(2);
    spendTotalEl.textContent = totalSpend.toFixed(2);
  };

  depositBtn.addEventListener("click", () => {
    const amount = parseFloat(depossitInp.value);
    if (amount > 0) {
      addTransaction(amount, "deposit");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        text: `Deposited ${amount} $!`,
        showConfirmButton: false,
        timer: 2000,
        background: "rgb(207, 255, 200)",
        color: "rgb(35, 173, 0)",
        showClass: {
          popup: "swal2-show-top swal2-animate-popup",
        },
        hideClass: {
          popup: "swal2-hide-top swal2-animate-popup",
        },
      });
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text: `Iltimos mablag' kiriting!`,
        showConfirmButton: false,
        timer: 2000,
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
    depossitInp.value = "";
  });

  spendBtn.addEventListener("click", () => {
    const amount = parseFloat(depossitInp.value);
    if (amount > 0 && dashboard.balance >= amount) {
      addTransaction(amount, "spend");
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success", // to'g'ri yozildi
        text: `Spent ${amount.toFixed(2)} $!`,
        showConfirmButton: false,
        timer: 2000,
        background: "rgb(207, 255, 200)",
        color: "rgb(35, 173, 0)",
        showClass: {
          popup: "swal2-show-top swal2-animate-popup",
        },
        hideClass: {
          popup: "swal2-hide-top swal2-animate-popup",
        },
      });
    } else {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        text:
          amount <= 0
            ? `Invalid spend amount: ${amount} $!`
            : `Not enough balance: ${dashboard.balance.toFixed(2)} $!`,
        showConfirmButton: false,
        timer: 2000,
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
    depossitInp.value = "";
  });

  search.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = dashboard.transactions.filter((t) => {
      return (
        t.type.toLowerCase().includes(keyword) ||
        t.amount.toString().includes(keyword) ||
        t.date.toLowerCase().includes(keyword)
      );
    });

    updateUI(filtered);
  });

  function updateCurrentTime() {
    const now = new Date();
    currentTimeEl.textContent = now.toLocaleString();
  }

  setInterval(updateCurrentTime, 1000);
  updateCurrentTime();

  updateUI();
});
