<template>
  <div class="preview-list">
    <div class="preview-list-wrapper">
      <a @click="handleRedirect" class="title-preview">
        {{ props.title }}
      </a>
      <template v-for="(task, index) in listTasks" :key="index">
        <p v-if="index < 3" :class="{ highlighted: task.completed }">
          {{ task.text }}
        </p>
        <span class="points" v-if="index > 2">...</span>
      </template>
      <span class="delete-list" @click="toggleModal">&#10006;</span>
    </div>
    <ModalCreateTitle v-if="isShowModal">
      <span>Вы действительно хотите удалить заметку?</span>
      <div class="button-wrapper">
        <button class="modal_btn modal_btn_no" @click="toggleModal">Нет</button>
        <button class="modal_btn modal_btn_yes" @click="deleteList">Да</button>
      </div>
    </ModalCreateTitle>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import ModalCreateTitle from "./ModalCreateTitle.vue";
import { useRouter } from "vue-router";
import LocalStorageClient, { LocalStorageKeys } from "@/api/localStorageClient";

const props = defineProps(["title", "points", "id"]);

const router = useRouter();
const store = useStore();
const isShowModal = ref(false);

const previewList = computed(() => store.getters.lists);
const listTasks = computed(() => store.getters.listOfTasks(props.id));

function toggleModal() {
  isShowModal.value = !isShowModal.value;
}

function deleteList() {
  store.dispatch("deleteList", props.id);
}

onBeforeMount(() => {
  const list = store.getters.listId(props.id);
  store.dispatch("setListState", list);
});

function handleRedirect() {
  const list = store.getters.listId(props.id);
  store.dispatch("setListState", list);
  router.push({ name: "notesID", params: { id: props.id } });
}

watch(previewList, () => {
  LocalStorageClient.setValue(
    LocalStorageKeys.LIST_OF_NOTES,
    previewList.value
  );
});
</script>

<style scoped>
.preview-list-wrapper {
  position: relative;
}

.preview-list {
  width: 60%;
  min-height: 300px;
  border: 1px solid black;
  margin: 0 auto;
  border-radius: 13px;
  padding: 20px 50px;
  box-shadow: rgba(0, 0, 0, 0.25) 0 25px 50px -12px;
}

.title-preview {
  cursor: pointer;
  font-size: 25px;
  transition: all 0.5s ease-in-out;
}

.title-preview:hover {
  color: #42b983;
}

.delete-list {
  position: absolute;
  right: 7px;
  top: 7px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
}

.delete-list:hover {
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

.points {
  font-size: 24px;
}

.highlighted {
  text-decoration: line-through;
}
</style>
