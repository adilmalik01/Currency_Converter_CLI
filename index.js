#! /usr/bin/env node
import inquirer from "inquirer";
import axios from "axios";
import chalk from "chalk";
import { Table } from "console-table-printer";
let blue = chalk.bold.blue.italic;
let yellow = chalk.bold.yellow.italic;
console.log(blue("\n########################################################################"));
console.log(blue("################ Currency Converter Made By Adil Malik #################"));
console.log(blue("######################################################################## \n"));
async function selectCurrency() {
    let prompt = await inquirer.prompt([
        {
            name: "from",
            type: "list",
            choices: ["AMD", "AUD", "AFN", "EUR", "GBP", "CAD", "INR", "USD", "PKR"],
            message: yellow("which currency do you  to convert ?"),
        },
        {
            name: "to",
            type: "list",
            choices: ["AMD", "AUD", "AFN", "EUR", "GBP", "CAD", "INR", "USD", "PKR"],
            message: yellow("What currency do you want to convert to ?"),
        },
        {
            name: "amount",
            type: "string",
            message: yellow("Enter Your Amount which you convert ?"),
        },
    ]);
    let from = prompt.from;
    let to = prompt.to;
    let amount = prompt.amount;
    fetchApi(from, to, amount);
}
let apiKey = '7d1dbfbb0d60994aba2b3cc8';
async function fetchApi(from, to, amount) {
    try {
        let response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`);
        const p = new Table();
        p.addRow({
            "from Curreny": from,
            "to Currency": to,
            Amount: amount,
            "Conversion Rate": response.data.conversion_rate,
            "Conversion Result": response.data.conversion_result
        }, { color: 'green' });
        p.printTable();
    }
    catch (error) {
        console.log(error);
    }
}
selectCurrency();
// let currenys: any = {
//     USD: 0.42,
//     PKR: 0.42,
//     GBP: 0.42,
//     EURO: 0.42,
//     TSD: 0.42,
// }
// console.log(prompt.from);
// console.log(prompt.amount);
// console.log(prompt.to);
// console.log(currenys[prompt.from]);
