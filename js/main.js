'use strict';

const startBtn = document.getElementById('start');
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

startBtn.disabled=true;

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
        appData.budget = salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getInfoDeposit();

        appData.showResult();
    },
    disabledBtn: function(){        
        if (salaryAmount.value === '') {
            startBtn.disabled=true;
        }
        else{
              startBtn.disabled = false;
        }         
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        incomeItems = document.querySelectorAll('.income-items');
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
            appData.expensesMonth += appData.expenses[key];
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
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
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
        return Math.ceil(targetAmount.value / appData.expensesMonth);
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * periodSelect.value;
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
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = appData.budgetDay;
        expensesMonth.value = appData.expensesMonth;
        additionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncome.value = appData.addIncome.join(', ');
        incomePeriod.value=appData.calcSaveMoney();
        targetMonth.value = appData.getTargetMonth();
        periodSelect.addEventListener('input', appData.showResult);

    }
};
startBtn.addEventListener('click', appData.start);
expensesAddBtn.addEventListener('click', appData.addExpensesBlock);
incomeAddBtn.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
    periodAmount.textContent = periodSelect.value;
});
salaryAmount.addEventListener('input', appData.disabledBtn);





