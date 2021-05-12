/* =========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
import { userService } from '../../auth/authService'
import router from '../../router/index'

export default {
  login ({ dispatch, commit }, { username, password }) {
    commit('loginRequest', { username })

    userService.login(username, password)
      .then(
        user => {
          commit('loginSuccess', user)
          router.push('/')
        },
        error => {
          commit('loginFailure', error)
          // dispatch('alert/error', error, { root: true })
          console.log('error')
        }
      )
  },
  logout ({ commit }) {
    userService.logout()
    commit('logout')
  }
}
