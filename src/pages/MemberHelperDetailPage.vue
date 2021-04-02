<template>
  <TitleBar>도우미 상세</TitleBar>
  
  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div class="inputform">
          <div class="wid10">
            <span>이름</span>
          </div>
          <div class="w-auto">
            <span>{{ state.helperOrder.name }}</span>
          </div>        
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>활동지역</span>
          </div>
          <div class="w-auto">
            <span>{{ state.helperOrder.sido }}</span>
          </div>
        </div>
        <div class="inputform">
          <div class="wid10">
            <span>연락처</span>
          </div>
          <div class="w-auto">
            <span>{{ state.helperOrder.extra__cellphoneNo }}</span>
          </div>
        </div>        
        <div class="inputform">
          <div class="wid10">
            <span>경력</span>
          </div>
          <div class="w-auto">
            <span>{{ state.helperOrder.career }}</span>
          </div>
        </div>
          <div>
            <form v-on:submit.prevent="acceptOrder">           
              <input type="submit" value="수락" class="btn-primary" />
            </form>
          </div>                  
      </div>
    </div>
  </section>
  
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import { IHelperOrder } from '../types'
import { MainApi } from '../apis'
import { Router } from 'vue-router'

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
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;        
    const state = reactive({
      helperOrder: {} as IHelperOrder
    });
    function loadHelper(id:number) {
      mainApi.helper_detail(id)
      .then(axiosResponse => {        
        state.helperOrder = axiosResponse.data.body.helperOrder;                                        
      });
    }

    onMounted(() => {            
      loadHelper(props.id);            
    })
    watch(() => props.id, (newValue, oldValue) => {      
      loadHelper(props.id);      
    })            

    function acceptOrder() {
      const yesOrNo = confirm('요청을 수락 하시겠습니까?').valueOf()

      if(yesOrNo == false){
        return;
      }
      acceptHelperOrder(state.helperOrder.id);
    }

    function acceptHelperOrder(id:number){
      mainApi.acceptHelperOrder(id)
        .then(axiosResponse => {
          alert(axiosResponse.data.msg);
          if ( axiosResponse.data.fail ) {
            return;
          }          
          router.replace("../accept?id=" + state.helperOrder.orderId);
        })   
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