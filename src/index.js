const express = require("express");
const dotenv=require("dotenv");
var bodyParser = require("body-parser");
const cors=require("cors");
const dbConnect=require('./config/db');
const readline = require('readline');
const dashboard=require('./dash/dash.router');
const user=require("./users/users.router");
const banking=require("./banking/banking.router");
const Account=require("./banking/banking.model")

dotenv.config();
let PORT =process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.json());

dbConnect();


console.log('Welcome to the Banking Application');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter command:', (line) => {
    handleCommand(line);
    rl.close();
});


// Function to handle user commands
function handleCommand(line) {
    const parts = line.split(' ');
    const command = parts[0];
    let code;
    let name;
    let amount;
   if(command==="CREATE"){
    code=parts[1];
    name=parts[2];
   }
   else if(command==="DEPOSIT"){
    code=parts[1];
    amount=parts[2];
   }
   else if(command==="WITHDRAW"){
    code=parts[1];
    amount=parts[2];
   }
   else if(command==="BALANCE"){
    code=parts[1];
   }

    switch (command) {
        case 'CREATE':
            // Create new account
            const newAccount = new Account({ code, name });
            newAccount.save((err) => {
                if (err) {
                    console.log(`Error creating account: ${err}`);
                } else {
                    console.log(`Account ${code} created for ${name} with initial balance of 0.`);
                }
            });
            break;
        case 'DEPOSIT':
            // Deposit amount to account
            Account.findOneAndUpdate({ code }, { $inc: { balance: amount } }, (err) => {
                if (err) {
                    console.log(`Error depositing amount: ${err}`);
                } else {
                    console.log(`Deposited ${amount} to account ${code}.`);
                }
            });
            break;
        case 'WITHDRAW':
            // Withdraw amount from account
            Account.findOne({ code }, (err, account) => {
                if (err) {
                    console.log(`Error withdrawing amount: ${err}`);
                } else if (!account) {
                    console.log(`Account ${code} not found.`);
                } else if (account.balance < amount) {
                    console.log(`Insufficient balance in account ${code}.`);
                } else {
                    Account.findOneAndUpdate({ code }, { $inc: { balance: -amount } }, (err) => {
                        if (err) {
                            console.log(`Error withdrawing amount: ${err}`);
                        } else {
                            console.log(`Withdraw ${amount} from account ${code}.`);
                        }
                    });
                }
            });
            break;
        case 'BALANCE':
            // Show account balance
            Account.findOne({ code }, (err, account) => {
                if (err) {
                    console.log(`Error showing balance: ${err}`);
                } else {
                    console.log(`balance ${account} from account ${code}.`)
                }
            
            });
            break;

            default:
            console.log('Invalid command.');
        }
    }



// app.use("/data",dashboard);
// app.use("/users",user);
// app.use("/kelp",banking)

// app.listen(PORT||8080, async () => {
//   await dbConnect();
//   console.log(`Listening on http://localhost:${PORT}`);
// });
