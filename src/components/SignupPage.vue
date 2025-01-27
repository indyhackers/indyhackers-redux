<template>
  <div class="signup-page dark-mode">
    <AuthPageLayout title="Sign Up">
      <b-card class="mb-3">
        <b-form @submit.prevent="signup">
          <b-form-group label="Email" label-for="email">
            <b-form-input id="email" v-model="email" type="email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="password">
            <b-form-input id="password" v-model="password" type="password" required></b-form-input>
          </b-form-group>

          <b-form-group label="Confirm Password" label-for="confirmPassword">
            <b-form-input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" block>Sign Up</b-button>
        </b-form>
      </b-card>
    </AuthPageLayout>
  </div>
</template>

<script>
import { BCard, BForm, BFormGroup, BFormInput, BButton } from 'bootstrap-vue-next'
import AuthPageLayout from './AuthPageLayout.vue'

export default {
  components: { AuthPageLayout, BCard, BForm, BFormGroup, BFormInput, BButton },
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async signup() {
      if (this.password !== this.confirmPassword) {
        alert('Passwords do not match')
        return
      }

      try {
        const newUser = await this.$pocketbase.collection('users').create({
          email: this.email,
          password: this.password,
          passwordConfirm: this.confirmPassword
        })
        console.log('User created successfully:', newUser)
      } catch (err) {
        console.error('Signup failed:', err)
      }
    }
  }
}
</script>

<style scoped>
.signup-page {
  /* existing styles... */
}

:deep(.dark-mode) {
  background-color: #121212;
  color: #ffffff;
  /* Add other dark mode styles here */
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3700b3;
}
</style>
