import inquirer from "inquirer"

interface Account {
  username: string;
  pin: string;
  balance: number;

}


const accounts: Account[] = [
  { username: 'farrukh', pin: '1234', balance: 5000 },

];

async function login() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'password',
      name: 'pin',
      message: 'Enter your PIN:',
      mask: '*',
      validate(input) {
        if (input.length === 4) {
          return true;
        }
        return "please enter your  pin of four digit";
      },
    },
  ]);

  const userAccount = accounts.find(account => account.username === userInput.username && account.pin === userInput.pin);


  if (userAccount) {
    console.log(`Welcome, ${userAccount.username}!`);
    showOptions(userAccount);
  } else {
    console.log('Invalid username. Please try again.');
  }
}
async function showOptions(user: Account) {
  const options = await inquirer.prompt({
    type: 'list',
    name: 'choice',
    message: 'Choose an option:',
    choices: ['Withdraw Money', 'Check Balance', 'Exit'],
  });

  switch (options.choice) {
    case 'Withdraw Money':
      withdrawMoney(user);
      break;
    case 'Check Balance':
      checkBalance(user);
      break;
    case 'Exit':
      console.log('Thank you for using the ATM. Goodbye!');
      break;
  }

}


async function withdrawMoney(user: Account) {
  const withdrawalAmount = await inquirer.prompt({
    type: 'number',
    name: 'withdrawalAmount',
    message: 'Enter the amount to withdraw:',
    validate: input => input > 0,

  });

  if (withdrawalAmount.withdrawalAmount > user.balance) {
    console.log('Withdrawal amount exceeds available balance. Please enter a valid amount.');
  } else {
    user.balance -= withdrawalAmount.withdrawalAmount;
    console.log(`Withdrawal successful! Remaining balance: Rupees ${user.balance}`);
  }

  showOptions(user);
}



function checkBalance(user: Account) {
  console.log(`Your current balance is: $${user.balance}`);
  showOptions(user);
}


// Start the login process
login();

