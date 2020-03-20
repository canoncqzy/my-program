<!-- Category -->
<template>
  <div id="category">
    <category-nav-bar/>
    <div class="content">
      <slide-bar :slideList="categoryList"
                 @slideBarItemClick='slideBarItemClick'/>
      <!--  右侧内容    -->
      <bscroll class="content-area">
        <sub-category :subCategoryList="subList"/>
        <tab-control :titles="titleList"/>
        <goods-list @tabClick="tabClick" :goods="categoryDetailList[currentType]"/>
      </bscroll>
    </div>
  </div>

</template>

<script>
  import CategoryNavBar from "./childcomps/CategoryNavBar";
  import SlideBar from "./childcomps/SlideBar";

  import Bscroll from "components/common/scroll/Bscroll";
  import TabControl from "components/content/tabcontrol/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import SubCategory from "./childcomps/SubCategory";

  export default {
    name: "Category",
    data() {
      return {
        categoryList: [],
        subCategoryList: [],
        currentIndex: 0,
        titleList: ["流行", "新款", "精选"],
        currentType: "pop",
        categoryDetailList: {
          pop: [],
          new: [],
          sell: []
        }
      };
    },
    components: {
      SubCategory,
      CategoryNavBar,
      SlideBar,
      Bscroll,
      TabControl,
      GoodsList
    },
    computed: {
      subList() {
        return this.subCategoryList[this.currentIndex]
      }
    },
    methods: {
      slideBarItemClick(obj) {
        this.currentIndex = obj.index
        this.getSubcategory(obj.maitKey, obj.index)
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
      },
      //  获取数据
      getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list
          this.getSubcategory(this.categoryList[0].maitKey, 0)
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
        })
      },
      getSubcategory(maitKey, index) {
        getSubcategory(maitKey).then(res => {
          this.$set(this.subCategoryList, index, res.data.list)
        })
      },
      getCategoryDetail(miniWallkey, type) {
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryDetailList[type].push(...res)
        })
      },
      tabClick(index) {
        const typeList = ["pop", "new", "sell"]
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index]);
      }
    },
    created() {
      this.getCategory()
    }
  };
</script>
<style lang='css' scoped>
  #category {
    position: relative;
    height: 100vh;
  }

  .content {
    position: relative;
    height: calc(100% - 49px - 44px);
    overflow: hidden;
    display: flex;
  }

  .content-area {
    height: 100%;
    flex: 1;
  }
</style>
