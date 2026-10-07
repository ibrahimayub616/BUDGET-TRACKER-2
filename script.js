```javascript
// ==========================================
// SpendWise Interactive Budget Tracker
// ==========================================


// ==========================================
// 1. ARRAY
// Store all transaction records
// ==========================================

let transactions = [];


// ==========================================
// 2. SELECT HTML ELEMENTS
// ==========================================

const transactionForm = document.getElementById("transactionForm");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expensesDisplay = document.getElementById("expenses");
const transactionCountDisplay =
    document.getElementById("transactionCount");

const transactionList =
    document.getElementById("transactionList");

const budgetMessage =
    document.getElementById("budgetMessage");


// ==========================================
// 3. EVENT LISTENER
// Listen for form submission
// ==========================================

transactionForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing
    event.preventDefault();


    // ==========================================
    // Get values from the form
    // ==========================================

    const description = descriptionInput.value.trim();

    const amount = Number(amountInput.value);

    const type = typeInput.value;

    const category = categoryInput.value;


    // ==========================================
    // 4. CONDITIONAL STATEMENTS
    // Validate user input
    // ==========================================

    if (description === "") {

        alert("Please enter a description.");

        return;
    }


    if (amount <= 0 || isNaN(amount)) {

        alert("Please enter a valid amount.");

        return;
    }


    // ==========================================
    // Create transaction object
    // ==========================================

    const transaction = {

        description: description,

        amount: amount,

        type: type,

        category: category

    };


    // ==========================================
    // Add transaction to ARRAY
    // ==========================================

    transactions.push(transaction);


    // ==========================================
    // Update the dashboard
    // ==========================================

    updateDashboard();


    // ==========================================
    // Clear the form
    // ==========================================

    transactionForm.reset();

});


// ==========================================
// 5. UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    // Start totals at zero

    let totalIncome = 0;

    let totalExpenses = 0;


    // ==========================================
    // 6. LOOP THROUGH TRANSACTIONS
    // ==========================================

    for (
        let i = 0;
        i < transactions.length;
        i++
    ) {

        const transaction = transactions[i];


        // ==========================================
        // CONDITIONAL
        // Check transaction type
        // ==========================================

        if (transaction.type === "income") {

            totalIncome += transaction.amount;

        }

        else if (transaction.type === "expense") {

            totalExpenses += transaction.amount;

        }

    }


    // ==========================================
    // Calculate balance
    // ==========================================

    const balance = totalIncome - totalExpenses;


    // ==========================================
    // 7. DOM MANIPULATION
    // Update dashboard values
    // ==========================================

    balanceDisplay.textContent =
        `KES ${balance.toLocaleString()}`;

    incomeDisplay.textContent =
        `KES ${totalIncome.toLocaleString()}`;

    expensesDisplay.textContent =
        `KES ${totalExpenses.toLocaleString()}`;

    transactionCountDisplay.textContent =
        transactions.length;


    // ==========================================
    // 8. BUDGET FEEDBACK
    // Use conditionals to give feedback
    // ==========================================

    if (transactions.length === 0) {

        budgetMessage.textContent =
            "Add a transaction to see your budget status.";

    }

    else if (balance > 0) {

        budgetMessage.textContent =
            "Good job! You currently have a positive balance.";

    }

    else if (balance === 0) {

        budgetMessage.textContent =
            "Your balance is currently zero.";

    }

    else {

        budgetMessage.textContent =
            "Warning: Your expenses are higher than your income.";

    }


    // ==========================================
    // Display transactions
    // ==========================================

    displayTransactions();

}


// ==========================================
// 9. DISPLAY TRANSACTIONS
// ==========================================

function displayTransactions() {

    // Remove the old list

    transactionList.innerHTML = "";


    // ==========================================
    // Check if there are no transactions
    // ==========================================

    if (transactions.length === 0) {

        transactionList.innerHTML =
            '<p class="empty-message">No transactions yet.</p>';

        return;
    }


    // ==========================================
    // 10. LOOP THROUGH ARRAY
    // Display every transaction
    // ==========================================

    for (
        let i = transactions.length - 1;
        i >= 0;
        i--
    ) {

        const transaction = transactions[i];


        // ==========================================
        // Create transaction container
        // ==========================================

        const transactionDiv =
            document.createElement("div");

        transactionDiv.classList.add("transaction");


        // ==========================================
        // Create information container
        // ==========================================

        const infoDiv =
            document.createElement("div");

        infoDiv.classList.add("transaction-info");


        // ==========================================
        // Create transaction title
        // ==========================================

        const title =
            document.createElement("h3");

        title.textContent =
            transaction.description;


        // ==========================================
        // Create transaction details
        // ==========================================

        const details =
            document.createElement("p");

        details.textContent =
            `${transaction.category} • ${transaction.type}`;


        // Add title and details

        infoDiv.appendChild(title);

        infoDiv.appendChild(details);


        // ==========================================
        // Create amount
        // ==========================================

        const amountText =
            document.createElement("p");


        // ==========================================
        // CONDITIONAL
        // Add + for income and - for expense
        // ==========================================

        if (transaction.type === "income") {

            amountText.textContent =
                `+ KES ${transaction.amount.toLocaleString()}`;

            amountText.classList.add("income-amount");

        }

        else {

            amountText.textContent =
                `- KES ${transaction.amount.toLocaleString()}`;

            amountText.classList.add("expense-amount");

        }


        // ==========================================
        // Add everything to transaction container
        // ==========================================

        transactionDiv.appendChild(infoDiv);

        transactionDiv.appendChild(amountText);


        // ==========================================
        // Add transaction to webpage
        // ==========================================

        transactionList.appendChild(transactionDiv);

    }

}


// ==========================================
// 11. START APPLICATION
// ==========================================

updateDashboard();
```