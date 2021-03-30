<template>
 <TitleBar>수락 페이지</TitleBar>
<section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div class="text-center h-2/6 py-24">
          <div>{{ state.order.extra__writer }}님의 의뢰를 수락하였습니다.</div>
        </div>
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
        <div class="pb-6">
          <div class="flex">
            <router-link :to="'/calendar/list' " class="btn-primary">일정 확인하기</router-link>          
          </div>
        </div>
        <div class="px-6 py-6 bg-gray-200 rounded-lg shadow-md">
          <div>
            <table class="mx-auto container table-auto">
        <thead class="justify-between">
          <tr class="bg-gray-800">            
            <th class="px-16 py-2">
              <span class="text-gray-300">이름</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-300">활동지역</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-300">경력</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-300">신청</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr class="bg-white border-4 border-gray-200 text-center" v-bind:key="helperOrder.id" v-for="helperOrder in state.helperOrders">            
              <td class="px-16 py-2">
                <span>{{ helperOrder.extra__writer }}</span>
              </td>
              <td class="px-16 py-2">
                <span>
                  {{ helperOrder.sido }}                                   
                </span>
              </td>            
               <td class="px-16 py-2">
                <span>
                  {{ helperOrder.career }} 
                </span>
              </td>
              <td class="px-16 py-2">
                <form v-on:submit.prevent="acceptOrder">           
                  <input type="submit" value="수락" class="btn-primary" />
                  <div style="display:none" ref = "helperIdElRef">{{ helperOrder.id }} </div>
                </form>
              </td>
            </tr>                                 
        </tbody>        
      </table>
          </div>
        </div>
      </div>
    </div>
</section>


</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import { IOrder, IHelperOrder } from '../types'
import { MainApi } from '../apis'
import { Router } from 'vue-router'


export default defineComponent({
  name: 'AcceptPage',
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
      order: {} as IOrder,      
      helperOrders: [] as IHelperOrder[]
    });

   

    function loadArticle(id:number) {
      mainApi.order_detail(id)
      .then(axiosResponse => {        
        state.order = axiosResponse.data.body.order;                                
        
      });
    }

    function loadHelperOrder(id:number) {
      mainApi.helperOrders(id)
      .then(axiosResponse => {        
        state.helperOrders = axiosResponse.data.body.helperOrders;                                
        
      });  
    }

     function acceptOrder() {
      const yesOrNo = confirm('요청을 수락 하시겠습니까?').valueOf()

      if(yesOrNo == false){
        return;
      }
      const helperIdElRef = ref();

      acceptHelperOrder(helperIdElRef.value);
    }

    function acceptHelperOrder(id:number){
      mainApi.acceptHelperOrder(id)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }
          const newArticleId = axiosResponse.data.body.id;
          router.replace("../accept?id=" + newArticleId);
        })   
    }

    onMounted(() => {      
      loadArticle(props.id);
      loadHelperOrder(props.id);            
    })
    watch(() => props.id, (newValue, oldValue) => {      
      loadArticle(props.id);      
      loadHelperOrder(props.id);
    })    
        
    return {
      acceptOrder,
      state            
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