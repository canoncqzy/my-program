<template>
  <div class="shop-item">
    <div class="item-selector">
      <van-checkbox v-model="goodInfo.checked" />
    </div>
    <div class="item-img">
      <img :src="goodInfo.image" alt="商品图片"/>
    </div>
    <div class="item-info">
      <div class="item-title">{{ goodInfo.title }}</div>
      <div class="item-desc">商品描述: {{ goodInfo.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">{{ goodInfo.price }}</div>
        <div class="item-count right">x{{ goodInfo.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartListItem",
    props: {
      goodInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .shop-item {
    font-size: 0;
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #cccccc;
  }

  .item-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 12%;
  }

  .shop-item:last-child {
    border-bottom: 0;
  }

  .item-title,
  .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    display: block;
    width: 80px;
    height: 100px;
    border-radius: 5px;
    object-fit: cover;
  }

  .item-info {
    font-size: 17px;
    position: relative;
    overflow: hidden;
    width: 88%;
    padding: 5px 10px;
    color: #333333;
  }

  .item-info .item-desc {
    font-size: 14px;
    margin-top: 15px;
    color: #666666;
  }

  .info-bottom {
    position: absolute;
    right: 10px;
    bottom: 10px;
    left: 10px;
    margin-top: 10px;
  }

  .info-bottom .item-price {
    color: #ff4500;
  }
</style>
