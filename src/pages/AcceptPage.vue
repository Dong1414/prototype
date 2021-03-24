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
              <span class="text-gray-300">신청</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr class="bg-white border-4 border-gray-200 text-center">            
            <td>            
              <router-link :to="'/article/detail?id=1' " class="px-16 py-2 ">도우미1</router-link>
            </td>
            <td class="px-16 py-2">
              <span>
                대전
              </span>
            </td>            
            <td class="px-16 py-2">
              <span>
                <input type="submit" value="신청하기" class="btn-primary" />
              </span>
            </td>
          </tr>
          <tr class="bg-white border-4 border-gray-200 text-center">            
            <td>
              <router-link :to="'/article/detail?id=1' " class="px-16 py-2 ">도우미2</router-link>
            </td>
            <td class="px-16 py-2">
              <span>
                대전
              </span>
            </td>            
            <td class="px-16 py-2">
              <span>
                <input type="submit" value="신청하기" class="btn-primary" />
              </span>
            </td>
          </tr>
          <tr class="bg-white border-4 border-gray-200 text-center">            
            <td>
              <router-link :to="'/article/detail?id=1' " class="px-16 py-2 ">도우미3</router-link>
            </td>
            <td class="px-16 py-2">
              <span>
                대전
              </span>
            </td>            
            <td class="px-16 py-2">
              <span>
                <input type="submit" value="신청하기" class="btn-primary" />
              </span>
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
import { IOrder } from '../types'
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