<script>
import todoStore from "@/todoStore";

export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      todoStore: todoStore(),
      editing: false,
    };
  },
  mounted() {
    const todoId = this.todo.id;
    const haveTodo = this.todoStore.todos.find((todo) => todo.id === todoId);
    if (haveTodo) {
      this.todo.id = haveTodo.id;
      this.todo.title = haveTodo.title;
      this.completed = haveTodo.completed;
    }
  },
  methods: {
    deleteTodo() {
      const _confirm = confirm("Are You Sure For Delete");
      if (_confirm === true) {
        this.todoStore.deleteTodo(this.todo.id);
      }
    },
    editTodo() {
      this.editing = true;
    },
    doneEditTodo() {
      this.editing = false;
      this.todoStore.updateTodo(this.todo);
    },
  },
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center lg:mx-5">
      <input
        type="checkbox"
        v-model="todo.completed"
        class="mr-3 cursor-pointer bg-sky-500"
      />
      <h1
        v-show="editing === false"
        class="w-32 text-xl font-semibold break-all lg:w-full"
        :class="{ 'line-through decoration-sky-500': todo.completed === true }"
      >
        {{ todo.title }}
      </h1>
      <form
        v-show="editing === true"
        class="w-full"
        @submit.prevent="doneEditTodo"
      >
        <input
          type="text"
          v-model="todo.title"
          id="todo-title"
          class="lg:w-full w-[70%] px-5 py-1 text-lg font-semibold border border-black rounded-lg focus:outline-none"
          placeholder="Edit Your Todo"
        />
      </form>
    </div>
    <div class="flex items-center lg:mt-0">
      <button
        class="p-2 mr-3 font-semibold text-white rounded-lg bg-sky-500"
        @click.prevent="editTodo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <button
        class="p-2 font-semibold text-white bg-red-500 rounded-lg"
        @click.prevent="deleteTodo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
