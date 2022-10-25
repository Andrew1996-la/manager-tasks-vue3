import { createApp } from "vue";
import { createStore } from "vuex";
import { AppData } from "@/types";
import listOfNotes from "@/store/listOfNotes";
import listOfTasksInNote from "@/store/listOfTaskInNote";

const store = createStore<AppData>({
  modules: {
    lists: listOfNotes,
    tasks: listOfTasksInNote,
  },
});

const app = createApp({});

app.use(store);

export default store;
