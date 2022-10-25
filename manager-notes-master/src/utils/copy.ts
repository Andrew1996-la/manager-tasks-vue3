import { List } from "@/types";

export function copy(obj: List) {
  return JSON.parse(JSON.stringify(obj));
}

export function generateId() {
  return Math.random() * new Date().getSeconds();
}

export function copyTasks(value: List) {
  return JSON.parse(JSON.stringify(value));
}
