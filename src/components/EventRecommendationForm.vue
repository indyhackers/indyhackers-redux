<template>
  <b-container id="event-recommendation-form" class="mt-5">
    <h2>Recommend an Event</h2>
    <b-form @submit.prevent="submitForm">
      <b-form-group label="Email *" label-for="email">
        <b-form-input id="email" type="email" v-model="form.email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Title *" label-for="title">
        <b-form-input id="title" type="text" v-model="form.title" required></b-form-input>
      </b-form-group>

      <b-form-group label="Description *" label-for="description">
        <b-form-textarea id="description" v-model="form.description" required></b-form-textarea>
      </b-form-group>

      <b-form-group label="Meetup or Site URL *" label-for="url">
        <b-form-input id="url" type="url" v-model="form.url" required></b-form-input>
      </b-form-group>

      <!-- <b-form-group label="Start Date *" label-for="start-date">
        <b-form-datepicker id="start-date" v-model="form.startDate" required></b-form-datepicker>
      </b-form-group> -->

      <!-- <b-form-group label="Start Time *" label-for="start-time">
        <b-form-timepicker id="start-time" v-model="form.startTime" required></b-form-timepicker>
      </b-form-group> -->

      <!-- <b-form-group label="End Date" label-for="end-date">
        <b-form-datepicker id="end-date" v-model="form.endDate"></b-form-datepicker>
      </b-form-group> -->

      <!-- <b-form-group label="End Time *" label-for="end-time">
        <b-form-timepicker id="end-time" v-model="form.endTime" required></b-form-timepicker>
      </b-form-group> -->

      <b-form-group label="Repeats *" label-for="repeat">
        <b-form-select
          id="repeat"
          v-model="form.repeat"
          :options="repeatOptions"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </b-container>
</template>

<script setup>
import { ref } from 'vue'
import {
  BContainer,
  BForm,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BFormSelect,
  BButton
  //BFormTimepicker
} from 'bootstrap-vue-next'

const form = ref({
  email: '',
  title: '',
  description: '',
  url: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  repeat: 'Not at all'
})

const repeatOptions = [
  { value: 'Weekly', text: 'Weekly' },
  { value: 'Monthly', text: 'Monthly' },
  { value: 'Not at all', text: 'Not at all' }
]

function submitForm() {
  // Handle form submission logic here
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
#event-recommendation-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
