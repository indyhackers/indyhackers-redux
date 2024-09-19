<template>
  <div>
    <!-- Modal Configuration (Center or Side) -->
    <b-modal
      v-if="modalType === 'center'"
      v-model="showModal"
      title="Manage Entry"
      size="lg"
      class="custom-modal"
    >
      <slot name="modal-header"></slot>

      <template v-if="mode === 'view'">
        <!-- Default View Mode -->
        <div v-for="field in schema.fields" :key="field.name" class="view-mode-field">
          <b-form-group :label="field.name" class="custom-form-group">
            <div>{{ item[field.name] }}</div>
          </b-form-group>
        </div>
      </template>

      <template v-else>
        <!-- Default Create/Update/Delete Form -->
        <b-form @submit.prevent="handleSubmit" class="custom-form">
          <div v-for="field in schema.fields" :key="field.name" class="custom-input-container">
            <b-form-group :label="field.name" class="custom-form-group">
              <template v-if="field.type === 'text'">
                <b-form-input
                  v-model="formData[field.name]"
                  :type="field.name === 'password' ? 'password' : 'text'"
                />
              </template>
              <template v-else-if="field.type === 'number'">
                <b-form-input v-model="formData[field.name]" type="number" />
              </template>
              <template v-else-if="field.type === 'boolean'">
                <b-form-checkbox v-model="formData[field.name]" />
              </template>
              <template v-else-if="field.type === 'richtext'">
                <tiptap-editor v-model="formData[field.name]" />
              </template>
              <template v-else>
                <!-- Default Fallback Input -->
                <b-form-input v-model="formData[field.name]" />
              </template>
            </b-form-group>
          </div>
          <b-button type="submit" variant="success" class="custom-submit-btn">
            {{ mode === 'create' ? 'Create' : 'Update' }}
          </b-button>
        </b-form>
      </template>

      <slot name="modal-footer"></slot>
    </b-modal>

    <!-- List View (Table or Cards) -->
    <div>
      <b-table
        v-if="listType === 'table'"
        :items="items"
        :fields="tableFields"
        :per-page="perPage"
        class="custom-table"
        @row-clicked="openEditModal"
      />
      <b-row v-else>
        <b-col v-for="item in items" :key="item.id" cols="12" md="4" class="custom-card-col">
          <slot name="card-view" :item="item">
            <b-card :title="item.title" class="custom-card" @click="openEditModal(item)">
              <p>{{ item.description }}</p>
            </b-card>
          </slot>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Markdown from '@tiptap/extension-markdown'

export default {
  name: 'OmniController',
  props: {
    collection: { type: String, required: true },
    mode: { type: String, default: 'create' },
    modalType: { type: String, default: 'center' },
    listType: { type: String, default: 'table' },
    perPage: { type: Number, default: 10 }
  },
  data() {
    return {
      showModal: false,
      items: [],
      formData: {},
      schema: null,
      tableFields: [],
      editor: null
    }
  },
  methods: {
    async fetchSchema() {
      try {
        const response = await fetch(`/api/collections/${this.collection}/schema`)
        const schemaData = await response.json()
        this.schema = schemaData

        // Initialize formData and table fields
        this.schema.fields.forEach((field) => {
          this.$set(this.formData, field.name, '')
        })
        this.tableFields = this.schema.fields.map((field) => field.name)
      } catch (error) {
        console.error('Error fetching schema:', error)
      }
    },
    async fetchItems() {
      try {
        const response = await fetch(`/api/collections/${this.collection}`)
        const data = await response.json()
        this.items = data
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    },
    async handleSubmit() {
      const url =
        this.mode === 'create'
          ? `/api/collections/${this.collection}`
          : `/api/collections/${this.collection}/${this.formData.id}`
      const method = this.mode === 'create' ? 'POST' : 'PUT'

      try {
        await fetch(url, {
          method: method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.formData)
        })

        await this.fetchItems()
        this.showModal = false
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    openEditModal(item) {
      if (item) {
        Object.keys(this.formData).forEach((key) => {
          this.formData[key] = item[key] || ''
        })
      }
      this.showModal = true
    }
  },
  mounted() {
    this.fetchSchema()
    this.fetchItems()

    this.editor = useEditor({
      extensions: [StarterKit, Markdown],
      content: ''
    })
  }
}
</script>

<style scoped>
/* Modal Styling */
.custom-modal {
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
}

.custom-modal:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.3);
}

/* Form Styling */
.custom-form {
  padding: 20px;
}

.custom-form-group {
  margin-bottom: 1.5rem;
}

.custom-input-container {
  margin-bottom: 1rem;
}

.custom-submit-btn {
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 0.5rem 1rem;
}

/* List Styling */
.custom-table {
  border-radius: 8px;
  overflow: hidden;
}

.custom-card-col {
  margin-bottom: 1.5rem;
}

.custom-card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.custom-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Input Fields */
:deep(.b-form-input, .b-form-checkbox, .b-form-select) {
  border-radius: 5px;
  padding: 0.6rem;
  box-shadow: none;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
}

:deep(.b-form-input:focus, .b-form-checkbox:focus, .b-form-select:focus) {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
}

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
