'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
let mission = 100000;
let period = 6;

console.log('Тип данных переменной money:',typeof money);
console.log('Тип данных переменной income:',typeof income);
console.log('Тип данных переменной deposit:',typeof deposit);

console.log('Длина строки',addExpenses.length);

console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase().split(' '));

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

let period2 = mission/budgetMonth;
console.log('Цель будет достугнута за:',Math.ceil(period2), 'месяцев');
let budgetDay = budgetMonth/30;
console.log(Math.floor(budgetDay));
if(budgetDay>=1200){
    console.log('У вас высокий уровень дохода');
}else if(budgetDay>=600){
    console.log('У вас средний уровень дохода');
}else if(budgetDay<0){
    console.log('Что то пошло не так');    
}else {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
