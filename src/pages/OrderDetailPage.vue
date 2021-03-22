<template>
  <TitleBar>일정 상세</TitleBar>
  
  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div class="inputform">
          <div class="wid10">
            <span>의뢰인</span>
          </div>
          <div class="w-auto">
            <span>{{ state.Order.title }}</span>
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
            <span>대전광역시 서구 가수원동 관저동로 158</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>요청사항</span>
          </div>
          <div class="w-auto">
            <ul class="text-left">
              <li>도우미 00명</li>
              <li>음식 00</li>
              <li>등 등 등</li>
            </ul>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>도우미</span>
          </div>
          <div class="w-auto">
            <ul class="text-left">
              <li>김도움 <span>010-4567-7890</span></li>
              <li>김도움 <span>010-4567-7890</span></li>
              <li>김도움 <span>010-4567-7890</span></li>
            </ul>
          </div>
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
  name: 'OrderDetailPage',
  props: {
     globalShare: {
      type: Object,
      required: true
    },
    id: {
      type: Number,
      required: true,      
    }
  },
  setup(props) {
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;
    const newArticleTitleElRef = ref<HTMLInputElement>();
    const newArticleBodyElRef = ref<HTMLInputElement>();
    const state = reactive({
      Order: {} as IOrder
    });
    function loadArticle(id:number) {
      mainApi.article_detail(id)
      .then(axiosResponse => {        
        state.Order = axiosResponse.data.body.Order;        
        
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