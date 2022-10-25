<template>
  <div class="home">
    <p class="title">Note Manager</p>
    <button class="home_btn" @click="toggleModalWindow">Add new note</button>
    <div class="preview-list-wrapper">
      <PreviewList
        v-for="note of previewList"
        :title="note.title"
        :id="note.id"
        :points="note.text"
        :key="note.id"
      />
    </div>
    <ModalCreateTitle
      @close="toggleModalWindow"
      @save-title="handleAddNote"
      @close-modal="toggleModalWindow"
      v-show="showModalWindow"
      @keydown.enter="saveTitle"
      @keydown.esc="toggleModalWindow"
    >
      <div>
        <div class="modal_title">Напишите название заметки</div>
        <div class="input-container">
          <input class="modal_input" v-model="textOfTitle" type="text" />
        </div>
        <button class="modal_btn modal_btn_yes" @click="saveTitle">OK</button>
        <button class="modal_btn modal_btn_no" @click="toggleModalWindow">
          Отменить
        </button>
      </div>
    </ModalCreateTitle>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import PreviewList from "../components/PreviewList.vue";
import ModalCreateTitle from "@/components/ModalCreateTitle.vue";
import { List } from "@/types";
import { useStore } from "vuex";
import LocalStorageClient, { LocalStorageKeys } from "@/api/localStorageClient";

const store = useStore();
const previewList = computed(() => store.getters.lists);
let showModalWindow = ref(false);
let textOfTitle = ref<string>("");

function toggleModalWindow() {
  showModalWindow.value = !showModalWindow.value;
}

function generatedId() {
  return Date.now();
}

function saveTitle() {
  if (!textOfTitle.value.trim().length) return;
  const newList = {
    id: generatedId(),
    title: textOfTitle.value,
    tasks: [],
  };
  store.dispatch("addList", newList);
  textOfTitle.value = "";
  toggleModalWindow();
}

function handleAddNote(list: List) {
  store.dispatch("addList", list);
}

LocalStorageClient.setValue(LocalStorageKeys.LIST_OF_NOTES, previewList.value);

watch(previewList.value, () => {
  LocalStorageClient.setValue(
    LocalStorageKeys.LIST_OF_NOTES,
    previewList.value
  );
});
</script>

<style scoped>
.preview-list-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.title {
  font-size: 27px;
}

.home_btn {
  padding: 15px;
  font-size: 17px;
  background-color: inherit;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  box-shadow: rgb(100 100 111 / 73%) 0 7px 29px 0;
  transition: all 0.5s ease-in-out;
}

.home_btn:hover {
  color: #fff;
  background-color: #42b983;
  transform: scale(1.3);
}

.modal_title {
  font-size: 20px;
}

.input-container {
  position: relative;
  margin-bottom: 25px;
}

.input-container label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  color: #000;
  pointer-event: none;
  transition: all 0.5s ease-in-out;
}
.input-container input {
  border: 0;
  border-bottom: 1px solid #555;
  background: transparent;
  width: 100%;
  padding: 8px 0 5px 0;
  font-size: 16px;
  color: #000;
}
.input-container input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid #42b983;
}

.input-container input:focus ~ label,
.input-container input:valid ~ label {
  top: -12px;
  font-size: 12px;
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
