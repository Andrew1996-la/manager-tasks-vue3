<template>
  <ul class="list">
    <TodoItem
      v-for="(task, index) of list.tasks"
      :task="task"
      :listId="props.list.id"
      :key="index"
    />
  </ul>
</template>

<script lang="ts" setup>
import TodoItem from "./TodoItem.vue";
import { List } from "@/types";
import { defineProps } from "vue";

const props = defineProps<{
  list: List;
}>();
</script>

<style scoped>
.list {
  margin-top: 60px;
}
</style>
