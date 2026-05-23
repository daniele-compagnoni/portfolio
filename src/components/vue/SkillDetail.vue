<template>
  <div class="space-y-12">
    <div v-for="category in Object.keys(categorizedSkills)" :key="category" class="space-y-4">
      <h2 class="text-2xl font-semibold text-text-primary border-b border-border-subtle pb-2 font-sans tracking-tight">{{ category }}</h2>
      <div class="flex flex-wrap gap-3">
        <button 
          v-for="skill in categorizedSkills[category]" 
          :key="skill.id"
          @click="openModal(skill)"
          class="inline-flex items-center rounded-md border border-[var(--color-action-primary)]/20 bg-[var(--color-action-primary)]/5 px-3 py-1 text-sm font-mono font-medium text-text-primary transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[var(--color-action-primary)]/40 hover:bg-[var(--color-action-primary)]/10 hover:shadow-sm cursor-pointer active:scale-95"
        >
          {{ skill.data.name }}
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedSkill" class="fixed inset-0 z-50 flex items-center justify-center px-4" @click.self="closeModal">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
      <div class="relative w-full max-w-2xl bg-bg-base border border-border-strong rounded-[6px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div class="p-6 border-b border-border-subtle flex justify-between items-center liquid-glass">
          <h3 class="text-2xl font-semibold tracking-tight text-text-primary">{{ selectedSkill.data.name }}</h3>
          <button @click="closeModal" class="text-text-muted hover:text-text-primary transition-colors">
            <X class="w-6 h-6" />
          </button>
        </div>
        
        <div class="p-6 overflow-y-auto flex-grow bg-bg-base">
          <p class="text-text-secondary font-serif leading-relaxed mb-8">{{ selectedSkill.data.description }}</p>
          
          <h4 class="text-lg font-semibold tracking-tight text-text-primary mb-4 font-sans">The Evidence Engine</h4>
          
          <div v-if="relatedProjects.length > 0" class="mb-6">
            <h5 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Projects</h5>
            <div class="grid gap-3">
              <a v-for="proj in relatedProjects" :key="proj.id" :href="`/projects/${proj.id}`" class="block p-4 bg-bg-elevated border border-border-subtle rounded-[6px] hover:border-action-primary transition-all duration-200 ease-out group active:scale-[0.99] hover:shadow-md">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-text-primary group-hover:text-action-primary transition-colors">{{ proj.data.title }}</span>
                  <span class="text-xs font-mono text-text-muted">{{ proj.data.context }}</span>
                </div>
              </a>
            </div>
          </div>
          
          <div v-if="relatedExperiences.length > 0">
            <h5 class="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Experience</h5>
            <div class="grid gap-3">
              <div v-for="exp in relatedExperiences" :key="exp.id" class="p-4 bg-bg-elevated border border-border-subtle rounded-[6px]">
                <span class="font-medium text-text-primary block">{{ exp.data.role }}</span>
                <span class="text-sm font-mono text-text-secondary block mt-1">{{ exp.data.organization }}</span>
              </div>
            </div>
          </div>
          
          <div v-if="relatedProjects.length === 0 && relatedExperiences.length === 0" class="text-sm font-mono text-text-muted italic border border-border-subtle rounded-md p-4 bg-bg-muted">
            No direct evidence linked yet.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { X } from '@lucide/vue';

const props = defineProps({
  skills: { type: Array, required: true },
  projects: { type: Array, required: true },
  experiences: { type: Array, required: true }
});

const categorizedSkills = computed(() => {
  const groups = {};
  props.skills.forEach(skill => {
    if (!groups[skill.data.category]) groups[skill.data.category] = [];
    groups[skill.data.category].push(skill);
  });
  return groups;
});

const selectedSkill = ref(null);

const openModal = (skill) => {
  selectedSkill.value = skill;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedSkill.value = null;
  document.body.style.overflow = 'auto';
};

const relatedProjects = computed(() => {
  if (!selectedSkill.value) return [];
  return props.projects.filter(p => p.data.skills.some(s => s.id === selectedSkill.value.id));
});

const relatedExperiences = computed(() => {
  if (!selectedSkill.value) return [];
  return props.experiences.filter(e => e.data.skills.some(s => s.id === selectedSkill.value.id));
});
</script>
