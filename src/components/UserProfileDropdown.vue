<template>
  <b-nav-item-dropdown
    v-if="isAuthenticated"
    variant="none"
    right
    no-wrapper
    menu-class="dropdown-menu-right dropdown-menu-dark"
    toggle-class="toggle-user-dropdown"
  >
    <template #button-content>
      <b-avatar
        variant="none"
        :badge="null"
        badge-variant="dark"
        badge-placement="bottom-end"
        rounded="circle"
        rounded-top="0"
        :src="avatarUrl"
        class="me-2"
      ></b-avatar>
      {{ userProfile.name || 'User' }}
    </template>
    <b-dropdown-item @click="managePreferences">Manage Preferences</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item @click="logout" class="text-danger">Log Out</b-dropdown-item>
  </b-nav-item-dropdown>
  <b-nav-item v-else href="/login">Log In</b-nav-item>
</template>

<script>
import { ref, computed, onMounted, inject } from 'vue'

export default {
  name: 'UserProfileDropdown',
  setup() {
    const userProfile = ref({})
    const isAuthenticated = computed(() => pocketbase.authStore.isValid)
    const avatarUrl = computed(
      () =>
        `api/files/${userProfile.value.collectionId}/${userProfile.value.id}/${userProfile.value.avatar}`
    )
    // Inject pocketbase
    const pocketbase = inject('pocketbase')
    const router = inject('router')

    const fetchUserProfile = async () => {
      if (isAuthenticated.value) {
        try {
          userProfile.value = pocketbase.authStore.model
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }
    }

    const managePreferences = () => {
      router.push('/account')
    }

    const logout = () => {
      pocketbase.authStore.clear()
      userProfile.value = {}
      window.location.href = '/' // Redirect to login page
    }

    onMounted(fetchUserProfile)

    return {
      isAuthenticated,
      avatarUrl,
      userProfile,
      managePreferences,
      logout
    }
  }
}
</script>

<style scoped>
.user-dropdown-toggle {
  display: flex;
  align-items: center;
}

.user-dropdown-toggle::before {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}

:deep(div),
:deep(.dropdown) {
  background-color: none !important; /* Match the theme */
  background-image: none !important;
  fill-opacity: 0 !important;
}
</style>
