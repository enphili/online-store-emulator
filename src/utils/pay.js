export const pay = ({totalCost, timestamp, userID, userContact,}) => {
  const widget = new cp.CloudPayments();

  return new Promise((resolve, reject) => {

    widget.pay('charge',
      {
        publicId: 'test_api_00000000000000000000001',
        description: 'Оплата товаров в v-shop-vue3',
        currency: 'RUB',
        skin: "mini",
        amount: totalCost,
        invoiceId: timestamp,
        accountId: userID,
        email: userContact,
      },
      {
        onSuccess(options) {
          resolve(options)
        },
        onFail(reason, options) {
          reject(reason)
        },
        onComplete(paymentResult, options) {  }
      }
    )
  })
};