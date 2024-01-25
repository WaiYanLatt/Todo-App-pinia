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
      this.todoStore.updateTodo(this.todo);
    },
  },
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex lg:mx-5 items-center">
      <input
        type="checkbox"
        v-model="todo.completed"
        class="mr-3 cursor-pointer bg-sky-500"
      />
      <h1
        class="font-semibold text-xl break-all lg:w-full w-32"
        :class="{ 'line-through decoration-sky-500': todo.completed === true }"
      >
        {{ todo.title }}
      </h1>
    </div>
    <div class="lg:mt-0 flex items-center">
      <button
        class="bg-sky-500 text-white font-semibold p-2 mr-3 rounded-lg"
        @click="editTodo"
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
        class="bg-red-500 text-white font-semibold p-2 rounded-lg"
        @click="deleteTodo"
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
