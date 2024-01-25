import { defineStore } from "pinia";

const todoStore = defineStore('todos' , {
     state  : () => {
         return {
            todos : [],
            filterStatus: "all",             
         }
     },
     getters : {
        filteredTodos() {
            if (this.filterStatus === "all") {
              return this.todos;
            } else if (this.filterStatus === "active") {
              return this.todos.filter((todo) => todo.completed === false);
            } else if (this.filterStatus === "completed") {
              return this.todos.filter((todo) => todo.completed === true);
            }
          },
          totalTodos() {
            return this.filteredTodos.length;
          },
    },
     actions : {
        addTodo(newtodo) {
            this.todos.push(newtodo)
        },
        deleteTodo(id){
            const todoId = this.todos.findIndex((todo) => todo.id === id)
            this.todos.splice(todoId , 1)
        },
        updateTodo(updatedTodo){
            const indexTodo = this.todos.findIndex((t) => t.id === updatedTodo.id);
            this.todos[indexTodo] = updatedTodo;
        },
        setFilterStatus(status) {
            this.filterStatus = status;
        },
     }
})


export default todoStore;