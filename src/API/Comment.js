import { METHODS, HeaderFactory } from './utils'

/**
 * Authenticate into the application
 * @param {string} comment - Email to log into the application
 * @param {string} albumId - Password to log into the application
 */
export const GetComments = albumId => {
  return fetch(`${process.env.API_URL}/comments/` + albumId, {
    method: METHODS.GET,
    headers: HeaderFactory()
  })
}

/**
 * Create A New Comment
 * @param {Object} user - User Data to Create
 */
export const Create = comment => {
  return fetch(`${process.env.API_URL}/comments`, {
    method: METHODS.POST,
    headers: HeaderFactory(),
    body: JSON.stringify(comment)
  })
}
