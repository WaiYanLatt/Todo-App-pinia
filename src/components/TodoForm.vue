<script>
import todoStore from "@/todoStore.js";
import TodoList from "./TodoList.vue";

export default {
  data() {
    return {
      todoStore: todoStore(),
      todo: {
        id: null,
        title: "",
        completed: false,
      },
      error: "",
    };
  },
  mounted() {
    const extistingTodo = localStorage.getItem("todos");
    if (extistingTodo) {
      this.todoStore.todos = JSON.parse(extistingTodo);
    }
  },
  watch: {
    "todoStore.todos": {
      handler() {
        localStorage.setItem("todos", JSON.stringify(this.todoStore.todos));
      },
      deep: true,
    },
  },
  components: { TodoList },
  methods: {
    createTodo() {
      if (this.todo.title === "") {
        this.error = "Please Add Your Todo!";
        return;
      }
      const nextId = this.todoStore.todos.length + 1;
      const newTodo = {
        id: nextId,
        title: this.todo.title,
        completed: false,
      };
      this.todoStore.todos.push(newTodo);
      this.todo.title = "";
      this.error = "";
    },
  },
};
</script>

<template>
  <div
    class="container w-full lg:px-72 px-5 mx-auto flex items-center min-h-screen"
  >
    <div class="w-full">
      <form
        class="w-full border shadow-lg lg:p-10 p-5 rounded-lg my-10 h-[350px] overflow-y-scroll"
        @submit.prevent
      >
        <input
          type="text"
          v-model="todo.title"
          id="todo-title"
          class="w-full border border-black focus:outline-none p-3 font-semibold text-lg rounded-lg"
          placeholder="What are you do in today ? Just add your todo"
        />
        <button class="hidden" @click.prevent="createTodo"></button>
        <p class="font-semibold text-red-500 mt-3 ml-3">{{ error }}</p>
        <div
          class="mt-10"
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
        >
          <TodoList :todo="todo"></TodoList>
        </div>
      </form>
      <div class="flex lg:flex-row flex-col items-center justify-between">
        <div>
           <h1 class="pl-5 font-semibold text-sky-500 text-xl">{{ todoStore.totalTodos }} <span class="text-lg text-black"> items left</span></h1>
        </div>
        <div class="mt-5 lg:mt-0">
          <button
          class="bg-sky-500 px-5 py-2 rounded-lg font-semibold text-white mr-3"
          :class="{
            'bg-slate-700 duration-500': todoStore.filterStatus === 'all',
          }"
          @click="todoStore.setFilterStatus('all')"
        >
          All
        </button>
        <button
          class="bg-sky-500 px-5 py-2 rounded-lg font-semibold text-white mr-3"
          :class="{
            'bg-slate-700 duration-500': todoStore.filterStatus === 'active',
          }"
          @click="todoStore.setFilterStatus('active')"
        >
          Active
        </button>
        <button
          class="bg-sky-500 px-5 py-2 rounded-lg font-semibold text-white"
          :class="{
            'bg-slate-700 duration-500': todoStore.filterStatus === 'completed',
          }"
          @click="todoStore.setFilterStatus('completed')"
        >
          Completed
        </button>
        </div>
      </div>
    </div>
  </div>
</template>
