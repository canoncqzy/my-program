import mutations  from "./mutations";
export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      //  添加商品
      let oldProduct = null
      for(let item of context.state.cartList) {
        if(item.iid === payLoad.iid) {
          oldProduct = item
        }
      }
      //  判断oldproduct
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
        // oldProduct.count += 1
      }else {
        payLoad.count = 1
        context.commit('addToCart', payLoad)
        reject('添加了新的商品')
      }
    })
  }
}
