import { METHODS, HeaderFactory } from './utils'

/**
 * Get Spotify albums based on search criteria
 * @param {string} query - The search query
 */
export const GetAlbums = (query, token) => {
  return fetch(`${process.env.API_URL}/search` + query, {
    method: METHODS.GET,
    headers: HeaderFactory(token)
  })
}

/**
 * Create A New User
 * @param {Object} user - User Data to Create
 */
export const Create = (comment, token) => {
  return fetch(`${process.env.API_URL}/comments`, {
    method: METHODS.POST,
    headers: HeaderFactory(token),
    body: JSON.stringify(comment)
  })
}
