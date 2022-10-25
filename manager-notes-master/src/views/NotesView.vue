<template>
  <div class="notes">
    <h1>Create your task!</h1>
    <h2>{{ currentList.title }}</h2>
    <InputField @undo="undo" @redo="redo" :currentList="currentList" />
    <TodoList :list="currentList" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import InputField from "../components/InputField.vue";
import TodoList from "../components/TodoList.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { List } from "@/types";
import { copy } from "@/utils/copy";

const route = useRoute();
const store = useStore();
const currentList = computed<List>(() => store.state.tasks);
const draftList = ref<List | null>(null);

function saveDraft() {
  draftList.value = copy(currentList.value);
}

function undo() {
  saveDraft();
  loadStoredList();
}

function redo() {
  store.dispatch("setListState", draftList.value);
  draftList.value = null;
}

function loadStoredList() {
  const listId = route.params.id;
  const baseList = store.getters.listId(listId);
  store.dispatch("setListState", baseList);
}

onBeforeMount(() => {
  loadStoredList();
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.notes {
  width: 60%;
  min-height: 500px;
  border: 1px solid black;
  margin: 0 auto;
  border-radius: 13px;
  padding: 20px 50px;
  box-shadow: rgba(0, 0, 0, 100%) 0 25px 50px -12px;
}
</style>
