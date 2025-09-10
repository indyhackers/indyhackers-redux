<template>
  <editor-content :editor="editor" class="tiptap-editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent
  },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null
    }
  },

  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [StarterKit],
      onUpdate: ({ editor }) => {
        this.$emit('update:modelValue', editor.getHTML())
      }
    })
  },

  watch: {
    modelValue(newValue) {
      if (this.editor && newValue !== this.editor.getHTML()) {
        this.editor.commands.setContent(newValue, false)
      }
    }
  },

  beforeUnmount() {
    this.editor?.destroy()
  }
}
</script>

<style scoped>
/* TipTap Editor */
:deep(.tiptap-editor) {
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid #ddd;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

:deep(.tiptap-editor:focus) {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}
</style>
