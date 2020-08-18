'use strict';

const startBtn = document.getElementById('start');
const btn = document.getElementsByTagName('button');
const incomeAddBtn = document.getElementsByTagName('button')[0];
const expensesAddBtn = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const addItionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonth = document.getElementsByClassName('budget_month-value');
const budgetDay = document.getElementsByClassName('budget_day-value');
const expensesMonth = document.getElementsByClassName('expenses_month-value');
const additionalIncome = document.getElementsByClassName('additional_income-value');
const additionalExpenses = document.getElementsByClassName('additional_expenses-value');
const incomePeriod = document.getElementsByClassName('income_period-value');
const targetMonth = document.getElementsByClassName('target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incomeItems = document.querySelector('.income-items');
const incomeTitle = incomeItems.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');
const expensesItems = document.querySelector('.expenses-items');
const expensesTitle = expensesItems.querySelector('.expenses-title');
const expensesAmount = document.querySelector('.expenses-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');