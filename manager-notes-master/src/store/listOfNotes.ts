import { Module } from "vuex";
import { AppData, List, ListsData } from "@/types";
import LocalStorageClient from "@/api/localStorageClient";

function getInitialLists() {
  const localStorageItem = LocalStorageClient.getValue();
  return localStorageItem ? JSON.parse(localStorageItem) : [];
}

const listOfNotes: Module<ListsData, AppData> = {
  state: () => ({
    lists: getInitialLists(),
  }),
  getters: {
    lists: (state: ListsData) => {
      return state.lists;
    },
    listId: (state) => (id: number) => {
      return state.lists.find((list: List) => list.id === +id);
    },
    listIndexById: (state) => (id: number) => {
      return state.lists.findIndex((list: List) => list.id === +id);
    },
    listOfTasks: (state) => (listId: number) => {
      return state.lists.find((list) => list.id === +listId)?.tasks;
    },
  },
  mutations: {
    ADD_LIST: (state, payload) => {
      state.lists.push(payload);
    },
    DELETE_LIST: (state, payload) => {
      state.lists = state.lists.filter((list) => {
        return list.id !== payload;
      });
    },
    SAVE_LIST: (state, { listIndex, title, tasks }) => {
      state.lists[listIndex].title = title;
      state.lists[listIndex].tasks = tasks;
    },
  },
  actions: {
    addList: (context, payload) => {
      context.commit("ADD_LIST", payload);
    },
    deleteList: (context, payload) => {
      context.commit("DELETE_LIST", payload);
    },
    saveList: (context, list) => {
      const listIndex = context.getters.listIndexById(list.id);
      const { title, tasks } = list;
      context.commit("SAVE_LIST", { listIndex, title, tasks });
    },
  },
};

export default listOfNotes;
