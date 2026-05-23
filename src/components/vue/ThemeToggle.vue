<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-md hover:bg-bg-muted transition-all duration-200 ease-out active:scale-90 hover:rotate-12"
    aria-label="Toggle dark mode"
  >
    <Sun v-if="isDark" class="w-5 h-5 text-text-muted hover:text-text-primary transition-colors" />
    <Moon v-else class="w-5 h-5 text-text-muted hover:text-text-primary transition-colors" />
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
    document.documentElement.style.colorScheme = 'dark';
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // Check local storage or system preference
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true;
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    isDark.value = false;
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }
});
</script>
