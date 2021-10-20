import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';


export interface Todo {
    _id: string;
    name: string;
    status: boolean;
}

export interface StateTodo {
    todos: Todo[];
}

const initialState: StateTodo = {
    todos: [
        {
            _id: nanoid(),
            name: 'todo1',
            status: false
        },
        {
            _id: nanoid(),
            name: 'todo2',
            status: true
        },
        {
            _id: nanoid(),
            name: 'todo3',
            status: false
        },
    ]
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload)
        },
        deleteToto: (state, action: PayloadAction<Todo>) => {

            state.todos = [...state.todos.filter(ele => ele._id !== action.payload._id)]
        },
        changeStatusTodo: (state, action: PayloadAction<Todo>) => {
            state.todos =
                [...state.todos.map(ele => {
                    if (ele._id === action.payload._id) {
                        return { _id: ele._id, name: ele.name, status: !ele.status }
                    } else {
                        return ele
                    }
                })]

        },
    },


});

export const { addTodo, deleteToto, changeStatusTodo } = todoSlice.actions;

export const getTodos = (state: RootState) => state.todos;

export default todoSlice.reducer;
