<script setup lang="ts">
import { CopyCode } from './index';
</script>

<template>
  <div class="App" style="max-width: 800px; margin: 0 auto; padding: 2rem; font-family: system-ui, -apple-system, sans-serif; color: #e0e0e0; line-height: 1.6; background-color: #1a1a1a; min-height: 100vh; text-align: left;">
    <h1 style="border-bottom: 2px solid #5a25eb; padding-bottom: 0.5rem; color: #8b5cf6;">
      Copy Code Vue Demo
    </h1>
    
    <p style="font-size: 1.1rem; margin-bottom: 2rem; color: #d1d5db;">
      A lightweight library that adds copy buttons to code blocks.
    </p>
    
    <section style="margin-bottom: 3rem;">
      <h2 style="color: #a78bfa;">Using CopyCode Component</h2>
      <p>This component adds copy buttons to all code blocks within it.</p>
      
      <CopyCode>
        <div style="background: #2d2d2d; padding: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          <h3 style="margin-top: 0; padding-left: 1rem; color: #d1d5db;">Example code blocks:</h3>
          
          <pre class="code-block">
            <code>function hello() {
  console.log("Hello, world!");
}</code>
          </pre>
          
          <pre class="code-block"><code>const styles = {
  color: "red",
  fontSize: "16px"
};</code>
          </pre>
        </div>
      </CopyCode>
    </section>
    
    <section style="margin-bottom: 3rem;">
      <h2 style="color: #a78bfa;">Custom Position (Bottom-Right)</h2>
      <p>You can customize the position of the copy button.</p>
      
      <CopyCode position="bottom-right">
        <div style="background: #2d2d2d; padding: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          <pre class="code-block">
            <code>// Position: bottom-right
const fetchData = async () => {
  try {
    const response = await fetch('https://zsktjgscpewgdpdm.apimimic.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};</code>
          </pre>
        </div>
      </CopyCode>
    </section>
    
    <section style="margin-bottom: 3rem;">
      <h2 style="color: #a78bfa;">Custom Copy Message</h2>
      <p>Change the message that appears after copying.</p>
      
      <CopyCode 
        copyMessage="Copied to clipboard!" 
        :copyMessageTimeout="3000"
      >
        <div style="background: #2d2d2d; padding: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          <pre class="code-block">
            <code>// Custom copy message (top-right position)
import { ref } from 'vue';

function Counter() {
  const count = ref(0);
  
  return {
    count,
    increment: () => count.value++
  };
}</code>
          </pre>
        </div>
      </CopyCode>
    </section>
    
    <section style="margin-bottom: 3rem;">
      <h2 style="color: #a78bfa;">Highlight on Copy</h2>
      <p>Briefly highlight the code block when copied.</p>
      
      <CopyCode 
        :highlightOnCopy="true"
        copyMessage=""
        :copyMessageTimeout="500"
      >
        <div style="background: #2d2d2d; padding: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
          <pre class="code-block">
            <code>// This code block will flash when copied
const colors = {
  primary: '#8b5cf6',
  secondary: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6'
};

export default colors;</code>
          </pre>
        </div>
      </CopyCode>
    </section>
    
    <section>
      <h2 style="color: #a78bfa;">Code blocks outside the wrapper</h2>
      <p>These code blocks won't have copy buttons:</p>
      
      <div style="background: #2d2d2d; padding: 1.5rem 0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);">
        <pre class="code-block">
          <code>// This code block won't have a copy button
function Example() {
  return { message: 'Hello World' };
}</code>
        </pre>
      </div>
    </section>
    
    <footer style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #3e3e3e; font-size: 0.875rem; color: #9ca3af; text-align: left;">
      Copy Code Vue Demo
    </footer>
  </div>
</template>

<style>
body {
  background-color: #1a1a1a;
  margin: 0;
  padding: 0;
  color: #e0e0e0;
  text-align: left;
}

.copy-code-vue-button {
  background-color: #3b3b3b !important;
  border-color: #5a5a5a !important;
}

.copy-code-vue-button:hover {
  background-color: #4a4a4a !important;
  border-color: #6a6a6a !important;
}

/* Professional code block styling */
.code-block {
  background: #1e1e2e;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 6px;
  overflow: auto;
  margin: 0 1rem 1rem 1rem;
  border: 1px solid #313244;
  text-align: left;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  tab-size: 2;
}

.code-block + .code-block {
  margin-top: 1.5rem;
}

.code-block code {
  text-align: left;
  white-space: pre;
  display: block;
  font-family: inherit;
}

/* Customize the highlight effect */
.copy-code-vue-highlight {
  filter: brightness(1.3) !important;
  transition: filter 0.15s ease-in-out !important;
}
</style>
