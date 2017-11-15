export const types = {
  UPDATE_ALBUMS: 'UPDATE_ALBUMS'
}

export const actions = {
  /**
   * Generates an albums' update action
   *
   * @param {array} albums - List of searched albums
   */
  updateAlbums(albums) {
    return { type: types.UPDATE_ALBUMS, data: { albums } }
  }
}
