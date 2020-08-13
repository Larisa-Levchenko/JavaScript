'use strict';
let money;
let income = 'фриланс';
let mission = 100000;
let period = 6;
let expenses = [];
const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
    
};

let start = function(){
    do {
        money = prompt('Ваш месячный доход?');       
    }
    while(!isNumber(money));
};

start();

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'шопинг, транспорт');
let deposit = confirm('Есть ли у вас депозит в банке?');

let getExpensesMonth = function() {
    let sum = 0;      
    for(let i = 0; i<2; i++){
        let amount;  
        expenses[i]=prompt('Введите обязательную статью расходов?');
        do {
            amount = prompt('Во сколько это обойдется?');      
        }
        while(!isNumber(amount));
        sum+=+amount; 
    }
    return sum;
};
let expensesAmount = getExpensesMonth();

function showTypeOf(data){
    console.log(typeof(data));
}

function getAccumulatedMonth(){
    return +money-expensesAmount;
}
let accumulatedMonth = getAccumulatedMonth();

function getTargetMonth(){
    return Math.ceil(mission/accumulatedMonth);
}
let budgetDay = Math.floor(accumulatedMonth/30);

function getStatusIncome(){
    if(budgetDay>=1200){
        console.log('У вас высокий уровень дохода');
    }else if(budgetDay>=600 && budgetDay<1200){
        console.log('У вас средний уровень дохода');
    }else if(budgetDay>0 && budgetDay<600){
        console.log('К сожалению у вас уровень дохода ниже среднего');
    }else if(budgetDay<=0){
        console.log('Что то пошло не так');    
    }    
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(money);
console.log(expenses);
console.log('Расходы за месяц:',expensesAmount);
console.log(addExpenses.toLowerCase().split(' '));
if(getTargetMonth()>0){
    console.log('Cрок достижения цели в месяцах:', getTargetMonth());
}
else{
    console.log('Цель не будет достигнута');
}
console.log('Бюджет на день:', budgetDay );
getStatusIncome();