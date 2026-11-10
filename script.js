<<<<<<< HEAD

// SpendWise Personal Budget and Expense Tracker

const categories = [
    "Food",
    "Transport",
    "Rent",
    "Entertainment",
    "Savings",
    "Utilities"
];

// Load saved information
let expenses = JSON.parse(
    localStorage.getItem("spendwiseExpenses")
) || [];

let monthlyBudget = Number(
    localStorage.getItem("spendwiseBudget")
) || 0;

// HTML elements
const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const filterCategory = document.getElementById("filterCategory");

// Currency formatter
function formatMoney(amount) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 2
    }).format(amount);
}

// Save information
function saveData() {
    localStorage.setItem(
        "spendwiseExpenses",
        JSON.stringify(expenses)
    );

    localStorage.setItem(
        "spendwiseBudget",
        monthlyBudget
    );
}

// Get current month expenses
function getMonthlyExpenses() {
    const today = new Date();

    return expenses.filter(expense => {
        const expenseDate = new Date(
            expense.date + "T00:00:00"
        );

        return (
            expenseDate.getMonth() === today.getMonth() &&
            expenseDate.getFullYear() === today.getFullYear()
        );
    });
}

// Calculate totals
function updateDashboard() {
    const monthlyExpenses = getMonthlyExpenses();

    const total = monthlyExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    const savings = monthlyExpenses
        .filter(expense => expense.category === "Savings")
        .reduce((sum, expense) => sum + expense.amount, 0);

    const remaining = monthlyBudget - total;

    document.getElementById("budgetDisplay").textContent =
        formatMoney(monthlyBudget);

    document.getElementById("totalExpenses").textContent =
        formatMoney(total);

    document.getElementById("remainingBalance").textContent =
        formatMoney(remaining);

    document.getElementById("remainingBalance").style.color =
        remaining < 0 ? "#dc3545" : "#168b70";

    document.getElementById("totalSavings").textContent =
        formatMoney(savings);

    // Update category cards
    const categoryIds = {
        Food: "foodTotal",
        Transport: "transportTotal",
        Rent: "rentTotal",
        Entertainment: "entertainmentTotal",
        Savings: "savingsCategoryTotal",
        Utilities: "utilitiesTotal"
    };

    categories.forEach(category => {
        const categoryTotal = monthlyExpenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);

        document.getElementById(
            categoryIds[category]
        ).textContent = formatMoney(categoryTotal);
    });

    updateChart();
}

// Display transaction history
function displayExpenses() {
    expenseList.innerHTML = "";

    const selectedCategory = filterCategory.value;

    const filteredExpenses = expenses.filter(expense => {
        return (
            selectedCategory === "All" ||
            expense.category === selectedCategory
        );
    });

    document.getElementById("emptyMessage").style.display =
        filteredExpenses.length === 0 ? "block" : "none";

    filteredExpenses.forEach(expense => {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.name;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatMoney(expense.amount);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteExpense(expense.id);
        });

        actionCell.appendChild(deleteButton);

        row.append(
            descriptionCell,
            amountCell,
            categoryCell,
            dateCell,
            actionCell
        );

        expenseList.appendChild(row);
    });
}

// Add a new transaction
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("expenseName")
        .value.trim();

    const amount = Number(
        document.getElementById("expenseAmount").value
    );

    const category = document.getElementById("expenseCategory")
        .value;

    const date = document.getElementById("expenseDate").value;

    if (!name || !Number.isFinite(amount) || amount <= 0 ||
        !categories.includes(category) || !date) {
        alert("Please enter valid transaction details.");
        return;
    }

    const newExpense = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(newExpense);

    saveData();
    updateDashboard();
    displayExpenses();

    expenseForm.reset();
    document.getElementById("expenseDate").value =
        new Date().toISOString().split("T")[0];

    alert("Transaction added successfully!");
});

// Delete a transaction
function deleteExpense(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    expenses = expenses.filter(expense => expense.id !== id);

    saveData();
    updateDashboard();
    displayExpenses();
}

// Set monthly budget
budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget < 0) {
        alert("Please enter a valid budget.");
        return;
    }

    monthlyBudget = newBudget;

    saveData();
    updateDashboard();

    budgetForm.reset();

    alert("Monthly budget updated successfully!");
});

// Filter transactions
filterCategory.addEventListener("change", displayExpenses);

// Spending chart
function updateChart() {
    const chart = document.getElementById("spendingChart");

    chart.innerHTML = "";

    const monthlyExpenses = getMonthlyExpenses();

    const totals = {};

    categories.forEach(category => {
        totals[category] = monthlyExpenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
    });

    const maximum = Math.max(...Object.values(totals), 1);

    categories.forEach(category => {
        const amount = totals[category];

        const row = document.createElement("div");
        row.className = "chart-row";

        const label = document.createElement("span");
        label.textContent = category;

        const background = document.createElement("div");
        background.className = "bar-background";

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = (amount / maximum * 100) + "%";

        background.appendChild(bar);

        const value = document.createElement("span");
        value.className = "chart-amount";
        value.textContent = formatMoney(amount);

        row.append(label, background, value);

        chart.appendChild(row);
    });
}

// Show today's date
function displayDate() {
    const today = new Date();

    document.getElementById("todayDate").textContent =
        today.toLocaleDateString("en-KE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}

// Initial application setup
function initializeApp() {
    document.getElementById("expenseDate").value =
        new Date().toISOString().split("T")[0];

    displayDate();
    updateDashboard();
    displayExpenses();
}

initializeApp();
=======

// SpendWise Personal Budget and Expense Tracker

const categories = [
    "Food",
    "Transport",
    "Rent",
    "Entertainment",
    "Savings",
    "Utilities"
];

// Load saved information
let expenses = JSON.parse(
    localStorage.getItem("spendwiseExpenses")
) || [];

let monthlyBudget = Number(
    localStorage.getItem("spendwiseBudget")
) || 0;

// HTML elements
const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const filterCategory = document.getElementById("filterCategory");

// Currency formatter
function formatMoney(amount) {
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 2
    }).format(amount);
}

// Save information
function saveData() {
    localStorage.setItem(
        "spendwiseExpenses",
        JSON.stringify(expenses)
    );

    localStorage.setItem(
        "spendwiseBudget",
        monthlyBudget
    );
}

// Get current month expenses
function getMonthlyExpenses() {
    const today = new Date();

    return expenses.filter(expense => {
        const expenseDate = new Date(
            expense.date + "T00:00:00"
        );

        return (
            expenseDate.getMonth() === today.getMonth() &&
            expenseDate.getFullYear() === today.getFullYear()
        );
    });
}

// Calculate totals
function updateDashboard() {
    const monthlyExpenses = getMonthlyExpenses();

    const total = monthlyExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    const savings = monthlyExpenses
        .filter(expense => expense.category === "Savings")
        .reduce((sum, expense) => sum + expense.amount, 0);

    const remaining = monthlyBudget - total;

    document.getElementById("budgetDisplay").textContent =
        formatMoney(monthlyBudget);

    document.getElementById("totalExpenses").textContent =
        formatMoney(total);

    document.getElementById("remainingBalance").textContent =
        formatMoney(remaining);

    document.getElementById("remainingBalance").style.color =
        remaining < 0 ? "#dc3545" : "#168b70";

    document.getElementById("totalSavings").textContent =
        formatMoney(savings);

    // Update category cards
    const categoryIds = {
        Food: "foodTotal",
        Transport: "transportTotal",
        Rent: "rentTotal",
        Entertainment: "entertainmentTotal",
        Savings: "savingsCategoryTotal",
        Utilities: "utilitiesTotal"
    };

    categories.forEach(category => {
        const categoryTotal = monthlyExpenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);

        document.getElementById(
            categoryIds[category]
        ).textContent = formatMoney(categoryTotal);
    });

    updateChart();
}

// Display transaction history
function displayExpenses() {
    expenseList.innerHTML = "";

    const selectedCategory = filterCategory.value;

    const filteredExpenses = expenses.filter(expense => {
        return (
            selectedCategory === "All" ||
            expense.category === selectedCategory
        );
    });

    document.getElementById("emptyMessage").style.display =
        filteredExpenses.length === 0 ? "block" : "none";

    filteredExpenses.forEach(expense => {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.name;

        const amountCell = document.createElement("td");
        amountCell.textContent = formatMoney(expense.amount);

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        const dateCell = document.createElement("td");
        dateCell.textContent = expense.date;

        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            deleteExpense(expense.id);
        });

        actionCell.appendChild(deleteButton);

        row.append(
            descriptionCell,
            amountCell,
            categoryCell,
            dateCell,
            actionCell
        );

        expenseList.appendChild(row);
    });
}

// Add a new transaction
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("expenseName")
        .value.trim();

    const amount = Number(
        document.getElementById("expenseAmount").value
    );

    const category = document.getElementById("expenseCategory")
        .value;

    const date = document.getElementById("expenseDate").value;

    if (!name || !Number.isFinite(amount) || amount <= 0 ||
        !categories.includes(category) || !date) {
        alert("Please enter valid transaction details.");
        return;
    }

    const newExpense = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(newExpense);

    saveData();
    updateDashboard();
    displayExpenses();

    expenseForm.reset();
    document.getElementById("expenseDate").value =
        new Date().toISOString().split("T")[0];

    alert("Transaction added successfully!");
});

// Delete a transaction
function deleteExpense(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    expenses = expenses.filter(expense => expense.id !== id);

    saveData();
    updateDashboard();
    displayExpenses();
}

// Set monthly budget
budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const newBudget = Number(budgetInput.value);

    if (!Number.isFinite(newBudget) || newBudget < 0) {
        alert("Please enter a valid budget.");
        return;
    }

    monthlyBudget = newBudget;

    saveData();
    updateDashboard();

    budgetForm.reset();

    alert("Monthly budget updated successfully!");
});

// Filter transactions
filterCategory.addEventListener("change", displayExpenses);

// Spending chart
function updateChart() {
    const chart = document.getElementById("spendingChart");

    chart.innerHTML = "";

    const monthlyExpenses = getMonthlyExpenses();

    const totals = {};

    categories.forEach(category => {
        totals[category] = monthlyExpenses
            .filter(expense => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0);
    });

    const maximum = Math.max(...Object.values(totals), 1);

    categories.forEach(category => {
        const amount = totals[category];

        const row = document.createElement("div");
        row.className = "chart-row";

        const label = document.createElement("span");
        label.textContent = category;

        const background = document.createElement("div");
        background.className = "bar-background";

        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.width = (amount / maximum * 100) + "%";

        background.appendChild(bar);

        const value = document.createElement("span");
        value.className = "chart-amount";
        value.textContent = formatMoney(amount);

        row.append(label, background, value);

        chart.appendChild(row);
    });
}

// Show today's date
function displayDate() {
    const today = new Date();

    document.getElementById("todayDate").textContent =
        today.toLocaleDateString("en-KE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });
}

// Initial application setup
function initializeApp() {
    document.getElementById("expenseDate").value =
        new Date().toISOString().split("T")[0];

    displayDate();
    updateDashboard();
    displayExpenses();
}

initializeApp();
>>>>>>> origin/main
