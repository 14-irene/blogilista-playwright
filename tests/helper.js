const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByTestId('login').click()
}
const createWith = async (page, title, author, url) => {
  await page.getByTestId('newBlog').click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByTestId('create').click()
}

export { loginWith, createWith }
