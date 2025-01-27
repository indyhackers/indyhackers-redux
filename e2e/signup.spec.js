import { test, expect } from '@playwright/test'

test.describe('Signup Page', () => {
  test('should render signup page correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/signup')
    await expect(page.locator('h1')).toHaveText('Sign Up')
  })

  test('should prevent signup if passwords do not match', async ({ page }) => {
    await page.goto('http://localhost:3000/signup')
    await page.fill('#email', 'newuser@example.com')
    await page.fill('#password', 'password123')
    await page.fill('#confirmPassword', 'wrongpassword')
    await page.click('button[type="submit"]')

    const errorText = await page.locator('.error-message').textContent()
    expect(errorText).toContain('Passwords do not match')
  })

  test('should signup successfully with valid data', async ({ page }) => {
    await page.goto('http://localhost:3000/signup')
    await page.fill('#email', 'newuser@example.com')
    await page.fill('#password', 'password123')
    await page.fill('#confirmPassword', 'password123')
    await page.click('button[type="submit"]')

    // Assert navigation to welcome page or success message
    await page.waitForURL('http://localhost:3000/welcome')
    const content = await page.textContent('h1')
    expect(content).toContain('Welcome to Our Platform')
  })
})
