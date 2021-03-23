<template>
  <TitleBar>요청 페이지</TitleBar>
  
  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div class="inputform">
          <div class="wid10">
            <span>의뢰인</span>
          </div>
          <div class="w-auto">
            <span>asd</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>연락처</span>
          </div>
          <div class="w-auto">
            <span>010-1234-1234</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>장소</span>
          </div>
          <div class="w-auto">
            <span>asd</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>기간</span>
          </div>
          <div class="w-auto">
            <span>asd</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>요청사항</span>
          </div>
          <div class="w-auto">
            <ul class="text-left">
              <li>asd</li>
              <li>음식 00</li>
              <li>등 등 등</li>
            </ul>
          </div>
        </div>       
        <div class="btns text-center">
          <router-link :to="'/accept' " class="btn-primary">수락</router-link>
          <input v:on="submit" value="수락" class="btn-primary" />
          <input v:on="submit" value="거절" class="btn-primary" />
        </div>
      </div>
    </div>
  </section>
  
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import { IOrder } from '../types'
import { MainApi } from '../apis'
export default defineComponent({
  name: 'ArticleDetailPage',
  props: {
     globalShare: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true,
      default:1
    }
  },
  setup(props) {
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();
    const state = reactive({
      article: {} as IOrder
    });
    function loadArticle(id:number) {
      mainApi.article_detail(id)
      .then(axiosResponse => {
        state.article = axiosResponse.data.body.order;
      });
    }
    onMounted(() => {
      loadArticle(props.id);
    });
    watch(() => props.id, (newValue, oldValue) => {
      loadArticle(props.id);
    })    
    return {
      state,      
    }
  }
})
</script>

<style scoped>
.wid10{
  width: 10%;
}
.inputform{
  display: flex;
  text-align: center;
  margin-bottom:45px;
}
</style> 