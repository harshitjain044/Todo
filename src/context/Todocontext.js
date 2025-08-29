import { createContext, useContext } from "react";

export const Todocontext = createContext({
    todos : [
        {
            id: 1,
            todo : 'Todo Message',
            Completed : false,
        }
    ],
    addTodo : (todo) => {},
    updatedTodo : (id, todo) => {},
    completedTodo : (todo, id) => {},
    deleteTodo : (id) => {},
    togglecomplete : (id) => {}
})
export const useTodo = () => {
    return useContext(Todocontext)
}

export const Todoprovider  = Todocontext.Provider