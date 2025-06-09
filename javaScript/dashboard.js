window.addEventListener("DOMContentLoaded", () => {

  // Dashboard konstruktori
  function Dashboard() {
    // HTML elementlarni saqlab qo'yamiz
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

    // Ma'lumotlarni olish (yoki default qiymat)
    let savedData = localStorage.getItem("accaunts");
    if (savedData) {
      this.data = JSON.parse(savedData);
    } else {
      this.data = {
        owner: "Guest",
        balance: 0,
        transactions: [],
        ownerImage: "./../resource/img/defaultavatar.jpg",
      };
    }

    this.init(); // boshlanish
  }

  // Boshlang'ich ishlarni bajarish
  Dashboard.prototype.init = function () {
    this.renderProfile(); // profilni chiqarish
    this.updateUI(); // interfeysni yangilash
    this.setEvents(); // hodisalarni o'rnatish
    this.updateTime(); // vaqtni ko‘rsatish
    setInterval(() => this.updateTime(), 1000); // har 1 soniyada vaqtni yangilash
  };

  // Profildagi ma'lumotlarni chiqarish
  Dashboard.prototype.renderProfile = function () {
    this.avatar.src = this.data.ownerImage || "./../resource/img/defaultavatar.jpg";
    this.ownerName.textContent = this.data.owner || "Username";
    this.balanceEl.textContent = this.data.balance.toFixed(2);
    this.dearUser.textContent = "Dear " + this.data.owner + ", welcome back!";
  };

  // Hodisalar (eventlar) bilan ishlash
  Dashboard.prototype.setEvents = function () {
    let self = this; // kontekstni saqlab olish (eski usulda)

    // Profil rasmi bosilganda modal ochiladi
    this.avatar.addEventListener("click", function () {
      self.isModalOpen = !self.isModalOpen;
      self.modalProfile.classList.toggle("hidden", !self.isModalOpen);
      self.modalProfile.classList.toggle("flex", self.isModalOpen);
    });

    // Log out bosilganda
    this.logOut.addEventListener("click", function () {
      let confirmLogout = confirm("Profiledan chiqishni hohlaysizmi?");
      if (confirmLogout) {
        localStorage.removeItem("accaunts");
        window.location.href = "./../index.html";
      }
    });

    // Deposit tugmasi
    this.depositBtn.addEventListener("click", function () {
      self.handleTransaction("deposit");
    });

    // Spend tugmasi
    this.spendBtn.addEventListener("click", function () {
      self.handleTransaction("spend");
    });

    // Qidiruv
    this.searchInput.addEventListener("input", function (e) {
      let searchText = e.target.value.toLowerCase().trim();
      let filtered = self.data.transactions.filter(function (t) {
        return (
          t.type.toLowerCase().includes(searchText) ||
          t.amount.toString().includes(searchText) ||
          t.date.toLowerCase().includes(searchText)
        );
      });
      self.updateUI(filtered);
    });
  };

  // Tranzaksiyani qo‘shish
  Dashboard.prototype.handleTransaction = function (type) {
    let amount = parseFloat(this.depositInput.value);

    if (isNaN(amount) || amount <= 0) {
      this.showAlert("error", "Iltimos mablag' kiriting!");
      this.depositInput.value = "";
      return;
    }

    if (type === "spend" && this.data.balance < amount) {
      this.showAlert("error", "Not enough balance: " + this.data.balance.toFixed(2) + " $!");
      this.depositInput.value = "";
      return;
    }

    this.addTransaction(amount, type);

    let message = (type === "deposit" ? "Deposited" : "Spent") + " " + amount.toFixed(2) + " $!";
    this.showAlert("success", message);
    this.depositInput.value = "";
  };

  // Tranzaksiyani saqlash va yangilash
  Dashboard.prototype.addTransaction = function (amount, type) {
    let newTransaction = {
      type: type,
      amount: amount,
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
    } else {
      this.data.balance -= amount;
    }

    this.data.transactions.push(newTransaction);
    localStorage.setItem("accaunts", JSON.stringify(this.data));
    this.updateUI();
  };

  // Interfeysni yangilash
  Dashboard.prototype.updateUI = function (transactions) {
    if (!transactions) transactions = this.data.transactions;

    this.balanceEl.textContent = this.data.balance.toFixed(2);
    this.transactionList.innerHTML = "";

    let totalDeposit = 0;
    let totalSpend = 0;

    transactions.forEach(function (t) {
      let isDeposit = t.type === "deposit";
      let tr = document.createElement("tr");

      tr.innerHTML = `
        <td style="text-transform: uppercase; color: ${isDeposit ? "green" : "red"}">${t.type}</td>
        <td>${t.amount.toFixed(2)} $</td>
        <td>${t.date}</td>
        <td><i class="ri-corner-down-${isDeposit ? "left" : "right"}-fill" style="color: ${isDeposit ? "green" : "red"}"></i></td>
      `;

      this.transactionList.appendChild(tr);

      if (isDeposit) totalDeposit += t.amount;
      else totalSpend += t.amount;
    }, this); // `.forEach` ichida `this` ishlashi uchun ikkinchi parametr kerak

    this.depositTotalEl.textContent = totalDeposit.toFixed(2);
    this.spendTotalEl.textContent = totalSpend.toFixed(2);
  };

  // Joriy vaqtni yangilash
  Dashboard.prototype.updateTime = function () {
    let now = new Date();
    this.currentTimeEl.textContent = now.toLocaleString();
  };

  // Alert chiqarish (SweetAlert bilan)
  Dashboard.prototype.showAlert = function (icon, message) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: icon,
      text: message,
      showConfirmButton: false,
      timer: 2000,
      background: icon === "success" ? "#d7ffd7" : "#ffd7d7",
      color: icon === "success" ? "green" : "red",
    });
  };

  // Konstruktordan obyekt yaratamiz
  new Dashboard();
});
