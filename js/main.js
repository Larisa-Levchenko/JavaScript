'use strict';

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');
const btn = document.getElementsByTagName('button');
const incomeAddBtn = document.getElementsByTagName('button')[0];
const expensesAddBtn = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
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


class AppData {
    constructor() {
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
    }

    start() {
        this.default = new AppData();
        this.budget = salaryAmount.value;        
        this.getExpInc();
        this.getInfoDeposit();
        this.getBudget();
        this.getAddExpInc(); 
        
        this.showResult();
        startBtn.style.display = 'none';
        cancelBtn.style.display = 'block';
        for (let i = 0; i < input.length - 7; i++) {
            input[i].disabled = true;
        }
        incomeAddBtn.disabled = true;
        expensesAddBtn.disabled = true;
        depositCheck.disabled = true;
    }

    reset() {
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
        startBtn.disabled = true;
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

        expensesAddBtn.style.display = '';
        incomeAddBtn.style.display = '';
        for (let key in this) {
            this[key] = this.default[key];
        }
        this.depositHendler();
        this.changePercent();
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);

    }
   
    addBlock() {
        const targetClass = event.target.classList;
        let startString;
        for (let i = 0; i < targetClass.length; i++) {
            if (targetClass[i] !== 'btn_plus') {
                startString = targetClass[i].split('_')[0];
            }
        }

        let items = document.querySelectorAll(`.${startString}-items`);
        const item = items[0];
        let addBtn;
        if (startString === 'income') {
            addBtn = document.getElementsByTagName('button')[0];
        }
        if (startString === 'expenses') {
            addBtn = document.getElementsByTagName('button')[1];
        }

        const cloneItem = item.cloneNode(true);
        cloneItem.querySelector(`.${startString}-title`).value = '';
        cloneItem.querySelector(`.${startString}-amount`).value = '';
        item.parentNode.insertBefore(cloneItem, addBtn);
        items = document.querySelectorAll(`.${startString}-items`);
        placeholderSum = document.querySelectorAll('[placeholder=Сумма]');
        placeholderName = document.querySelectorAll('[placeholder=Наименование]');
        this.validator();
        input = document.querySelectorAll('input[type=text]');

        if (items.length === 3) {
            addBtn.style.display = 'none';
        }
    }

    getExpInc() {
        const _this = this;
        const count = item => {
            const startString = item.className.split('-')[0];

            const itemTitle = item.querySelector(`.${startString}-title`).value;
            const itemAmount = item.querySelector(`.${startString}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                _this[startString][itemTitle] = +itemAmount;
            }
        };
        let incomeItems = document.querySelectorAll('.income-items');
        let expensesItems = document.querySelectorAll('.expenses-items');

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.expenses) {
            this.expensesMonth += this.expenses[key];
        }
    }

    getBudget() {
        const monthDeposit = this.moneyDeposit * this.persentDeposit / 100;
        this.budgetMonth = this.budget - this.expensesMonth + monthDeposit;
        //console.log();
        for (let key in this.income) {
            
            this.budgetMonth += this.income[key];
        }
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }
    
    getAddExpInc() {
        const _this = this;
        const count = (item, itemClass) => {
            itemClass = itemClass.split('_')[1];
            itemClass = itemClass.split('-')[0];
            itemClass = `add${itemClass[0].toUpperCase()}${itemClass.slice(1)}`;

            if (typeof item !== 'string') {
                item = item.value;
            }
            item = item.trim();
            if (item !== '') {
                _this[itemClass].push(item);
            }
        };

        additionalExpensesItem.value.split(',').forEach(function (item) {
            count(item, additionalExpensesItem.className);
        });
        addItionalIncomeItem.forEach(function (item) {
            count(item, item.className);
        });
    }

    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    calcSaveMoney() {
        return this.budgetMonth * periodSelect.value;
    }

    showResult() {
        budgetMonth.value = this.budgetMonth;
        budgetDay.value = this.budgetDay;
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        incomePeriod.value = this.calcSaveMoney();
        targetMonth.value = this.getTargetMonth();
        const _this = this;
        periodSelect.addEventListener('input', () => {
            incomePeriod.value = this.calcSaveMoney();
        });
    }

    addNumber() {
        if (event.keyCode < 48 || event.keyCode > 57) {
            event.returnValue = false;
        }
    }

    addText() {
        if (event.keyCode !== 32 && (event.keyCode < 1040 || event.keyCode > 1105) && (event.keyCode < 33 || event.keyCode > 47)) {
            event.returnValue = false;
        }
    }

    validator() {
        const _this = this;
        placeholderSum.forEach(function (item, i) {
            placeholderSum[i].addEventListener('keypress', _this.addNumber);
        });
        placeholderName.forEach(function (item, i) {
            placeholderName[i].addEventListener('keypress', _this.addText);
        });
    }

    periodAdd() {
        periodAmount.textContent = periodSelect.value;
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.disabled = false;
            depositPercent.value = '';
        } else {
            depositPercent.style.display = '';
            depositPercent.disabled = true;
            depositPercent.value = valueSelect * 100;
        }
    }

    depositHendler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = 'true';
            startBtn.disabled = true;
            depositBank.addEventListener('input', this.changePercent);
            depositPercent.addEventListener('input', this.validatorPercent.bind(this));
            depositAmount.addEventListener('input', this.validatorPercent.bind(this));
            depositBank.addEventListener('input', this.validatorPercent.bind(this));
        } else {
            depositBank.style.display = '';
            depositAmount.style.display = '';
            depositBank.value = 0;
            depositAmount.value = '';
            this.deposit = 'false';
            this.disabledBtn();
            depositBank.removeEventListener('input', this.validatorPercent);
            depositPercent.removeEventListener('input', this.validatorPercent.bind(this));
            depositAmount.removeEventListener('input', this.validatorPercent.bind(this));
            depositBank.removeEventListener('input', this.validatorPercent.bind(this));
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            if (this.isNumber(depositPercent.value)) {
                this.persentDeposit = +depositPercent.value;
            }
            
            this.moneyDeposit = +depositAmount.value;
        }
    }

    disabledBtn() {
        if (depositCheck.checked) {
            if (depositPercent.value !== '' && depositAmount.value !== '') {
                startBtn.disabled = !salaryAmount.value.trim();
            } else {
                startBtn.disabled = true;
            }
        } else {
            startBtn.disabled = !salaryAmount.value.trim();
        }
    }

    validatorPercent() {
        if (!(depositPercent.value > 0 && depositPercent.value < 100)) {
            if (depositBank.value !== '0' && depositPercent.value !== '') {
                alert('Введите корректное значение');
            }
            depositPercent.value = '';
        }
        this.disabledBtn();
    }

    eventsListeners() {
        startBtn.disabled = true;
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesAddBtn.addEventListener('click', this.addBlock.bind(this));
        incomeAddBtn.addEventListener('click', this.addBlock.bind(this)); 
        periodSelect.addEventListener('input', this.periodAdd.bind(this));
        salaryAmount.addEventListener('input', this.disabledBtn.bind(this));
        this.validator();
        depositCheck.addEventListener('change', this.depositHendler.bind(this));
    }
}

const appData = new AppData();
appData.eventsListeners();