let money = 30000;
let income = 'фриланс';
let addExpenses = 'Продукты, Комуналка, Интернет, Шопинг';
let deposit = true;
let mission = 100000;
let period = 6;

console.log('Тип данных переменной money:',typeof money);
console.log('Тип данных переменной income:',typeof income);
console.log('Тип данных переменной deposit:',typeof deposit);

console.log('Длина строки',addExpenses.length);

console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase().split(' '));


let budgetDay = money/30;
console.log(budgetDay);
