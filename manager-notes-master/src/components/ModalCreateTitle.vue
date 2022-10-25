<template>
  <div @click.self="$emit('close')" class="popup-fade">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 200px;
  border: 1px solid black;
  border-radius: 7px;
  padding: 5px;
  z-index: 2;
  opacity: 1;
  background-color: antiquewhite;
}
.popup-fade:before {
  content: "";
  background: #000;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: 1;
}
</style>
