<template>
  <AuthPageLayout title="Login">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="oauth-section">
      <p>Or login with:</p>
      <button @click="loginWithOAuth('google')">Google</button>
      <button @click="loginWithOAuth('github')">GitHub</button>
    </div>
  </AuthPageLayout>
</template>

<script>
import AuthPageLayout from './AuthPageLayout.vue'

export default {
  components: { AuthPageLayout },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const user = await this.$pocketbase
          .collection('users')
          .authWithPassword(this.email, this.password)
        console.log('Logged in as:', user)
      } catch (err) {
        console.error('Login failed:', err)
      }
    },
    async loginWithOAuth(provider) {
      try {
        const authResponse = await this.$pocketbase.collection('users').authWithOAuth2(provider)
        console.log(`Logged in with ${provider}:`, authResponse)
      } catch (err) {
        console.error(`OAuth login failed for ${provider}:`, err)
      }
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  background-color: #6200ea;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3700b3;
}

.oauth-section {
  margin-top: 1rem;
  text-align: center;
}

.oauth-section button {
  margin: 0.5rem 0;
  width: auto;
  padding: 0.5rem 1rem;
}
</style>
