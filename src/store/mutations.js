export default {
  addCounter(state, payload) {
    payload.count += 1
  },
  addToCart(state, newAdd) {
    newAdd.checked = true
    state.cartList.push(newAdd)
  }
}
