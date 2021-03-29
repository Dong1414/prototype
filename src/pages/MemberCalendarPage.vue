<template>
 <TitleBar>일정 리스트</TitleBar>
<section class="section section-article-write-form px-1">
    <div class="container mx-auto">
      <div class="px-6 py-2 mb-6 bg-white rounded-lg shadow-md">
        <FormRow title="검색">
            <input class="form-row-input" type="text" placeholder="검색어를 입력해주세요.">
        </FormRow>
      </div>
    </div>
</section>
<table class="mx-auto container table-auto">
        <thead class="justify-between">
          <tr class="bg-gray-800">            
            <th class="px-16 py-2">
              <span class="text-gray-300">의뢰인</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-300">제목</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-300">수신날짜</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          
            <tr class="bg-white border-4 border-gray-200 text-center" v-bind:key="order.id" v-for="order in state.orders">            
              <td>            
                <router-link :to="'../accept?id=' + order.id" class="px-16 py-2 ">{{ order.extra__writer }}</router-link>
              </td>
              <td class="px-16 py-2">
                <span>
                  {{ order.title  }}
                </span>
              </td>            
               <td class="px-16 py-2">
                <span>
                  {{ order.term }}
                </span>
              </td>
            </tr>
          
        </tbody>        
      </table>      
</template>




<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import { IOrder } from '../types'
import { MainApi } from '../apis'

export default defineComponent({
  name: 'MemberCalendarPage',
  props: {
    globalShare: {
      type: Object,
      required: true
    },  
  },
   setup(props) {
    const mainApi:MainApi = getCurrentInstance()?.appContext.config.globalProperties.$mainApi;    
    const state = reactive({
      orders: [] as IOrder[]
    });

    function loadArticles(loingMemberId:number) {
      mainApi.caleandar_list(loingMemberId)
      .then(axiosResponse => {
        state.orders = axiosResponse.data.body.orders;
      });
    }
    
    onMounted(() => {      
      loadArticles(props.globalShare.loginedMember.id);
     });

     watch(() => props.globalShare.loginedMember.id, (newValue, oldValue) => {
      loadArticles(props.globalShare.loginedMember.id);
    })

    return{
      state
    }
  }

   
})
</script>

<style>

</style>