import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import { setTextFilter } from './actions/filters'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'

const store = configureStore()

store.dispatch(addExpense({ description: 'Water Bill', amount: 1200, createdAt: 1391 }))
store.dispatch(addExpense({ description: 'Gas Bill', amount: 2300, createdAt: 1392 }))
store.dispatch(addExpense({ description: 'Power Bill', amount: 1500, createdAt: 1388 }))
store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 1377 }))
//store.dispatch(setTextFilter('water'));
//setTimeout(() => {
//    store.dispatch(setTextFilter('bill'));
//}, 3000);

//const state = store.getState()
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));