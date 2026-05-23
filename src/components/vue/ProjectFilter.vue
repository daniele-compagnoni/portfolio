<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col md:flex-row gap-4">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="Search projects..." 
        class="flex-grow px-4 py-2 bg-bg-base border border-border-subtle rounded-[6px] text-text-primary placeholder:text-text-muted transition-all duration-200 ease-out focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/50 active:scale-[0.99]"
      />
      
      <select 
        v-model="selectedContext" 
        class="px-4 py-2 border border-border-subtle rounded-[6px] text-text-primary transition-all duration-200 ease-out focus:outline-none focus:border-action-primary focus:ring-2 focus:ring-action-primary/50 active:scale-[0.99] select-themed"
      >
        <option value="All">All Contexts</option>
        <option value="Academic">Academic</option>
        <option value="Independent">Independent</option>
        <option value="Professional">Professional</option>
      </select>
    </div>

    <TransitionGroup 
      name="project-list" 
      tag="div" 
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
    >
      <a 
        v-for="project in filteredProjects" 
        :key="project.id" 
        :href="`/projects/${project.id}`"
        class="block group relative bg-bg-elevated border border-border-subtle rounded-[6px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-action-primary/50 hover:shadow-xl hover:shadow-[var(--color-action-primary)]/10 dark:hover:shadow-none overflow-hidden flex flex-col active:scale-[0.98]"
      >
        <div class="p-6 flex flex-col flex-grow">
          <h3 class="text-xl font-semibold text-text-primary mb-2">{{ project.data.title }}</h3>
          <p class="text-sm text-text-secondary font-serif leading-relaxed mb-4 flex-grow">{{ project.data.summary }}</p>
          <div class="flex flex-wrap gap-2 mt-auto">
             <span v-for="skill in project.data.skills" :key="skill.id" class="inline-flex items-center rounded-md border border-[var(--color-action-primary)]/20 bg-[var(--color-action-primary)]/5 px-2 py-0.5 text-[10px] font-mono font-medium text-text-primary">
                {{ skill.id }}
             </span>
          </div>
        </div>
      </a>
    </TransitionGroup>
    
    <div v-if="filteredProjects.length === 0" class="text-center py-12 text-text-muted font-mono text-sm">
      No projects found matching your criteria.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import Fuse from 'fuse.js';

const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const searchQuery = ref('');
const selectedContext = ref('All');

// Initialize Fuse instance
const fuse = new Fuse(props.projects, {
  keys: [
    { name: 'data.title', weight: 2.0 },
    { name: 'data.skills.id', weight: 1.5 },
    { name: 'data.tags', weight: 1.2 },
    { name: 'data.summary', weight: 0.8 }
  ],
  threshold: 0.3,
  ignoreLocation: true
});

const filteredProjects = computed(() => {
  let result = props.projects;
  
  // Apply Search
  if (searchQuery.value.trim() !== '') {
    result = fuse.search(searchQuery.value).map(r => r.item);
  }
  
  // Apply Context Filter
  if (selectedContext.value !== 'All') {
    result = result.filter(p => p.data.context === selectedContext.value);
  }
  
  return result;
});
</script>

<style scoped>
.project-list-move,
.project-list-enter-active,
.project-list-leave-active {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}
.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.project-list-leave-active {
  position: absolute;
  width: 100%;
}

/* Native select inherits the page's current colour-scheme, but we set
   background and colour explicitly so the dropdown chrome is never stuck
   in light-mode when dark mode is active. */
.select-themed {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
}
.select-themed option {
  background-color: var(--color-bg-elevated);
  color: var(--color-text-primary);
}
</style>
