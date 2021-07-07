import {h, render} from 'vue'
import Notification from '@/plugins/notification/Notification.vue'
import store from '@/store/index'

export default {
  install(app) {

    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined'
    if (!isBrowser) return
    const container = document.createElement('div')
    container.id = 'tonot'
    container.style.cssText = 'display: flex; flex-direction: column-reverse; position: fixed; z-index: 999'
    document.body.prepend(container)


    const notificationMethods = () => {
      return {
        addToast(toast) {
          store.dispatch('toast/addNewToast', toast)
          setTimeout(() => store.dispatch('toast/removeToast', toast), toast.timeout)
        },

        error(msg, timeout= 2500) {
          this.addToast({msg, type:'error', timeout})
        },

        success(msg, timeout= 2500) {
          this.addToast({msg, type:'success', timeout})
        },

        warning(msg, timeout = 2500) {
          this.addToast({msg, type:'warning', timeout})
        },

        destroy(el) {
          if (container) render(null, container)
          el = null
        }
      }
    }

    const toast = h(Notification)
    render(toast, container)

    app.config.globalProperties.$notification = notificationMethods()
    app.provide('notification', notificationMethods())
  }
}
