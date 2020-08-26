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
console.log();

startBtn.disabled = true;

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);

};
const isString = function (n) {
    let tmp = false;
    if (n !== null) {
        if (n.trim().length !== 0) {
            tmp = true;
            for (let i = 0; i < n.length; i++) {
                if (isNumber(n[i])) {
                    tmp = false;
                }
            }
        }
    }
    return tmp;
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    period: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    persentDeposit: 0,
    moneyDeposit: 0,
    start: function () {
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

    },
    reset: function () {
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
        this.resetValue();

    },
    resetValue: function () {
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
    },
    disabledBtn: function () {
        if (salaryAmount.value === '') {
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        placeholderSum = document.querySelectorAll('[placeholder=Сумма]');
        placeholderName = document.querySelectorAll('[placeholder=Наименование]');
        this.validator();
        input = document.querySelectorAll('input[type=text]');
        console.log(this);
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }


    },
    addIncomeBlock: function () {
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
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let titleExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (titleExpenses !== '' && cashExpenses !== '') {
                appData.expenses[titleExpenses] = +cashExpenses;                
            }
        });
        

        for (let key in appData.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let titleIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (titleIncome !== '' && cashIncome !== '') {
                appData.income[titleIncome] = +cashIncome;
            }
        });

    },
    getBudget: function () {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        addItionalIncomeItem.forEach(function (item) {
            item.value = item.value.trim();
            if (item.value !== '') {
                appData.addIncome.push(item.value);
            }
        });
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    calcSaveMoney: function () {
        return this.budgetMonth * periodSelect.value;
    },
    getInfoDeposit: function () {
        if (depositCheck.checked) {
            do {
                appData.persentDeposit = prompt('Какой годовой процент?');
            }
            while (!isNumber(appData.persentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?');
            }
            while (!isNumber(appData.moneyDeposit));

        }
    },
    showResult: function () {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        incomePeriod.value = this.calcSaveMoney();
        targetMonth.value = this.getTargetMonth();
        periodSelect.addEventListener('input', this.showResult);

    },
    addNumber: function () {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.returnValue = false;
        }
    },
    addText: function () {
        if (event.keyCode !== 32 && (event.keyCode < 1040 || event.keyCode > 1105) && (event.keyCode < 33 || event.keyCode > 47)) {
            event.returnValue = false;
        }
    },
    validator: function () {
        placeholderSum.forEach(function (item, i) {
            placeholderSum[i].addEventListener('keypress', appData.addNumber);
        });
        placeholderName.forEach(function (item, i) {
            placeholderName[i].addEventListener('keypress', appData.addText);
        });
    },
    periodAdd: function () {
        periodAmount.textContent = periodSelect.value;
    }
};

startBtn.addEventListener('click', appData.start.bind(appData));
cancelBtn.addEventListener('click', appData.reset.bind(appData));
expensesAddBtn.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomeAddBtn.addEventListener('click', appData.addIncomeBlock.bind(appData));

periodSelect.addEventListener('input', appData.periodAdd.bind(appData));
salaryAmount.addEventListener('input', appData.disabledBtn.bind(appData));
appData.validator();