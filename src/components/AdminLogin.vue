<template>
  <b-container class="py-5">
    <b-card>
      <b-card-title>Admin Login</b-card-title>
      <b-card-body>
        <b-form @submit.prevent="promoteToAdmin">
          <b-button type="submit" variant="primary" :disabled="loading">
            Promote to Admin
          </b-button>
        </b-form>
        <b-alert v-if="errorMessage" variant="danger" dismissible>{{ errorMessage }}</b-alert>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { ref, inject, onMounted } from 'vue'

export default {
  name: 'AdminLogin',
  setup() {
    const loading = ref(false)
    const errorMessage = ref('')
    const pocketbase = inject('pocketbase')

    onMounted(() => {
      promoteToAdmin()
    })

    const promoteToAdmin = async () => {
      loading.value = true
      errorMessage.value = ''

      try {
        const response = await fetch('/api/admin/promote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: pocketbase.authStore.token
          },
          body: JSON.stringify({ hello: 'moto' })
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Unknown error')
        }

        const data = await response.json()

        localStorage.setItem(
          '__pb_superuser_auth__',
          JSON.stringify({
            token: data.token,
            record: data.record
          })
        )

        // Redirect to PocketBase admin console
        window.location.href = '/_/'
      } catch (error) {
        errorMessage.value = error.message || 'Failed to promote user to admin'
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      errorMessage,
      promoteToAdmin
    }
  }
}
</script>

<style scoped>
.b-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
