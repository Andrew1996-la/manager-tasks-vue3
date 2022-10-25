import { List } from "@/types";

export enum LocalStorageKeys {
  LIST_OF_NOTES = "LIST_OF_NOTES",
}

class LocalStorageClient<TYPE extends Record<string, any>> {
  setValue<KEY extends keyof TYPE>(key: KEY, value: TYPE[KEY]) {
    localStorage.setItem(key as string, JSON.stringify(value));
  }
  getValue() {
    return localStorage.getItem(LocalStorageKeys.LIST_OF_NOTES);
  }
}

export default new LocalStorageClient<{
  [LocalStorageKeys.LIST_OF_NOTES]: List[];
}>();
