<script setup lang="ts">
import { ref } from 'vue';
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
  highlightOnCopy: false
});

const containerRef = ref<HTMLDivElement | null>(null);

useCopyCode({
  selector: props.selector,
  position: props.position,
  copyMessage: props.copyMessage,
  copyMessageTimeout: props.copyMessageTimeout,
  containerClassName: props.containerClassName,
  buttonClassName: props.buttonClassName,
  successClassName: props.successClassName,
  highlightOnCopy: props.highlightOnCopy
}, containerRef);
</script>

<template>
  <div ref="containerRef" :class="customClass">
    <slot></slot>
  </div>
</template> 