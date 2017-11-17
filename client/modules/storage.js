export const getStorage = () => {
  const state = localStorage.getItem('initial_state')
  if (!state) return []
  return JSON.parse(state)
}

export const setStorage = (state) => {
  localStorage.setItem('initial_state', JSON.stringify(state.cities.selected_cities))
}
