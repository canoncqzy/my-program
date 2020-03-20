<!-- Category -->
<template>
  <div id="category">
    <category-nav-bar/>
    <div class="content">
      <slide-bar :slideList="categoryList"
                 @slideBarItemClick='slideBarItemClick'/>
      <!--  右侧内容    -->
      <bscroll class="content-area" ref="scroll">
        <sub-category :subCategoryList="subList"/>
        <tab-control :titles="titleList" @tabClick="tabClick" ref="tabControl"/>
        <goods-list :goods="categoryDetailList[currentType]"/>
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
        // 回到顶部
        this.$refs.scroll.scrollTo(0,0,0)
        //获取数据
        this.currentIndex = obj.index
        this.$refs.tabControl.isActive = 0
        this.getSubcategory(obj.maitKey, obj.index)
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "pop");
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "new");
        this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, "sell");
      },
      //  获取数据
      getCategory() {
        getCategory().then(res => {
          this.categoryList = res.data.category.list
          this.getSubcategory(this.categoryList[0].maitKey, 0)
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "new");
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "sell");
        })
      },
      getSubcategory(maitKey, index) {
        getSubcategory(maitKey).then(res => {
          this.$set(this.subCategoryList, index, res.data.list)
        })
      },
      getCategoryDetail(miniWallkey, type) {
        getCategoryDetail(miniWallkey, type).then(res => {
          this.categoryDetailList[type] = res
          // this.categoryDetailList[type].push(...res)
        })
      },
      tabClick(index) {
        // const typeList = ["pop", "new", "sell"]
        switch (index) {
          case 0:
            this.currentType = "pop";
            break;
          case 1:
            this.currentType = "new";
            break;
          case 2:
            this.currentType = "sell";
            break;
        }
        // this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, this.currentType);
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
