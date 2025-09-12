i
<template>
  <div>
    <!-- Button to trigger modal -->
    <b-button variant="primary" @click="showModal = true">Add New Job</b-button>

    <!-- Modal for Job Creation -->
    <b-modal v-model="showModal" title="Find Your Next Hire" size="lg" hide-footer>
      <b-alert v-model="alert.visible" :variant="alert.variant" dismissable>{{
        alert.message
      }}</b-alert>
      <b-form @submit.prevent="submitForm">

        <!-- Contact Info Section -->
        <b-row>
          <b-col cols="12">
            <h4>Contact Info</h4>
          </b-col>

          <!-- Name and Email -->
          <b-col md="6">
            <b-form-group label="Name" label-for="input-name">
              <b-form-input id="input-name" v-model="formData.name" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Email" label-for="input-email">
              <b-form-input
                type="email"
                id="input-email"
                v-model="formData.email"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Job Info Section -->
        <b-row class="mt-3">
          <b-col cols="12">
            <h4>Job Info</h4>
          </b-col>

          <!-- Title and Company -->
          <b-col md="6">
            <b-form-group label="Job Title" label-for="input-title">
              <b-form-input id="input-title" v-model="formData.title" required></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Company" label-for="input-company">
              <b-form-input id="input-company" v-model="formData.company" required></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Salary -->
        <b-row class="mt-3">
          <b-form-group label="Salary Range (Optional)" label-for="input-salary" class="w-100">
            <div class="d-flex align-items-center">
              <b-input-group append="K" class="w-auto" style="max-width: 120px;">
                <b-form-input type="number" id="input-salary-min" v-model="formData.salary_min" :min="0" :max="1000"></b-form-input>
              </b-input-group>
              <span class="mx-2">-</span>
              <b-input-group append="K" class="w-auto" style="max-width: 120px;">
                <b-form-input type="number" id="input-salary-max" v-model="formData.salary_max" :min="0" :max="1000"></b-form-input>
              </b-input-group>
            </div>
          </b-form-group>
        </b-row>

        <!-- Rich Text Editor for Description and How to Apply -->
        <b-row class="mt-3">
          <b-col cols="12">
            <b-form-group label="Description">
              <!-- <tiptap-editor v-model="formData.description"></tiptap-editor> -->
              <tip-tap-editor class="tip-tap-description" v-model="formData.description" />
              <!-- <div>
                <editor v-model="formData.description" />

                <div class="output-group">
                  <label>Content</label>
                  <code>{{ formData.description }}</code>
                </div> -->
              <!-- </div> -->
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col md="12">
            <b-form-group label="How to Apply">
              <tip-tap-editor class="tip-tap-how-to-apply" v-model="formData.how_to_apply" />
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Submit Button -->
        <b-row class="mt-3">
          <b-col cols="12" class="text-right">
            <b-button variant="tertiary" @click="onCancel">Cancel</b-button>
            <b-button variant="primary" type="submit" class="ml-2">Submit</b-button>
          </b-col>
        </b-row>

      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
//import { BForm, BFormGroup, BFormInput, BButton, BModal, BRow, BCol } from 'bootstrap-vue-next'
//import { useToast } from 'bootstrap-vue-next'
//import { Editor, EditorContent } from '@tiptap/vue-3' //EditorContent
//import StarterKit from '@tiptap/starter-kit'
//import Markdown from '@tiptap/extension-markdown'
import TipTapEditor from '../TipTapEditor.vue'

export default defineComponent({
  name: 'CreateJobModal',
  components: {
    // BForm,
    // BFormGroup,
    // BFormInput,
    // BButton,
    // BModal,
    // BRow,
    // BCol,
    TipTapEditor
  },
  data() {
    return {
      showModal: false,
      formData: {
        name: '',
        email: '',
        title: '',
        company: '',
        salary_min: 0,
        salary_max: 0,
        description: '',
        how_to_apply: ''
      },
      alert: {
        message: '',
        visible: false,
        variant: 'success'
      }
      //editor: null // TipTap editor instance
    }
  },
  mounted() {
    // this.editor = new Editor({
    //   extensions: [StarterKit],
    //   content: ' ' // Empty by default
    // })
  },
  beforeUnmount() {
    //this.editor.destroy() // Clean up TipTap editor instance
  },
  methods: {
    async submitForm() {
      try {
        if (this.formData.salary_max < this.formData.salary_min && this.formData.salary_max > 0) {
          throw new Error('Minimum salary is greater than maximum')
        }

        // If user adds text then deletes, tags will still appear in rich text editor
        if (this.formData.description == null || this.formData.description.replace(/<[^>]*>/g, '').trim().length == 0) {
          throw new Error('Job description is empty')
        } else if (this.formData.how_to_apply == null || this.formData.how_to_apply.replace(/<[^>]*>/g, '').trim().length == 0) {
          throw new Error('How to apply details are empty')
        }

        // Send formData to PocketBase to create a new job
        await this.pocketbase.collection('jobs').create({
          name: this.formData.name,
          email: this.formData.email,
          title: this.formData.title,
          company: this.formData.company,
          salary_min: this.formData.salary_min,
          salary_max: this.formData.salary_max,
          approved: false,
          description: this.formData.description,
          how_to_apply: this.formData.how_to_apply
        })

        this.alert.message = 'Job successfully submitted! Job will be posted after approval.'
        this.alert.visible = true
        this.alert.variant = 'success'

        this.resetForm()
        // Ensure user sees success message
        this.scrollModalTop()
      } catch (error) {
        console.error('Error submitting job:', error.message)
        this.alert.message = `Error submitting job: ${error.message}`
        this.alert.visible = true
        this.alert.variant = 'danger'
        this.scrollModalTop()
      }
    },
    onCancel() {
      this.showModal = false
      this.resetForm()
    },
    resetForm() {
      // Reset form data and editor content
      this.formData = {
        name: '',
        email: '',
        title: '',
        company: '',
        salary_min: 0,
        salary_max: 0,
        description: '',
        how_to_apply: ''
      }
    },
    scrollModalTop() {
      const modalBody = document.querySelector('.modal.fade.show')
      if (modalBody) modalBody.scrollTop = 0
    }
  }
})
</script>

<style scoped>
.job-create-modal {
  padding: 20px;
}

.b-form-group {
  margin-bottom: 1rem;
}

.b-button {
  margin-top: 1rem;
}

.text-right {
  text-align: right;
}

:deep(.tiptap) {
  padding: 0.375rem 0.75rem;

  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  margin-bottom: 1rem;
}

:deep(.tip-tap-description .tiptap.ProseMirror) {
  min-height: 150px;
}

:deep(.tip-tap-how-to-apply .tiptap.ProseMirror) {
  min-height: 75px;
}
</style>
