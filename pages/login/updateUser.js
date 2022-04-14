function updateLocalStorage(g_userData) {
  localStorage.setItem('g_userData', JSON.stringify(g_userData))
}

module.exports = { updateLocalStorage }
