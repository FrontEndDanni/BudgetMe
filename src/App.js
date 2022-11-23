import { Button,Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import { useState } from 'react';
import { BudgetsProvider, UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setShowAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId){
    setShowAddExpenseModal(true)
    setShowAddExpenseModalBudgetId(budgetId)
  }

  return (
  <>
  
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand mx-4" href="/">budgetMe</a>
    <button 
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarButtonsExample"
      aria-controls="navbarButtonsExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarButtonsExample">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-link" href="#">Dashboard</li>
        </ul>

        <div className="d-flex align-items-center">
          <button type="button" class="btn btn-outline-light px-3 me-2">
            Login
          </button>
          <button type="button" class="btn btn-primary me-3">
            Sign up for free
          </button>
        </div>
      </div>
  </div>
</nav>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark" hidden>
  <div class="container-fluid">
    <a class="navbar-brand mx-4" href="/">budgetMe</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Dashboard</a>
        </li>
      </ul>
      <div className="d-flex align-items-center">
          <button type="button" class="btn btn-outline-light px-3 me-2">
            Login
          </button>
          <button type="button" class="btn btn-primary me-3">
            Sign Up
          </button>
        </div>
    </div>
  </div>
</nav>

<nav class="navbar navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand mx-4" href="#">budgetMe</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">budgetMe</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider"/>
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>

  <Container className="my-4">
    <Stack direction="horizontal" gap="2" className="mb-4">
      <h1 className="me-auto">Your Budgets</h1>
      <Button variant="success" onClick={()=> setShowAddBudgetModal(true)}>Add Budget</Button>
      <Button variant="outline-success" onClick={openAddExpenseModal}>Add Expense</Button>
    </Stack>
    <div style={{display:"grid", 
    gridTemplateColumns: "repeat(auto-fill,minmax(300px, 1fr))",
    gap: "1rem", 
    alignItems: "flex-start",
    }}>
      {budgets.map(budget => {
        const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
        return (
        <BudgetCard
          key={budget.id} 
          name={budget.name}
          amount={amount} 
          max={budget.max}
          onAddExpenseClick={()=> openAddExpenseModal(budget.id)}
          onViewExpensesClick={()=> setViewExpensesModalBudgetId(budget.id)}
      />
      )
      })}
      <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
      onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
      <TotalBudgetCard />

    </div>
  </Container>
  <AddBudgetModal 
  show={showAddBudgetModal} 
  handleClose={() => setShowAddBudgetModal(false)}
  />
  <AddExpenseModal 
  show={showAddExpenseModal} 
  defaultBudgetId={addExpenseModalBudgetId}
  handleClose={() => setShowAddExpenseModal(false)}
  />
  <ViewExpensesModal 
  budgetId={viewExpensesModalBudgetId}
  handleClose={() => setViewExpensesModalBudgetId()}
  />
  </>
)}

export default App