// @ts-nocheck

let account = null;

class BankAccount {
    constructor(accountNumber, accountHolder, balance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        return this.balance;
    }

    withdraw(amount) {
        if (amount > this.balance) {
            return "Insufficient funds!";
        }
        this.balance -= amount;
        return this.balance;
    }

    getDetails() {
        return {
            accountNumber: this.accountNumber,
            accountHolder: this.accountHolder,
            balance: this.balance
        };
    }
}

function createAccount() {
    const accNum = document.getElementById('accountNumber').value;
    const accHolder = document.getElementById('accountHolder').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    if (isNaN(initialBalance) || initialBalance < 0) {
        alert('Invalid balance amount!');
        return;
    }

    account = new BankAccount(accNum, accHolder, initialBalance);

    document.getElementById('accountForm').style.display = 'none';
    document.getElementById('accountDetails').classList.remove('hidden');

    updateAccountDetails();
}

function updateAccountDetails() {
    if (!account) return;
    const details = account.getDetails();

    document.getElementById('accNumDisplay').innerText = details.accountNumber;
    document.getElementById('accHolderDisplay').innerText = details.accountHolder;
    document.getElementById('balanceDisplay').innerText = details.balance.toFixed(2);
}

function deposit() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('message').innerText = "Invalid deposit amount!";
        return;
    }
    account.deposit(amount);
    updateAccountDetails();
    document.getElementById('message').innerText = "Deposit successful!";
}

function withdraw() {
    const amount = parseFloat(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('message').innerText = "Invalid withdrawal amount!";
        return;
    }
    const result = account.withdraw(amount);
    if (typeof result === "string") {
        document.getElementById('message').innerText = result;
    } else {
        updateAccountDetails();
        document.getElementById('message').innerText = "Withdrawal successful!";
    }
}