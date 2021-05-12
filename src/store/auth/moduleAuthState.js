/* =========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
export default {
  initialState: () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user
      ? { status: { loggedIn: true }, user }
      : { status: {}, user: null }
  }
}
