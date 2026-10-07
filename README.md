```markdown
# SpendWise

## Personal Budget & Expense Tracker

SpendWise is a simple interactive budgeting application built using HTML, CSS, and JavaScript.

The application allows users to add income and expense transactions and automatically updates the dashboard.

---

## Improvements Made This Week

This week, SpendWise was improved by adding JavaScript functionality.

The application can now:

- Add income and expense transactions.
- Store multiple transaction records.
- Calculate total income.
- Calculate total expenses.
- Calculate the current balance.
- Count the number of transactions.
- Display transactions directly on the webpage.
- Provide budget feedback.
- Respond to user form submissions.
- Dynamically update the dashboard.

---

## 1. Conditional Statements

Conditional statements are used to make decisions in SpendWise.

For example, the application checks whether a transaction is an income or an expense.

```javascript
if (transaction.type === "income") {
    totalIncome += transaction.amount;
} else if (transaction.type === "expense") {
    totalExpenses += transaction.amount;
}
```

Conditional statements are also used to provide feedback about the user's balance.

```javascript
if (balance > 0) {
    budgetMessage.textContent =
        "Good job! You currently have a positive balance.";
} else if (balance === 0) {
    budgetMessage.textContent =
        "Your balance is currently zero.";
} else {
    budgetMessage.textContent =
        "Warning: Your expenses are higher than your income.";
}
```

---

## 2. Arrays

An array is used to store multiple transaction records.

```javascript
let transactions = [];
```

When the user submits a transaction, the transaction is added to the array.

```javascript
transactions.push(transaction);
```

This allows SpendWise to manage multiple records instead of using separate variables for every transaction.

---

## 3. Loops

Loops are used to process all transactions stored in the array.

For example:

```javascript
for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
}
```

The loop is used to calculate total income and total expenses.

Another loop is used to display transactions on the webpage.

---

## 4. DOM Manipulation

DOM manipulation is used to update the webpage dynamically.

For example:

```javascript
balanceDisplay.textContent = `KES ${balance.toLocaleString()}`;
```

The transaction list is also created dynamically using:

```javascript
document.createElement("div");
```

This means the information appears directly on the webpage instead of only appearing in the browser console.

---

## 5. Event Listeners

SpendWise uses an event listener to detect when the user submits the transaction form.

```javascript
transactionForm.addEventListener("submit", function(event) {
    event.preventDefault();
});
```

The event listener allows JavaScript to respond to user actions.

When the form is submitted:

1. JavaScript reads the form data.
2. The data is validated.
3. A transaction object is created.
4. The transaction is added to the array.
5. The dashboard is updated.
6. The transaction appears on the webpage.
7. The form is cleared.

---

## 6. Challenges Encountered

One challenge was connecting the form inputs to JavaScript.

This was resolved by using `getElementById()` to select the HTML elements.

Another challenge was calculating income and expenses from multiple records.

This was resolved by storing transactions in an array and using a `for` loop to process each record.

Another challenge was updating the webpage after adding a transaction.

This was solved using DOM manipulation with `textContent`, `createElement()`, and `appendChild()`.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Arrays
- Conditional Statements
- Loops
- Event Listeners

---

## How to Run the Project

1. Download or clone the repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a web browser.
4. Enter a transaction.
5. Click **Add Transaction**.
6. The dashboard will update automatically.

---

## Assignment Requirements

The project demonstrates:

- Decision making using conditional statements.
- Multiple records using arrays.
- Data processing using loops.
- Dynamic dashboard updates using DOM manipulation.
- User interactions using event listeners.
- Information displayed directly on the webpage.
- A complete flow from user action to JavaScript logic and webpage updates.
```