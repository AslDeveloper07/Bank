class Dashboard {
  constructor() {
    this.initElements();
    this.loadData();
    this.bindEvents();
    this.updateCurrentTime();
    setInterval(() => this.updateCurrentTime(), 1000);
    this.updateUI();
  }

  initElements() {
    this.profileName = document.getElementById("ownerName");
    this.logOut = document.getElementById("logOut");
    this.balance = document.getElementById("balance");
    this.avatar = document.getElementById("avatarka");
    this.ownerName = document.getElementById("ownerName");
    this.modalProfile = document.getElementById("modal");
    this.spendBtn = document.getElementById("spendBtn");
    this.depositBtn = document.getElementById("depositBtn");
    this.transactionList = document.getElementById("transactionList");
    this.depossitInp = document.getElementById("deposit");
    this.depositTotalEl = document.getElementById("depositTotal");
    this.spendTotalEl = document.getElementById("spendTotal");
    this.search = document.getElementById("searchInput");
    this.currentTimeEl = document.getElementById("currentTime");
    this.dearUser = document.getElementById("dear");

    this.isModalOpen = false;
  }

  loadData() {
    this.dashboard = JSON.parse(localStorage.getItem("accaunts")) || {
      owner: "User",
      balance: 0,
      transactions: [],
      ownerImage: "./../resource/img/defaultavatar.jpg",
    };

    this.avatar.src = this.dashboard.ownerImage;
    this.ownerName.textContent = this.dashboard.owner;
    this.balance.textContent = this.dashboard.balance.toFixed(2);
    this.dearUser.textContent = `Dear ${this.dashboard.owner}, welcome back!`;
  }

  bindEvents() {
    this.avatar.addEventListener("click", () => this.toggleModal());
    this.logOut.addEventListener("click", () => this.logout());
    this.depositBtn.addEventListener("click", () => this.handleDeposit());
    this.spendBtn.addEventListener("click", () => this.handleSpend());
    this.search.addEventListener("input", (e) => this.handleSearch(e));
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    this.modalProfile.classList.toggle("hidden", !this.isModalOpen);
    this.modalProfile.classList.toggle("flex", this.isModalOpen);
  }

  logout() {
    if (confirm("Profiledan chiqishni hohlaysizmi?")) {
      localStorage.removeItem("accaunts");
      window.location.replace("./../index.html");
    }
  }

  handleDeposit() {
    const amount = parseFloat(this.depossitInp.value);
    if (amount > 0) {
      this.addTransaction(amount, "deposit");
      this.showToast(`Deposited ${amount} $!`, "success");
    } else {
      this.showToast(`Iltimos mablag' kiriting!`, "error");
    }
    this.depossitInp.value = "";
  }

  handleSpend() {
    const amount = parseFloat(this.depossitInp.value);
    if (amount > 0 && this.dashboard.balance >= amount) {
      this.addTransaction(amount, "spend");
      this.showToast(`Spent ${amount.toFixed(2)} $!`, "success");
    } else {
      this.showToast(
        amount <= 0
          ? `Invalid spend amount: ${amount} $!`
          : `Not enough balance: ${this.dashboard.balance.toFixed(2)} $!`,
        "error"
      );
    }
    this.depossitInp.value = "";
  }

  handleSearch(e) {
    const keyword = e.target.value.toLowerCase().trim();
    const filtered = this.dashboard.transactions.filter(
      (t) =>
        t.type.toLowerCase().includes(keyword) ||
        t.amount.toString().includes(keyword) ||
        t.date.toLowerCase().includes(keyword)
    );
    this.updateUI(filtered);
  }

  updateCurrentTime() {
    const now = new Date();
    this.currentTimeEl.textContent = now.toLocaleString();
  }

  showToast(message, type = "success") {
    const isError = type === "error";
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: type,
      text: message,
      showConfirmButton: false,
      timer: 2000,
      background: isError ? "rgb(255, 203, 203)" : "rgb(207, 255, 200)",
      color: isError ? "rgb(255, 116, 116)" : "rgb(35, 173, 0)",
      showClass: {
        popup: "swal2-show-top swal2-animate-popup",
      },
      hideClass: {
        popup: "swal2-hide-top swal2-animate-popup",
      },
    });
  }

  addTransaction(amount, type) {
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
      this.dashboard.balance += amount;
    } else if (type === "spend") {
      if (this.dashboard.balance < amount) {
        this.showToast("Hisobingizda mablag' yetarli emas", "error");
        return;
      }
      this.dashboard.balance -= amount;
    }

    this.dashboard.transactions.push(transaction);
    localStorage.setItem("accaunts", JSON.stringify(this.dashboard));
    this.balance.textContent = this.dashboard.balance.toFixed(2);
    this.updateUI();
  }

  updateUI(filtered = this.dashboard.transactions) {
    this.balance.textContent = this.dashboard.balance.toFixed(2);
    this.transactionList.innerHTML = "";

    let totalDeposit = 0;
    let totalSpend = 0;

    filtered.forEach((trans) => {
      const tr = document.createElement("tr");
      const isDeposit = trans.type === "deposit";

      tr.innerHTML = `
          <td style="text-transform:uppercase;color:${
            isDeposit ? "rgb(0, 255, 0)" : "red"
          }">${trans.type}</td>
          <td>${trans.amount.toFixed(2)} $</td>
          <td>${trans.date}</td>
          <td><i class="ri-corner-down-${
            isDeposit ? "left" : "right"
          }-fill" style="color:${
        isDeposit ? "rgb(0, 255, 0)" : "rgb(253, 0, 0)"
      }"></i></td>
        `;

      this.transactionList.appendChild(tr);

      isDeposit ? (totalDeposit += trans.amount) : (totalSpend += trans.amount);
    });

    this.depositTotalEl.textContent = totalDeposit.toFixed(2);
    this.spendTotalEl.textContent = totalSpend.toFixed(2);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  new Dashboard();
});
