class BankAccount {
  constructor(ownerName, initialBalance = 0) {
    this.ownerName = ownerName;               // Name of the account owner
    this.balance = initialBalance;            // Starting balance, defaults to 0 if not provided
    this.acctNum = BankAccount.generateAccountNumber();  // Account number, generated automatically
  }

  // Static method to generate a unique account number
  static generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000); // Generates a random 10-digit number
  }

  // Simple deposit method
  deposit(amount) {
    this.balance += amount;
  }

  // Simple withdraw method
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    }
  }
}

class CheckingAccount extends BankAccount {
  constructor(ownerName, initialBalance = 0, overdraftEnabled = false) {
    super(ownerName, initialBalance);  // Call the parent constructor
    this.overdraftEnabled = overdraftEnabled;  // Set the overdraft feature (true or false)
  }

  // Override withdraw method to implement overdraft
  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else if (this.overdraftEnabled) {
      this.balance -= amount;  // Allow withdrawal even if balance is insufficient
    } else {
      console.log("Insufficient funds, and overdraft is not enabled.");
    }
  }
}

class SavingsAccount extends BankAccount {
  constructor(ownerName, initialBalance = 0) {
    super(ownerName,initialBalance);
  }
  
  //override withdraw method to prevent withdrawals
  withdraw(amount) {
    console.log("cannot widthdraw from a Savings account");
  }

}

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
    sayHello() {
      console.log(`Hi my name is ${this.firstName} ${this.lastName}`);
  }
}

class Employee extends Person{
  constructor(firstName, lastName, company, wage, active) {
    super(firstName, lastName);
    this.company = company;
    this.wage = wage;
    this.active = true;
  }

  recieveRaise(wage) {
    this.wage = wage * 1.2;
  }

  terminate() {
    this.active = false;
  }
  
}

class Manager extends Employee {
  constructor(firstName, lastName, company, wage, active, department) {
    super(firstName, lastName, company, wage, active);
    this.department = department;
  }

  giveRaise(Employee, wage) {
    Employee.recieveRaise(wage);
  }
}

class Worker extends Employee {
  constructor(firstName, lastName, company, wage, active, manager) {
    super(firstName, lastName, company, wage, active);
    this.manager = manager;
  }

  changeManager(manager) {
    this.manager = manager;
  }
}


// Arrays to store instances
const bankAccounts = [];
const checkingAccounts = [];
const persons = [];

// Create Bank Account
function createBankAccount() {
    const ownerName = document.getElementById('ownerName').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);
    const bankAccount = new BankAccount(ownerName, initialBalance);
    bankAccounts.push(bankAccount);  // Store instance

    const output = `
        <p>Bank Account Created:</p>
        <p>Owner: ${bankAccount.ownerName}</p>
        <p>Balance: $${bankAccount.balance}</p>
        <p>Account Number: ${bankAccount.acctNum}</p>
    `;

    document.getElementById('bankAccountOutput').innerHTML = output;

    // Clear input fields
    document.getElementById('ownerName').value = '';
    document.getElementById('initialBalance').value = '';
}

// Create Checking Account
function createCheckingAccount() {
    const ownerName = document.getElementById('checkingOwnerName').value;
    const initialBalance = parseFloat(document.getElementById('checkingInitialBalance').value);
    const overdraftEnabled = document.getElementById('overdraftEnabled').checked;
    const checkingAccount = new CheckingAccount(ownerName, initialBalance, overdraftEnabled);
    checkingAccounts.push(checkingAccount);  // Store instance

    const output = `
        <p>Checking Account Created:</p>
        <p>Owner: ${checkingAccount.ownerName}</p>
        <p>Balance: $${checkingAccount.balance}</p>
        <p>Overdraft Enabled: ${checkingAccount.overdraftEnabled}</p>
        <p>Account Number: ${checkingAccount.acctNum}</p>
    `;

    document.getElementById('checkingAccountOutput').innerHTML = output;

    // Clear input fields
    document.getElementById('checkingOwnerName').value = '';
    document.getElementById('checkingInitialBalance').value = '';
    document.getElementById('overdraftEnabled').checked = false;
}

// Create Person
function createPerson() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const person = new Person(firstName, lastName);
    persons.push(person);  // Store instance

    const output = `
        <p>Person Created:</p>
        <p>First Name: ${person.firstName}</p>
        <p>Last Name: ${person.lastName}</p>
    `;

    document.getElementById('personOutput').innerHTML = output;

    // Clear input fields
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
}

// View All Data
function viewAllData() {
    const dataTable = document.getElementById('dataTable');
    const tbody = dataTable.querySelector('tbody');
    tbody.innerHTML = '';  // Clear existing data

    // Add bank accounts to table
    bankAccounts.forEach(account => {
        const row = `<tr>
            <td>Bank Account</td>
            <td>${account.ownerName}</td>
            <td>Balance: $${account.balance}, Account Number: ${account.acctNum}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Add checking accounts to table
    checkingAccounts.forEach(account => {
        const row = `<tr>
            <td>Checking Account</td>
            <td>${account.ownerName}</td>
            <td>Balance: $${account.balance}, Overdraft: ${account.overdraftEnabled}, Account Number: ${account.acctNum}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Add persons to table
    persons.forEach(person => {
        const row = `<tr>
            <td>Person</td>
            <td>${person.firstName} ${person.lastName}</td>
            <td>N/A</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    dataTable.style.display = 'table';  // Show the table
}
