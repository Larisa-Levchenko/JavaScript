'use strict';

let money = prompt('Ваш месячный доход?', '40000');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'шопинг, транспорт');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?', 'продукты');
let amount1 = prompt('Во сколько это обойдется?', '10000');
let expenses2 = prompt('Введите обязательную статью расходов?', 'квартплата');
let amount2 = prompt('Во сколько это обойдется?', '5000');
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

let period2 = Math.ceil(mission/budgetMonth);
console.log('Цель будет достугнута за:',period2, 'месяцев');
let budgetDay = Math.floor(budgetMonth/30);
console.log(budgetDay);
if(budgetDay>=1200){
    console.log('У вас высокий уровень дохода');
}else if(budgetDay>=600){
    console.log('У вас средний уровень дохода');
}else if(budgetDay<0){
    console.log('Что то пошло не так');    
}else {
    console.log('К сожалению у вас уровень дохода ниже среднего');
}
