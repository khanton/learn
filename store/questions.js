export const state = () => ({
  list: [],
  current: [],
  item: null
})

export const mutations = {
  next(state) {
    [state.item] = state.current.splice(Math.floor(Math.random() * state.current.length), 1)
  },
  reset(state) {
    state.current = state.list;
    [state.item] = state.current.splice(Math.floor(Math.random() * state.current.length), 1)

  },
  set(state, list) {
    state.list = list
    state.current = list;
    [state.item] = state.current.splice(Math.floor(Math.random() * state.current.length), 1)
  },
}

export const getters = {
  item(state) {
    return state.item
  },
}

export const actions = {
  set({
    commit
  }, list) {
    commit('set', list)
  },
  reset({
    commit
  }) {
    commit('reset')
  },
  next({
    commit
  }) {
    commit('next')
  }

}
