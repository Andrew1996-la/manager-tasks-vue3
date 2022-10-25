<template>
  <li class="list_item">
    <input
      class="checkbox"
      @change="checkTask"
      :checked="task.completed"
      type="checkbox"
    />
    <span @dblclick="editTask" v-if="!task.isEdit">{{ task.text }}</span>
    <input
      autofocus
      @blur="saveChanges"
      v-if="task.isEdit"
      v-model="updatedText"
    />
    <span class="delete" @click="isShow">&#10006;</span>
    <ModalCreateTitle v-if="isShowModal" @close="isShow">
      <span>Вы действительно хотите удалить заметку?</span>
      <div class="button-wrapper">
        <button class="modal_btn modal_btn_no" @click="isShow">Нет</button>
        <button class="modal_btn modal_btn_yes" @click="deleteTask">Да</button>
      </div>
    </ModalCreateTitle>
  </li>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { Todo } from "@/types";
import { useStore } from "vuex";
import ModalCreateTitle from "./ModalCreateTitle.vue";

const props = defineProps<{
  task: Todo;
  listId: number;
}>();

const store = useStore();
const isShowModal = ref(false);
let updatedText = ref<string>(props.task.text);

function isShow() {
  isShowModal.value = !isShowModal.value;
}

function deleteTask() {
  store.dispatch("handleDeleteTask", {
    taskId: props.task.id,
  });
  isShow();
}

function checkTask() {
  store.dispatch("handleCheck", {
    taskId: props.task.id,
  });
}

function editTask() {
  store.dispatch("handleEditTask", {
    taskId: props.task.id,
  });
}

function saveChanges() {
  store.dispatch("handleSaveChanges", {
    taskId: props.task.id,
    text: updatedText,
  });
}
</script>

<style scoped>
.list_item {
  list-style-type: none;
  display: flex;
  position: relative;
  margin-top: 7px;
}

.checkbox {
  margin-right: 10px;
}

.delete {
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.delete:hover {
  color: #dc143c;
  transform: scale(1.6);
}

.button-wrapper {
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
}

.modal_btn {
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

.modal_btn:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px -5px;
  transform: translate3d(0, 2px, 0);
  background-color: #42b983;
}

.modal_btn_yes:hover {
  background-color: #42b983;
  color: #fff;
}

.modal_btn_no:hover {
  background-color: #dc143c;
  color: #fff;
}

.modal_btn:focus {
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 4px -6px;
}
</style>
