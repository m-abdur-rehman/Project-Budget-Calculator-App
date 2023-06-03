document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('budgetForm');
    const expenseForm = document.getElementById('expenseForm');
    const totalBudgetCell = document.getElementById('totalBudgetCell');
    var totalExpensesCell = document.getElementById('totalExpensesCell');
    var balanceCell = document.getElementById('balanceCell');
    var expensesTableBody = document.getElementById('expensesTableBody');

    let totalBudget = 0;
    let totalExpenses = 0;

    budgetForm.addEventListener('submit', (addbudget) => {
        addbudget.preventDefault();
        totalBudget = parseInt(document.getElementById('totalBudgetInput').value);
        totalBudgetCell.textContent = totalBudget;
        document.getElementById('budgetSection').style.display = 'none';
        document.getElementById('expenseSection').style.display = 'block';
        document.getElementById('summarySection').style.display = 'block';
        document.getElementById('expensesTableSection').style.display = 'block';
    });
    function getCategoryIcon(category) {
        switch (category) {
          case 'Grocery':
            return 'shopping-cart';
          case 'Clothing':
            return 'tshirt';
          case 'Food':
            return 'utensils';
          case 'credit-loans':
            return 'hand-holding-usd';
          case 'gift-cards':
            return 'gift';
          // Add more cases for other categories
          default:
            return 'question-circle';
        }
      }
    expenseForm.addEventListener('submit', (addexpense) => {
        addexpense.preventDefault();
        let amountInput = document.getElementById('amountInput').value;
        let categoryInput = document.getElementById('categoryInput').value;
        let descriptionInput = document.getElementById('descriptionInput').value;
        const dueDateInput = document.getElementById('dueDateInput').value;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${dueDateInput}</td>
        <td>${categoryInput} <i class="fas fa-${getCategoryIcon(categoryInput)}"></i></td>
        <td>${amountInput}</td>
        <td>${descriptionInput}</td>
        <td>
            <button class="deleteExpenseButton"><i class="fas fa-trash"></i></button>
            <button class="editExpenseButton"><i class="fas fa-edit"></i></button>
        </td>
        `;
        expensesTableBody.appendChild(row);

        totalExpenses += parseInt(amountInput);
        totalExpensesCell.textContent = totalExpenses;
        balanceCell.textContent = totalBudget - totalExpenses;

        document.getElementById('amountInput').value = '';
        document.getElementById('categoryInput').value = '';
        document.getElementById('descriptionInput').value = '';
        document.getElementById('dueDateInput').value = '';
    });
    function modifyElement(element, isEditMode) {
        // Access the parent element that contains the expense details
        const expenseContainer = element.parentNode;
      
        // Access the expense details within the container
        const amountElement = expenseContainer.querySelector(".expenseAmount");
        const categoryElement = expenseContainer.querySelector(".expenseCategory");
        const descriptionElement = expenseContainer.querySelector(".expenseDescription");
        const dateElement = expenseContainer.querySelector(".expenseDate");
      
        if (isEditMode) {
          // Enable input fields for editing
          amountElement.contentEditable = true;
          categoryElement.contentEditable = true;
          descriptionElement.contentEditable = true;
          dateElement.contentEditable = true;
      
          // Add a CSS class or modify styles to indicate the edit mode
          expenseContainer.classList.add("edit-mode");
        } else {
          // Disable input fields after editing
          amountElement.contentEditable = false;
          categoryElement.contentEditable = false;
          descriptionElement.contentEditable = false;
          dateElement.contentEditable = false;
      
          // Remove the CSS class or reset styles for edit mode
          expenseContainer.classList.remove("edit-mode");
      
          // Perform any necessary updates or save the changes
          // For example, you can retrieve the modified values and update the expense object
        }
      }
      expensesTableBody.addEventListener('click', (editexpense) => {
        if (editexpense.target.classList.contains('deleteExpenseButton')) {
          // Delete expense
          let row = editexpense.target.parentNode.parentNode;
          const amount = parseInt(row.children[2].textContent);
          row.parentNode.removeChild(row);
          totalExpenses -= amount;
          totalExpensesCell.textContent = totalExpenses;
          balanceCell.textContent = totalBudget - totalExpenses;
        } else if (editexpense.target.classList.contains('editExpenseButton')) {
          // Edit expense
          const row = editexpense.target.parentNode.parentNode;
          const amountElement = row.querySelector('td:nth-child(3)');
          const categoryElement = row.querySelector('td:nth-child(2)');
          const descriptionElement = row.querySelector('td:nth-child(4)');
          const dateElement = row.querySelector('td:nth-child(1)');
    
          // Fill form fields with existing data
          document.getElementById('amountInput').value = amountElement.textContent;
          document.getElementById('categoryInput').value = categoryElement.textContent;
          document.getElementById('descriptionInput').value = descriptionElement.textContent;
          document.getElementById('dueDateInput').value = dateElement.textContent;
    
          // Remove the row from the table
          row.parentNode.removeChild(row);
          totalExpenses -= parseInt(amountElement.textContent);
          totalExpensesCell.textContent = totalExpenses;
          balanceCell.textContent = totalBudget - totalExpenses;
    
          // Focus on the amount input field
          document.getElementById('amountInput').focus();
        }
      });

    });






