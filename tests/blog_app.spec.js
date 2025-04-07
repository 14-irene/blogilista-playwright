const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'ira',
        username: 'irir',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('loginForm')).toBeVisible()
  })
  
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'irir', 'salainen')
      const loginDiv = await page.locator('.popup')
      await expect(loginDiv).toContainText('logged in as irir')
      await expect(loginDiv).toHaveCSS('border', '2px solid rgb(0, 128, 0)') 
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'irir', 'väärä')
      const errorDiv = await page.locator('.popup')
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border', '2px solid rgb(255, 0, 0)')
    })
  })
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'irir', 'salainen')
    })
    test('a new blog can be created', async ({ page }) => {
      await createWith(page, 'blogi', 'ira', 'url')
      const addedDiv = await page.locator('.popup')
      await expect(addedDiv).toContainText('added a new blog blogi by ira') 
      await expect(addedDiv).toHaveCSS('border', '2px solid rgb(0, 128, 0)') 
      
    })
  })
})
