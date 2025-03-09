# Copy Code Vue

A lightweight Vue library that automatically adds copy buttons to code blocks. Customizable options for button position, styling, text and highlighting.

<p align="center">
  <img src="https://github.com/rarar89/copy-code-vue/blob/main/public/copy-code-block.gif?raw=true" alt="Copy Code Demo" style="max-width:300px" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/copy-code-vue">
    <img src="https://img.shields.io/npm/v/copy-code-vue.svg" alt="npmjs" />
  </a>
  <a href="https://github.com/rarar89/copy-code-react">
    <img src="https://img.shields.io/badge/React-library-blue" alt="React version" />
  </a>
</p>

## Installation

Install using pnpm, npm or yarn

```bash
pnpm install copy-code-vue
```

```bash
npm install copy-code-vue
```

```bash
yarn add copy-code-vue
```

## Usage

### Method 1: Using the CopyCode Component

The CopyCode component automatically adds copy buttons to all code blocks within it. This is the simplest way to add copy functionality to specific sections of your app.

```vue
<script setup>
import { CopyCode } from 'copy-code-vue';
</script>

<template>
  <CopyCode>
    <div>
      <h3>Example code block:</h3>
      <pre>
        <code>
function hello() {
  console.log("Hello, world!");
}
        </code>
      </pre>
    </div>
  </CopyCode>
</template>
```

CopyCode component also works with v-html:

```vue
<script setup>
import { CopyCode } from 'copy-code-vue';
</script>

<template>
  <CopyCode>
    <div v-html="'<pre><code>console.log(\"Hello, world!\");</code></pre>'"></div>
  </CopyCode>
</template>
```

You can customize the appearance and behavior of the copy buttons:

```vue
<script setup>
import { CopyCode } from 'copy-code-vue';
</script>

<template>
  <CopyCode 
    position="bottom-right" 
    copyMessage="Copied!" 
    :highlightOnCopy="true"
  >
    <!-- Your code blocks here -->
  </CopyCode>
</template>
```

### Method 2: Using the Composable Directly

For more control, you can use the useCopyCode composable directly in your components. This allows you to target specific sections of your app.

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { useCopyCode } from 'copy-code-vue';

// Create a ref to limit the scope of code blocks that will get copy buttons
const containerRef = ref(null);

// Apply the composable with custom options
useCopyCode(
  { 
    position: 'top-left',
    copyMessage: 'Code Copied!',
    highlightOnCopy: true 
  }, 
  containerRef
);
</script>

<template>
  <div ref="containerRef">
    <pre>
      <code>
// This code block will have a copy button
function example() {
  return "Hello world!";
}
      </code>
    </pre>
  </div>
</template>
```

Without a ref, the composable will apply to all code blocks in the document:

```vue
<script setup>
import { useCopyCode } from 'copy-code-vue';

// Add copy buttons to all code blocks in the document
useCopyCode({ 
  selector: 'pre code',
});
</script>

<template>
  <div>
    <!-- Your content with code blocks -->
  </div>
</template>
```

## Options

Both the CopyCode component and useCopyCode composable accept the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| selector | string | 'pre code' | CSS selector for code blocks |
| position | string | 'top-right' | Position of the copy button. Options: 'top-right', 'top-left', 'bottom-right', 'bottom-left' |
| copyMessage | string | 'Copied' | Message to show after copying |
| copyMessageTimeout | number | 2000 | Time in milliseconds to show the success message |
| containerClassName | string | 'copy-code-vue-button-container' | Class name for the button container |
| buttonClassName | string | 'copy-code-vue-button' | Class name for the copy button |
| successClassName | string | 'copy-code-vue-success' | Class name for success message |
| highlightOnCopy | boolean | false | Whether to highlight the code block when copied |

## Development

To develop and test the library:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The development server will start, and you can view the examples at `http://localhost:5173` (or the port shown in your terminal).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
