import { test, expect } from '@playwright/test'

test.describe('Login Page', () => {
  test('should render login page correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await expect(page.locator('h1')).toHaveText('Login')
  })

  test('should login successfully with correct credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login')
    await page.fill('#email', 'testuser@example.com')
    await page.fill('#password', 'password123')
    await page.click('button[type="submit"]')

    // Assert navigation to dashboard or successful login message
    await page.waitForURL('http://localhost:3000/dashboard')
    const content = await page.textContent('h1')
    expect(content).toContain('Welcome Back')
  })
})
