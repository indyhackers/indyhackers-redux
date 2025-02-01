import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginPage from '../LoginPage.vue'

describe('LoginPage', () => {
  it('renders properly', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.find('h1').text()).toBe('Login')
  })

  it('submits the form with correct data', async () => {
    const wrapper = mount(LoginPage)

    await wrapper.find('#email').setValue('testuser@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find("button[type='submit']").trigger('click')

    // Check if the mock server handled the request correctly
    expect(wrapper.text()).not.toContain('Invalid credentials')
  })
})
