window.addEventListener("DOMContentLoaded", () => {
  function Dashboard() {
    this.avatar = document.getElementById("avatarka");
    this.ownerName = document.getElementById("ownerName");
    this.balanceEl = document.getElementById("balance");
    this.dearUser = document.getElementById("dear");
    this.modalProfile = document.getElementById("modal");
    this.logOut = document.getElementById("logOut");
    this.spendBtn = document.getElementById("spendBtn");
    this.depositBtn = document.getElementById("depositBtn");
    this.transactionList = document.getElementById("transactionList");
    this.depositInput = document.getElementById("deposit");
    this.depositTotalEl = document.getElementById("depositTotal");
    this.spendTotalEl = document.getElementById("spendTotal");
    this.searchInput = document.getElementById("searchInput");
    this.currentTimeEl = document.getElementById("currentTime");
    this.isModalOpen = false;

    this.data = JSON.parse(localStorage.getItem("accaunts")) || {
      owner: "Guest",
      balance: 0,
      transactions: [],
      ownerImage: "./../resource/img/defaultavatar.jpg",
    };

    this.init();
  }

  Dashboard.prototype.init = function () {
    this.renderProfile();
    this.updateUI();
    this.setEvents();
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
  };

  Dashboard.prototype.renderProfile = function () {
    this.avatar.src =
      this.data.ownerImage ?? "./../resource/img/defaultavatar.jpg";
    this.ownerName.textContent = this.data.owner ?? "Username";
    this.balanceEl.textContent = this.data.balance.toFixed(2);
    this.dearUser.textContent = `Dear ${this.data.owner}, welcome back!`;
  };

  Dashboard.prototype.setEvents = function () {
    this.avatar.addEventListener("click", () => {
      this.isModalOpen = !this.isModalOpen;
      this.modalProfile.classList.toggle("hidden", !this.isModalOpen);
      this.modalProfile.classList.toggle("flex", this.isModalOpen);
    });

    this.logOut.addEventListener("click", () => {
      if (confirm("Profiledan chiqishni hohlaysizmi?")) {
        localStorage.removeItem("accaunts");
        window.location.replace("./../index.html");
      }
    });

    this.depositBtn.addEventListener("click", () =>
      this.handleTransaction("deposit")
    );
    this.spendBtn.addEventListener("click", () =>
      this.handleTransaction("spend")
    );

    this.searchInput.addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase().trim();
      const filtered = this.data.transactions.filter(
        (t) =>
          t.type.toLowerCase().includes(keyword) ||
          t.amount.toString().includes(keyword) ||
          t.date.toLowerCase().includes(keyword)
      );
      this.updateUI(filtered);
    });
  };

  Dashboard.prototype.handleTransaction = function (type) {
    const amount = parseFloat(this.depositInput.value);
    const isValid = amount > 0;

    if (!isValid) {
      this.showAlert("error", `Iltimos mablag' kiriting!`);
      this.depositInput.value = "";
      return;
    }

    if (type === "spend" && this.data.balance < amount) {
      this.showAlert(
        "error",
        `Not enough balance: ${this.data.balance.toFixed(2)} $!`
      );
      this.depositInput.value = "";
      return;
    }

    this.addTransaction(amount, type);

    this.showAlert(
      "success",
      `${type === "deposit" ? "Deposited" : "Spent"} ${amount.toFixed(2)} $!`
    );
    this.depositInput.value = "";
  };

  Dashboard.prototype.addTransaction = function (amount, type) {
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

    if (type === "deposit") {
      this.data.balance += amount;
    } else if (type === "spend") {
      this.data.balance -= amount;
    }

    this.data.transactions.push(transaction);
    localStorage.setItem("accaunts", JSON.stringify(this.data));
    this.updateUI();
  };

  Dashboard.prototype.updateUI = function (
    transactions = this.data.transactions
  ) {
    this.balanceEl.textContent = this.data.balance.toFixed(2);
    this.transactionList.innerHTML = "";

    let totalDeposit = 0;
    let totalSpend = 0;

    transactions.forEach((t) => {
      const tr = document.createElement("tr");
      const isDeposit = t.type === "deposit";

      tr.innerHTML = `
        <td style="text-transform: uppercase; color: ${
          isDeposit ? "rgb(0, 255, 0)" : "red"
        }">${t.type}</td>
        <td>${t.amount.toFixed(2)} $</td>
        <td>${t.date}</td>
        <td><i class="ri-corner-down-${
          isDeposit ? "left" : "right"
        }-fill" style="color: ${
        isDeposit ? "rgb(0, 255, 0)" : "rgb(253, 0, 0)"
      }"></i></td>
      `;

      this.transactionList.appendChild(tr);

      if (isDeposit) totalDeposit += t.amount;
      else totalSpend += t.amount;
    });

    this.depositTotalEl.textContent = totalDeposit.toFixed(2);
    this.spendTotalEl.textContent = totalSpend.toFixed(2);
  };

  Dashboard.prototype.updateTime = function () {
    const now = new Date();
    this.currentTimeEl.textContent = now.toLocaleString();
  };

  Dashboard.prototype.showAlert = function (icon, message) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      text: message,
      showConfirmButton: false,
      timer: 2000,
      background:
        icon === "success" ? "rgb(207, 255, 200)" : "rgb(255, 203, 203)",
      color: icon === "success" ? "rgb(35, 173, 0)" : "rgb(255, 116, 116)",
      showClass: {
        popup: "swal2-show-top swal2-animate-popup",
      },
      hideClass: {
        popup: "swal2-hide-top swal2-animate-popup",
      },
    });
  };

  new Dashboard();
});
