import { createAsyncThunk, createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import axios from 'axios';


export interface Todo {
    id: string | number;
    name: string;
    status: boolean;
}

export interface StateTodo {
    todos: Todo[] | any;
    ajax: 'idle' | 'loading' | 'failed'
}

const initialState: StateTodo = {
    todos: [],
    ajax: 'idle'
};

export const getAsyncTodolist = createAsyncThunk(
    'AsyncTodolist/fetchTodos',
    async () => {
        const { data } = await axios.get('http://localhost:3004/todos')
        return data

    }
)

export const addAsyncTodo = createAsyncThunk(
    'AsyncTodolist/addTodo',
    async (newTodo: Todo) => {
        const { data } = await axios.post(`http://localhost:3004/todos`, newTodo)
        return data

    }
)

export const deleteAsyncTodo = createAsyncThunk(
    'AsyncTodolist/deleteTodo',
    async (id: number | string) => {
        await axios.delete(`http://localhost:3004/todos/${id}`)
        return id
    }
)


export const todoSlice = createSlice({
    name: 'AsyncTodolist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getTodolist
        builder.addCase(getAsyncTodolist.pending, (state) => {
            state.ajax = 'loading'
        })
        builder.addCase(getAsyncTodolist.rejected, (state) => {
            state.ajax = 'failed'
        })

        builder.addCase(getAsyncTodolist.fulfilled, (state, action) => {
            state.ajax = 'idle';
            state.todos = action.payload;
        })
        //add todo
        builder.addCase(addAsyncTodo.fulfilled, (state, action) => {
            state.ajax = 'idle'
            state.todos = [...state.todos, action.payload]
        })
        //delete todo
        builder.addCase(deleteAsyncTodo.fulfilled, (state, action) => {
            state.ajax = 'idle'
            //@ts-ignore
            state.todos = [...state.todos.filter(ele => ele.id !== action.payload)]
        })
    }
});

// export const { getAsyncTodos } = todoSlice.actions;

export const getTodolist = (state: RootState) => state.asyncTodos;

export default todoSlice.reducer;
