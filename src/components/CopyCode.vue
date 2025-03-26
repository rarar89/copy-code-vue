<script setup lang="ts">
import { ref, onMounted, useSlots } from 'vue';
import { useCopyCode } from '../composables/useCopyCode';
import type { CopyCodeOptions } from '../types/CopyCodeOptions';

interface Props extends CopyCodeOptions {
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
  selector: 'pre code',
  position: 'top-right',
  copyMessage: 'Copied',
  copyMessageTimeout: 2000,
  containerClassName: 'copy-code-vue-button-container',
  buttonClassName: 'copy-code-vue-button',
  successClassName: 'copy-code-vue-success',
  highlightOnCopy: false,
});

const slots = useSlots();
const containerRef = ref<HTMLDivElement | null>(null);
const copyIconRef = ref<HTMLDivElement | null>(null);
const successIconRef = ref<HTMLDivElement | null>(null);

onMounted(() => {

    // Create temporary elements to render slot content
    if (slots['copy-icon']) {
      // Set the innerHTML directly from the slot's first element if it exists
      const slotContent = containerRef.value?.querySelector('.copy-icon-content');
      if (slotContent) {
        copyIconRef.value = slotContent as HTMLDivElement;
      }
    }
    
    if (slots['success-icon']) {
      const slotContent = containerRef.value?.querySelector('.success-icon-content');
      if (slotContent) {
        successIconRef.value = slotContent as HTMLDivElement;
      }
    }
});

useCopyCode({
  selector: props.selector,
  position: props.position,
  copyMessage: props.copyMessage,
  copyMessageTimeout: props.copyMessageTimeout,
  containerClassName: props.containerClassName,
  buttonClassName: props.buttonClassName,
  successClassName: props.successClassName,
  highlightOnCopy: props.highlightOnCopy
}, containerRef, copyIconRef, successIconRef);
</script>

<template>
  <div ref="containerRef" :class="customClass">
    <slot></slot>
    <!-- Hidden slots for custom icons with class identifiers -->
    <div style="display: none;">
      <div class="copy-icon-content">
        <slot name="copy-icon"></slot>
      </div>
      <div class="success-icon-content">
        <slot name="success-icon"></slot>
      </div>
    </div>
  </div>
</template> 