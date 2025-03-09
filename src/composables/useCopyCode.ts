import { onMounted, onUnmounted, Ref, ref } from 'vue';
import { CopyCodeOptions } from '../types/CopyCodeOptions';
import { CopyIcon } from '../icons/CopyIcon';
import { CheckIcon } from '../icons/CheckIcon';

// Position classes mapping with standalone CSS (no Tailwind)
const positionClasses = {
  'top-right': 'copy-code-vue-position-tr',
  'top-left': 'copy-code-vue-position-tl',
  'bottom-right': 'copy-code-vue-position-br',
  'bottom-left': 'copy-code-vue-position-bl',
};

export const useCopyCode = (
  options: CopyCodeOptions,
  containerRef?: Ref<HTMLElement | null>
) => {
  const {
    selector = 'pre code',
    position = 'top-right',
    copyMessage = 'Copied',
    copyMessageTimeout = 2000,
    containerClassName = 'copy-code-vue-button-container',
    buttonClassName = 'copy-code-vue-button',
    successClassName = 'copy-code-vue-success',
    highlightOnCopy = false,
  } = options;

  // Skip execution during SSR
  if (typeof window === 'undefined') {
    return;
  }

  // Array to keep track of buttons for cleanup
  const cleanupFunctions = ref<(() => void)[]>([]);

  onMounted(() => {
    // Use document as root element if no ref is provided
    const rootElement = containerRef?.value || document;

    // CSS for custom animations and positioning
    const style = document.createElement('style');
    if (!document.head.querySelector('#copy-code-vue-styles')) {
      style.id = 'copy-code-vue-styles';
      style.textContent = `
        .copy-code-vue-wrapper pre {
          position: relative;
        }
        
        .copy-code-vue-button-container {
          position: absolute;
          z-index: 100;
          pointer-events: auto;
        }
        
        .copy-code-vue-position-tr {
          top: 8px;
          right: 8px;
        }
        
        .copy-code-vue-position-tl {
          top: 8px;
          left: 8px;
        }
        
        .copy-code-vue-position-br {
          bottom: 8px;
          right: 8px;
        }
        
        .copy-code-vue-position-bl {
          bottom: 8px;
          left: 8px;
        }
        
        .copy-code-vue-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background-color: rgb(50,58,80);
          border: 1px solid rgb(79,84,104);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          pointer-events: auto;
          color: currentColor;
          opacity: 0.8;
        }
        
        .copy-code-vue-button:hover {
          background-color: rgb(79,84,104);
          border-color: rgb(86,90,105);
          opacity: 1;
        }
        
        .copy-code-vue-button:focus {
          outline: none;
        }
        
        .copy-code-vue-success {
          color:rgb(30, 218, 155);
        }
        
        @keyframes copy-code-vue-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .copy-code-vue-fade-in {
          animation: copy-code-vue-fade-in 0.5s ease-in-out;
        }
        
        .copy-code-vue-highlight {
          transition: filter 0.15s ease-in-out;
          -webkit-filter: invert(80%);
          filter: invert(80%);
        }
        
        .copy-code-vue-flex {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `;
      document.head.appendChild(style);
    }

    // Find all code blocks within the root element
    const codeBlocks = rootElement.querySelectorAll(selector);

    // Add copy button to each code block
    codeBlocks.forEach((codeBlock) => {
      // Skip if code block already has a copy button
      const parentPre = codeBlock.parentElement;
      if (!parentPre || parentPre.tagName !== 'PRE' || parentPre.querySelector('.copy-code-vue-button-element')) {
        return;
      }
      
      // Make sure the pre element has position relative for absolute positioning
      parentPre.style.position = 'relative';

      // Create container for the button
      const buttonContainer = document.createElement('div');
      buttonContainer.className = `${containerClassName} ${positionClasses[position]} copy-code-vue-button-container-element`;

      // Create the copy button
      const copyButton = document.createElement('button');
      copyButton.className = `${buttonClassName} copy-code-vue-button-element`;
      copyButton.setAttribute('aria-label', 'Copy code');
      copyButton.innerHTML = CopyIcon;

      // Click handler to copy code
      const clickHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        
        let code = codeBlock.textContent || '';
        
        navigator.clipboard.writeText(code).then(() => {
          // Highlight the code block if requested
          if (highlightOnCopy && parentPre) {
            parentPre.classList.add('copy-code-vue-highlight');
            setTimeout(() => {
              parentPre.classList.remove('copy-code-vue-highlight');
            }, 400);
          }

          // Change button to show success with green check icon
          copyButton.innerHTML = `<div class="${successClassName} copy-code-vue-flex copy-code-vue-fade-in">
              ${copyMessage ? `<div>${copyMessage}</div>` : ''}
              ${CheckIcon}
            </div>`;

          // Reset button after the timeout
          setTimeout(() => {
            copyButton.innerHTML = CopyIcon;
          }, copyMessageTimeout);
        }).catch(error => {
          console.error('Failed to copy code:', error);
          copyButton.innerHTML = `<div class="copy-code-vue-fade-in" style="color: #ef4444;">Failed to copy!</div>`;
          
          setTimeout(() => {
            copyButton.innerHTML = CopyIcon;
          }, copyMessageTimeout);
        });
      };

      copyButton.addEventListener('click', clickHandler);
      cleanupFunctions.value.push(() => copyButton.removeEventListener('click', clickHandler));

      // Add button to container
      buttonContainer.appendChild(copyButton);

      // Add the button container to the pre element
      parentPre.appendChild(buttonContainer);
    });
  });

  // Cleanup function
  onUnmounted(() => {
    cleanupFunctions.value.forEach((cleanup: () => void) => cleanup());
    
    if (containerRef?.value) {
      const codeBlocks = containerRef.value.querySelectorAll(selector);
      codeBlocks.forEach(codeBlock => {
        const parentPre = codeBlock.parentElement;
        if (parentPre) {
          const buttonContainer = parentPre.querySelector(`.copy-code-vue-button-container`);
          if (buttonContainer) {
            parentPre.removeChild(buttonContainer);
          }
        }
      });
    }
  });
}; 