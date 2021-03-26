<template>
  <TitleBar>회원 상세</TitleBar>
  
  <section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">        
        <div class="inputform">
          <div class="wid10">
            <span>활동지역</span>
          </div>
          <div class="w-auto">
            <span>{{ state.member.sido }}</span>
          </div>
        </div>           
          <div>               
              <input type="submit" value="탈퇴" class="btn-primary" />            
          </div>                  
      </div>
    </div>
  </section>
  
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import { IMember } from '../types'
import { MainApi } from '../apis'
import { Router } from 'vue-router'

export default defineComponent({
  name: 'MemberDetailPage',
  props: {
     globalShare: {
      type: Object,
      required: true
    }    
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;        
    const state = reactive({
      member: {} as IMember
    });
    function loadMember(loingMemberId:number) {
      mainApi.member_detail(loingMemberId)
      .then(axiosResponse => {        
        state.member = axiosResponse.data.body.member;                                
        
      });
    }

    onMounted(() => {      
      loadMember(props.globalShare.loginedMember.id);
    })
    watch(() => props.globalShare.loginedMember.id, (newValue, oldValue) => {      
      loadMember(props.globalShare.loginedMember.id);
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