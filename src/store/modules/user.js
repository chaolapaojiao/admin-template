import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 路由权限信息
    routes: [],
    // 按钮权限信息
    buttons: [],
    // 角色信息
    roles: [],
    // 对比之【项目中已有的异步路由，与服务器返回的路由权限进行对比后最终需要展示的路由】
    resultAsyncRoutes: [],
    // 用户存储的最终路由
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
    state.routes = userInfo.routes
    state.buttons = userInfo.buttons
    state.roles = userInfo.roles
  },
  // 最终计算出来的异步路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户的所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}


// 定义计算异步路由的函数
const computedAsyncroutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      // 递归
      if (item.children && item.children.length) {
        item.children = computedAsyncroutes(item.children, routes)
      }

      return true
    }
  })
}

const actions = {
  // 登录业务
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // console.log(result)
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息 返回的数据包括：用户名name,用户头像avatar,routes[返回的标志：不同的用户该展现哪些菜单] roles用户角色
        const { data } = response
        commit("SET_USERINFO", data)
        commit('SET_RESULTASYNCROUTES', computedAsyncroutes(asyncRoutes, data.routes))
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout退出登录
  async logout({ commit, state }) {
    let result = await logout(state.token)
    if (result.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

