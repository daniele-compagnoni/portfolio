<template>
  <header class="fixed top-0 w-full z-50 liquid-glass border-b border-border-subtle/50">
    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2 active:scale-95 transition-transform duration-200 group">
        <div class="w-8 h-8 text-text-primary group-hover:text-action-primary transition-colors">
          <LionIcon />
        </div>
      </a>
      
      <!-- Desktop Nav -->
      <nav class="hidden md:flex gap-6">
        <a 
          v-for="link in links" 
          :key="link.href" 
          :href="link.href" 
          class="relative text-sm font-medium text-text-secondary hover:text-action-primary transition-all active:scale-95 duration-200 ease-out after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-action-primary hover:after:w-full after:transition-all after:duration-300"
        >
          {{ link.label }}
        </a>
      </nav>
      
      <div class="flex items-center gap-4">
        <ThemeToggle />
        <a href="/contact" class="hidden md:inline-flex text-sm font-medium border border-border-subtle hover:border-action-primary/50 hover:bg-bg-muted px-4 py-2 rounded-[6px] transition-all duration-200 ease-out active:scale-95">
          Contact
        </a>
        <a href="/CV.pdf" target="_blank" class="hidden md:inline-flex text-sm font-medium bg-action-primary hover:bg-action-hover text-action-fg px-4 py-2 rounded-[6px] transition-all duration-200 ease-out shadow-sm hover:shadow-md hover:shadow-action-primary/20 active:scale-95">
          Download CV
        </a>
        
        <!-- Mobile Menu Toggle -->
        <button @click="isMenuOpen = !isMenuOpen" class="md:hidden p-2 text-text-primary hover:text-action-primary transition-all active:scale-90 hover:rotate-6 z-50 relative">
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

  </header>

  <!-- Mobile Curtain -->
  <transition name="curtain">
    <div v-if="isMenuOpen" class="fixed inset-0 top-16 bg-bg-base/95 backdrop-blur-md border-t border-border-subtle flex flex-col md:hidden z-40 overflow-y-auto">
      <nav class="flex flex-col p-6 gap-6">
        <a 
          v-for="link in links" 
          :key="link.href" 
          :href="link.href" 
          @click="isMenuOpen = false"
          class="text-2xl font-semibold text-text-primary hover:text-action-primary transition-colors active:scale-95 duration-200 ease-out"
        >
          {{ link.label }}
        </a>
        <div class="h-px w-full bg-border-subtle my-4"></div>
        <a href="/contact" @click="isMenuOpen = false" class="text-xl font-semibold text-text-primary hover:text-action-primary active:scale-95 transition-all">Contact</a>
        <a href="/CV.pdf" target="_blank" @click="isMenuOpen = false" class="text-xl font-semibold text-action-primary active:scale-95 transition-all">Download CV</a>
      </nav>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import { Menu, X } from '@lucide/vue';
import ThemeToggle from '@/components/vue/ThemeToggle.vue';
import LionIcon from '@/components/vue/LionIcon.vue';

const isMenuOpen = ref(false);

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Skills', href: '/skills' },
  { label: 'Thoughts', href: '/thoughts' },
];
</script>

<style scoped>
.curtain-enter-active,
.curtain-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.curtain-enter-from,
.curtain-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
