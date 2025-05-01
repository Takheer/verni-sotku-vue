<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<template>
  <div class="flex flex-col w-full">
    <HeaderBar />
    <RouterView />
  </div>
</template>

