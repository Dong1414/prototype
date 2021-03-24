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
            <span>{{ state.order.extra__writer }}</span>
          </div>        
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>기간</span>
          </div>
          <div class="w-auto">
            <span>{{ state.order.term }}</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>연락처</span>
          </div>
          <div class="w-auto">
            <span>{{ state.order.extra__cellphoneNo }}</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>장소</span>
          </div>
          <div class="w-auto">
            <span>{{ state.order.funeralHome }}</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>요청사항</span>
          </div>
          <div class="w-auto">
            <ul class="text-left">
              <li>{{ state.order.body }}</li>              
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
import { Router } from 'vue-router'

export default defineComponent({
  name: 'CaleandarDetailPage',
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
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;        
    const state = reactive({
      order: {} as IOrder
    });
    function loadArticle(id:number) {
      mainApi.order_detail(id)
      .then(axiosResponse => {        
        state.order = axiosResponse.data.body.order;                                
        
      });
    }

    onMounted(() => {      
      loadArticle(props.id);            
    })
    watch(() => props.id, (newValue, oldValue) => {      
      loadArticle(props.id);      
    })    
    
    function acceptOrder() {
      const yesOrNo = confirm('요청을 수락 하시겠습니까?').valueOf()

      if(yesOrNo == false){
        return;
      }
    }
      
    return {
      state,
      acceptOrder
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