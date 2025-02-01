<template>
  <div class="login-page">
    <AuthPageLayout title="Log in with">
      <div class="oauth-section">
        <div v-for="provider in oauthProviders" :key="provider.name">
          <b-button
            :id="'btn-' + provider.name"
            class="btn-warning"
            @click="loginWithOAuth(provider.name)"
          >
            <template v-if="provider.name === 'github'">
              <IFaGithub />
            </template>
            <template v-else-if="provider.name === 'google'">
              <IFaGoogle />
            </template>
            <template v-else-if="provider.name === 'facebook'">
              <IFaFacebook />
            </template>
            <template v-else-if="provider.name === 'twitter'">
              <IFaTwitter />
            </template>
            <template v-else-if="provider.name === 'linkedin'">
              <IFaLinkedin />
            </template>
            <template v-else-if="provider.name === 'microsoft'">
              <IMdiMicrosoft />
            </template>
            <template v-else-if="provider.name === 'apple'">
              <IFaApple />
            </template>
            <template v-else-if="provider.name === 'discord'">
              <ICarbonLogoDiscord />
            </template>
            <template v-else>
              <IFaOpenid />
            </template>
          </b-button>
          <b-tooltip :target="'btn-' + provider.name" triggers="hover">
            {{ provider.displayName }}
          </b-tooltip>
          <h3 class="mt-3 mb-3">or</h3>
        </div>
      </div>
      <b-form @submit.prevent="login">
        <b-form-group class="form-group" label="Email" label-for="email" label-class="form-label">
          <b-form-input id="email" v-model="email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group class="form-group" label="Password" label-for="password">
          <b-form-input id="password" v-model="password" type="password" required></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="warning" block>Login</b-button>
      </b-form>
      <router-link to="/signup">Don't have an account? Sign up here</router-link>
    </AuthPageLayout>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'
import { BForm, BFormGroup, BFormInput, BButton, BTooltip } from 'bootstrap-vue-next'
import AuthPageLayout from './AuthPageLayout.vue'

export default {
  components: {
    AuthPageLayout,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BTooltip
  },
  setup() {
    const email = ref('')
    const password = ref('')
    const oauthProviders = ref([])

    // Inject pocketbase
    const pocketbase = inject('pocketbase')
    const router = inject('router')
    const emitter = inject('emitter')

    onMounted(async () => {
      try {
        const result = await pocketbase.collection('users').listAuthMethods()
        oauthProviders.value.push(...result.oauth2.providers)
      } catch (err) {
        console.error('Failed to fetch auth methods:', err)
      }
    })

    const login = async () => {
      try {
        const user = await pocketbase
          .collection('users')
          .authWithPassword(email.value, password.value)
        console.log('Logged in as:', user)
        router.push('/')
      } catch (err) {
        console.error('Login failed:', err)
      }
    }

    const loginWithOAuth = async (provider) => {
      try {
        const redirectUrl = `${window.location.origin}/api/oauth2-redirect`

        const authData = await pocketbase.collection('users').authWithOAuth2({
          provider: provider,
          redirectUrl: redirectUrl,
          createData: {
            consents: {
              //   role: provisionalUserRole.id,
              emailConsent: false,
              consents: {}
            }
          }
        })

        console.log(`Logged in with ${provider}:`, authData)

        const existingMeta = authData.record.meta || {}
        await pocketbase.collection('users').update(authData.record.id, {
          meta: { ...existingMeta, [provider]: authData.meta.rawUser }
        })

        emitter.emit('toast', {
          title: 'Logged in with ' + provider,
          variant: 'success'
        })
        router.push('/')
      } catch (err) {
        console.error(`OAuth login failed for ${provider}:`, err)
      }
    }

    return {
      email,
      password,
      oauthProviders,
      login,
      loginWithOAuth
    }
  }
}
</script>

<style scoped>
a {
  color: #fff;
}

.login-page {
  padding: 2rem; /* Match padding from SignupPage.vue */
}

.form-group {
  margin-bottom: 2rem; /* Match margin from SignupPage.vue */
}

button {
  width: 100%;
  padding: 1rem; /* Increase padding for larger buttons */
  border: none;
  border-radius: 8px;
  font-size: 1.25rem; /* Increase font size for larger text */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #3700b3;
}

/* .btn-primary,
.btn-secondary {
  background-color: #6200ea;
} */

.btn-secondary {
  margin: 0.5rem;
  width: auto;
  padding: 0.75rem 1.5rem; /* Increase padding for larger buttons */
  display: flex;
  align-items: center;
}

.icon {
  width: 24px; /* Increase icon size */
  height: 24px; /* Increase icon size */
  margin-right: 0.5rem;
}

.oauth-section {
  margin-top: 1rem;
  text-align: center;
  display: flex;
  justify-content: center; /* Center the buttons horizontally */
  flex-wrap: wrap; /* Allow buttons to wrap if necessary */
}

/* New styles to match SignupPage.vue */
.form-label {
  color: #333;
  font-weight: bold;
}

/* :deep(.form-control) {
  background-color: #3a3a5a;
  color: #ffffff;
  border: none;
  border-radius: 4px;
} */

:deep(.form-control::placeholder) {
  color: #d3d3d3;
}
</style>
