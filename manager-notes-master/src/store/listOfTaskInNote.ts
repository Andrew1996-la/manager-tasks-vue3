import { Module } from "vuex";
import { AppData, List } from "@/types";
import { copy } from "@/utils/copy";

function getInitialState() {
  return {
    id: -1,
    title: "",
    tasks: [],
  };
}

const listOfTasksInNote: Module<List, AppData> = {
  state: getInitialState,
  mutations: {
    HANDLE_DELETE_TASK: (state, payload) => {
      state.tasks = state.tasks.filter((task) => {
        return task.id !== payload.taskId;
      });
    },
    HANDLE_ADD_TASK: (state, payload) => {
      state.tasks.push(payload);
    },
    HANDLE_EDIT_TASK: (state, payload) => {
      const targetTask = state.tasks.find((task) => task.id === payload.taskId);
      if (!targetTask) return;
      targetTask.isEdit = !targetTask.isEdit;
    },
    HANDLE_SAVE_CHANGES: (state, payload) => {
      const targetTask = state.tasks.find((task) => task.id === payload.taskId);
      if (!targetTask) return;
      targetTask.text = payload.text;
      targetTask.isEdit = !targetTask.isEdit;
    },
    HANDLE_CHECK: (state, payload) => {
      const targetTask = state.tasks.find((task) => task.id === payload.taskId);
      if (!targetTask) return;
      targetTask.completed = !targetTask.completed;
    },
    SET_LIST_STATE: (state, payload) => {
      Object.assign(state, copy(payload));
    },
    RESET_TASKS: (state) => {
      Object.assign(state, getInitialState());
    },
  },
  actions: {
    handleDeleteTask: (context, payload) => {
      context.commit("HANDLE_DELETE_TASK", payload);
    },
    handleAddTask: (context, payload) => {
      context.commit("HANDLE_ADD_TASK", payload);
    },
    handleEditTask: (context, payload) => {
      context.commit("HANDLE_EDIT_TASK", payload);
    },
    handleSaveChanges: (context, payload) => {
      context.commit("HANDLE_SAVE_CHANGES", payload);
    },
    handleCheck: (context, payload) => {
      context.commit("HANDLE_CHECK", payload);
    },
    setListState: (context, newState: List) => {
      context.commit("SET_LIST_STATE", copy(newState));
    },
    resetTasks: (context) => {
      context.commit("RESET_TASKS");
    },
  },
  getters: {},
};

export default listOfTasksInNote;
