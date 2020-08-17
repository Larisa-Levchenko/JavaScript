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

let itemIncome;

do {
    itemIncome= prompt('Какой у вас дополнительный заработок?');    
    console.log(isNumber(itemIncome) || !isString(itemIncome));
}
while (isNumber(itemIncome) || !isString(itemIncome));
