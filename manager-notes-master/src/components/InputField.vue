<template>
  <div class="form">
    <button @click="handleReset" class="form_button">Назад</button>
    <input
      class="form_input"
      @keydown.enter="addTask"
      v-model="textOfTask"
      type="text"
      placeholder="enter your text"
    />
    <button class="form_button" @click="addTask">Add task</button>
    <button class="form_button" @click="saveTask">Save</button>
    <button class="form_button" @click="$emit('undo')">Undo</button>
    <button class="form_button" @click="$emit('redo')">Redo</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from "vue";
import { useStore } from "vuex";
import { List } from "@/types";
import router from "@/router";
import { copyTasks, generateId } from "@/utils/copy";
import LocalStorageClient, { LocalStorageKeys } from "@/api/localStorageClient";

const props = defineProps<{
  currentList: List;
}>();

const store = useStore();
const textOfTask = ref("");
const previewList = computed<List[]>(() => store.getters.lists);

function saveTask() {
  store.dispatch("saveList", copyTasks(props.currentList));
  LocalStorageClient.setValue(
    LocalStorageKeys.LIST_OF_NOTES,
    previewList.value
  );
}

function addTask() {
  if (!textOfTask.value.trim()) return;
  const task = {
    id: generateId(),
    text: textOfTask.value,
    completed: false,
    isEdit: false,
  };

  store.dispatch("handleAddTask", task);
  textOfTask.value = "";
}

function handleReset() {
  store.dispatch("resetTasks");
  router.push("/");
}
</script>

<style scoped>
.form {
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.form_input {
  padding: 4px;
  border-radius: 7px;
  margin-right: 20px;
}

.form_button {
  align-self: center;
  background-color: #fff;
  background-image: none;
  background-position: 0 90%;
  background-repeat: repeat no-repeat;
  background-size: 4px 3px;
  border-style: solid;
  border-width: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  color: #41403e;
  cursor: pointer;
  display: inline-block;
  font-family: Neucha, sans-serif;
  font-size: 13px;
  line-height: 13px;
  margin-right: 5px;
  outline: none;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 235ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.form_button:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
}

.form_button:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}
</style>
