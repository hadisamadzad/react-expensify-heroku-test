import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'

/* Action Generator */
// ADD_EXPENSE
const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        date = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        date
    }
});
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// REMOVE_EXPENSE
const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
    sortBy: 'amount'
});

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date'
});

// SET_START_DATE
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

// SET_END_DATE
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

/* Reducers */
// Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.id)
        default:
            return state;
    }
};

// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
};

// Methods
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.date >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.date <= endDate;
        const textMatch = text ? expense.description.toLowerCase().includes(text.toLowerCase()) : true;

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        switch (sortBy) {
            case "date":
                return a.date < b.date ? 1 : -1;
            case "amount":
                return a.amount < b.amount ? 1 : -1;
        }
    })
};

// Store Creation
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});


const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, date: 2014 }));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, date: 2017 }));
const expenseThree = store.dispatch(addExpense({ description: 'Bread', amount: 50, date: 2015 }));
//store.dispatch(removeExpense(expenseThree.expense.id));
//store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('rent'));
//store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
//store.dispatch(setStartDate(2015));
//store.dispatch(setEndDate(2016));

const demoState = {
    expenses: [{
        id: 'lasdjfhaaf',
        description: 'January Rent',
        note: 'This was the final payment for this address',
        amount: 54500,
        date: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};