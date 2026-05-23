<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 ease-out active:scale-90 hover:rotate-12"
    aria-label="Toggle dark mode"
  >
    <Sun v-if="isDark" class="w-5 h-5 text-zinc-400 hover:text-white" />
    <Moon v-else class="w-5 h-5 text-zinc-500 hover:text-zinc-900" />
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Sun, Moon } from 'lucide-vue-next';

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // Check local storage or system preference
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
  }
});
</script>
