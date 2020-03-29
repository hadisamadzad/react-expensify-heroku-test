import { combineReducers, createStore } from 'redux';

// Action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});


const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

const courseReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            };
        case 'RESET':
            return {
                count: 0
            };
        default:
            return state
    }
}

const store = createStore(courseReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCount({ incrementBy: 4 }));

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount({ decrementBy: 3 }));

store.dispatch(decrementCount({ decrementBy: 2 }));

store.dispatch(resetCount());

store.dispatch(setCount({ count: 6 }));