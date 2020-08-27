'use strict';

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
const btn = document.getElementsByTagName('button');
const incomeAddBtn = document.getElementsByTagName('button')[0];
const expensesAddBtn = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const addItionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonth = document.getElementsByClassName('budget_month-value')[0];
const budgetDay = document.getElementsByClassName('budget_day-value')[0];
const expensesMonth = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncome = document.getElementsByClassName('additional_income-value')[0];
const additionalExpenses = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriod = document.getElementsByClassName('income_period-value')[0];
const targetMonth = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');


const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const periodAmount = document.querySelector('.period-amount');

const incomeAmount = document.querySelector('.income-amount');
const expensesAmount = document.querySelector('.expenses-amount');

let placeholderSum = document.querySelectorAll('[placeholder=Сумма]');
let placeholderName = document.querySelectorAll('[placeholder=Наименование]');
let input = document.querySelectorAll('input[type=text]');


const AppData = function () {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.period = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.start = function () {
    this.default = new AppData();
    this.budget = salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();

    this.showResult();
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
    for (let i = 0; i < input.length - 7; i++) {
        input[i].disabled = true;
    }
    incomeAddBtn.disabled = true;
    expensesAddBtn.disabled = true;
    depositCheck.disabled = true;
};

AppData.prototype.reset = function () {
    for (let i = 0; i < input.length - 7; i++) {
        input[i].disabled = false;
    }
    input.forEach(function (item) {
        item.value = '';
    });
    periodSelect.value = 1;
    periodAmount.textContent = 1;
    depositCheck.checked = false;
    cancelBtn.style.display = 'none';
    startBtn.style.display = '';
    incomeAddBtn.disabled = false;
    expensesAddBtn.disabled = false;
    depositCheck.disabled = false;
    periodSelect.disabled = false;
    for (let i = 0; i < incomeItems.length; i++) {
        if (i !== 0) {
            incomeItems[i].remove();
        }
    }
    for (let i = 0; i < expensesItems.length; i++) {
        if (i !== 0) {
            expensesItems[i].remove();
        }
    }
    startBtn.disabled = true;
    expensesAddBtn.style.display = '';
    incomeAddBtn.style.display = '';
    let key;
    for (key in this) {
        this[key] = this.default[key];
    }

};

AppData.prototype.isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);

};

AppData.prototype.disabledBtn = function () {
    startBtn.disabled = !salaryAmount.value.trim();
};

AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
    expensesItems = document.querySelectorAll('.expenses-items');
    placeholderSum = document.querySelectorAll('[placeholder=Сумма]');
    placeholderName = document.querySelectorAll('[placeholder=Наименование]');
    this.validator();
    input = document.querySelectorAll('input[type=text]');

    if (expensesItems.length === 3) {
        expensesAddBtn.style.display = 'none';
    }
};

AppData.prototype.addIncomeBlock = function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
    incomeItems = document.querySelectorAll('.income-items');
    placeholderSum = document.querySelectorAll('[placeholder=Сумма]');
    placeholderName = document.querySelectorAll('[placeholder=Наименование]');
    this.validator();
    input = document.querySelectorAll('input[type=text]');

    if (incomeItems.length === 3) {
        incomeAddBtn.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function () {
    const _this = this;
    expensesItems.forEach(function (item) {
        let titleExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (titleExpenses !== '' && cashExpenses !== '') {
            _this.expenses[titleExpenses] = +cashExpenses;
        }
    });
    for (let key in this.expenses) {
        this.expensesMonth += this.expenses[key];
    }
};

AppData.prototype.getIncome = function () {
    const _this = this;
    incomeItems.forEach(function (item) {
        let titleIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (titleIncome !== '' && cashIncome !== '') {
            _this.income[titleIncome] = +cashIncome;
        }
    });
};

AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getAddExpenses = function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function () {
    const _this = this;
    addItionalIncomeItem.forEach(function (item) {
        item.value = item.value.trim();
        if (item.value !== '') {
            _this.addIncome.push(item.value);
        }
    });
};

AppData.prototype.getTargetMonth = function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.calcSaveMoney = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.getInfoDeposit = function () {
    if (depositCheck.checked) {
        do {
            this.persentDeposit = prompt('Какой годовой процент?');
        }
        while (!this.isNumber(this.persentDeposit));
        do {
            this.moneyDeposit = prompt('Какая сумма заложена?');
        }
        while (!this.isNumber(this.moneyDeposit));

    }
};

AppData.prototype.showResult = function () {
    budgetMonth.value = this.budgetMonth;
    budgetDay.value = this.budgetDay;
    expensesMonth.value = this.expensesMonth;
    additionalExpenses.value = this.addExpenses.join(', ');
    additionalIncome.value = this.addIncome.join(', ');
    incomePeriod.value = this.calcSaveMoney();
    targetMonth.value = this.getTargetMonth();
    const _this = this;
    periodSelect.addEventListener('input', function () {
        incomePeriod.value = _this.calcSaveMoney();
    });
};

AppData.prototype.addNumber = function () {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
};

AppData.prototype.addText = function () {
    if (event.keyCode !== 32 && (event.keyCode < 1040 || event.keyCode > 1105) && (event.keyCode < 33 || event.keyCode > 47)) {
        event.returnValue = false;
    }
};

AppData.prototype.validator = function () {
    const _this = this;
    placeholderSum.forEach(function (item, i) {
        placeholderSum[i].addEventListener('keypress', _this.addNumber);
    });
    placeholderName.forEach(function (item, i) {
        placeholderName[i].addEventListener('keypress', _this.addText);
    });
};

AppData.prototype.periodAdd = function () {
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.eventsListeners = function () {
    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.reset.bind(this));
    expensesAddBtn.addEventListener('click', this.addExpensesBlock.bind(this));
    incomeAddBtn.addEventListener('click', this.addIncomeBlock.bind(this));

    periodSelect.addEventListener('input', this.periodAdd.bind(this));
    salaryAmount.addEventListener('input', this.disabledBtn.bind(this));
    this.validator();
};

const appData = new AppData();
appData.eventsListeners();
