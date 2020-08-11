'use strict';

let money = +prompt('Ваш месячный доход?', '40000');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'шопинг, транспорт');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?', 'продукты');
let amount1 = +prompt('Во сколько это обойдется?', '10000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'квартплата');
let amount2 = +prompt('Во сколько это обойдется?', '5000');
let mission = 100000;
let period = 6;

function showTypeOf(data){
    console.log(typeof(data));
}

function  getExpensesMonth(){
    return amount1+amount2;
}

function getAccumulatedMonth(){
    return money-getExpensesMonth();
}
let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth(){
    return Math.ceil(mission/accumulatedMonth);
}
let budgetDay = Math.floor(accumulatedMonth/30);

function getStatusIncome(){
    if(budgetDay>=1200){
        return ('У вас высокий уровень дохода');
    }else if(budgetDay>=600){
        return ('У вас средний уровень дохода');
    }else if(budgetDay<0){
        return ('Что то пошло не так');    
    }else {
        return ('К сожалению у вас уровень дохода ниже среднего');
    }
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц:',accumulatedMonth);
console.log(addExpenses.toLowerCase().split(' '));
console.log('Cрок достижения цели в месяцах:', getTargetMonth());
console.log('Бюджет на день:', budgetDay );
console.log(getStatusIncome());