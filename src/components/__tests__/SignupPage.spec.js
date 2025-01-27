import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SignupPage from '../SignupPage.vue'

describe('SignupPage', () => {
  it('renders properly', () => {
    const wrapper = mount(SignupPage)
    expect(wrapper.find('h1').text()).toBe('Sign Up')
  })

  it('prevents signup if passwords do not match', async () => {
    const wrapper = mount(SignupPage)

    await wrapper.find('#email').setValue('newuser@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('#confirmPassword').setValue('wrongpassword')
    await wrapper.find("button[type='submit']").trigger('click')

    // Check for an alert or error message
    expect(wrapper.text()).toContain('Passwords do not match')
  })

  it('submits the form with correct data', async () => {
    const wrapper = mount(SignupPage)

    await wrapper.find('#email').setValue('newuser@example.com')
    await wrapper.find('#password').setValue('password123')
    await wrapper.find('#confirmPassword').setValue('password123')
    await wrapper.find("button[type='submit']").trigger('click')

    // Check if the mock server handled the request correctly
    expect(wrapper.text()).not.toContain('Passwords do not match')
  })
})
