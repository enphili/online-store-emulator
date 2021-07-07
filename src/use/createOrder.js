import store from '@/store/index'

export const useCreateOrder = values => {
  return {
    timestamp: Date.now(),

    userID: store.getters['auth/uid'] || '--',

    list: store.getters['cart/cart'].map(obj => {
      return {productID: obj.id, productName: obj.title, productPrice: obj.price, quantity: obj.quantity, firebaseKey: obj.firebaseKey}
    }),

    status: 'pending-payment',

    userName: store.getters['auth/displayName'] || values.crtName,

    userContact: store.getters['auth/userEmail'] || values.phone,

    userComment: values && values.comment ? values.comment : '--',

    totalCost: store.getters['cart/totalCost']
  }
}