i
<template>
  <div>
    <!-- Button to trigger modal -->
    <b-button variant="primary" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfQ0gw1NBJbf5X5njAklea2dJlFkN-B7dst69Iwl879QNOVPA/viewform?usp=dialog">Add New Job</b-button>

    <!-- Modal for Job Creation -->
    <b-modal v-model="showModal" title="Find Your Next Hire" size="lg">
      <b-alert v-model="alert.visible" :variant="alert.variant" dismissable>{{
        alert.message
      }}</b-alert>
      <b-form @submit.prevent="submitForm">
        <!-- Contact Info Section -->
        <b-row>
          <b-col cols="12">
            <h4>Contact Info</h4>
          </b-col>
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

        <b-row>
          <b-col md="6">
            <b-form-group label="Min Salary (Optional)" label-for="input-salary">
              <b-form-input
                type="number"
                id="input-salary-min"
                v-model="formData.salary_min"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Max Salary (Optional)" label-for="input-salary">
              <b-form-input
                type="number"
                id="input-salary-max"
                v-model="formData.salary_max"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <!-- Rich Text Editor for Description -->
        <b-row class="mt-3">
          <b-col cols="12">
            <b-form-group label="Description">
              <!-- <tiptap-editor v-model="formData.description"></tiptap-editor> -->
              <tip-tap-editor v-model="formData.description" />
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

        <!-- Submit Button -->
        <b-row>
          <b-col cols="12" class="text-right">
            <b-button type="submit" variant="success">Submit</b-button>
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
        salary_min: null,
        salary_max: null,
        description: '' // Will hold the markdown output from TipTap
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
        if (this.formData.salary_max < this.formData.salary_min) {
          throw new Error('Salary Min is greater than Salary Max')
        }

        // Send formData to PocketBase to create a new job
        await this.pocketbase.collection('jobs').create({
          user: 'some_user_id_tbd',
          title: this.formData.title,
          company: this.formData.company,
          salary_min: this.formData.salary_min,
          salary_max: this.formData.salary_max,
          description: this.formData.description
        })

        this.alert.message = 'Job posted successfully!'
        this.alert.visible = true
        this.alert.variant = 'success'

        this.showModal = false // Close the modal after success
        this.resetForm()
      } catch (error) {
        console.error('Error posting job:', error)
        this.alert.message = `Error posting job: ${error}`
        this.alert.visible = true
        this.alert.variant = 'danger'
      }
    },
    resetForm() {
      // Reset form data and editor content
      this.formData = {
        name: '',
        email: '',
        title: '',
        company: '',
        salary: null,
        description: ''
      }
      this.editor.commands.clearContent()
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
</style>
