'use strict';

const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);

};
const isString = function (n) {
    if (n !== null) {
        return n.trim().length !== 0;

    } else {
        return n !== null;
    }
};
let money,
    start = function () {
        do {
            money = prompt('Ваш месячный доход?');
        }
        while (!isNumber(money));
    };

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 5,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    persentDeposit: 0,
    moneyDeposit: 0,
    asking: function () {
        if (confirm('У вас есть дополнительный заработок?')) {
            let itemIncome,
                cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
            }
            while (isNumber(itemIncome) || !isString(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
            }
            while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'шопинг, транспорт');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.addExpenses = addExpenses.toLowerCase().split(' ');
        for (let i = 0; i < 2; i++) {
            let amount, expenses;
            do {
                expenses = prompt('Введите обязательную статью расходов?');
            }
            while (isNumber(expenses) || !isString(expenses));

            do {
                amount = prompt('Во сколько это обойдется?');
            }
            while (!isNumber(amount));
            appData.expenses[expenses] = +amount;


        }
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.expensesMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay > 0 && appData.budgetDay < 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (appData.budgetDay <= 0) {
            return 'Что то пошло не так';
        }

    },
    getInfoDeposit: function () {
        if (appData.deposit) {
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
    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;
    },
    getExpenses: function(){
        for (let i = 0; i < appData.addExpenses.length; i++) {
            let tmp = appData.addExpenses[i].charAt(0);
            appData.addExpenses[i] = appData.addExpenses[i].substring(1);
            appData.addExpenses[i] = tmp.toLocaleUpperCase() + appData.addExpenses[i];
        }
    }

};


appData.asking();
appData.getBudget();
console.log('Расходы за месяц', appData.expensesMonth);
console.log('Cрок достижения цели в месяцах:', appData.getTargetMonth());
console.log('Уровень дохода', appData.getStatusIncome());
appData.getInfoDeposit();
console.log(appData.calcSaveMoney());
appData.getExpenses();
console.log(appData.addExpenses);
for (let key in appData) {
    console.log('Ключ:', key, 'Значение:', appData[key]);
}
console.log(appData.expenses[0]);