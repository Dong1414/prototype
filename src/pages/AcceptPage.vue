<template>
 <TitleBar>수락 페이지</TitleBar>
<section class="section section-member-login-form px-2">
    <div class="container mx-auto">
      <div class="px-6 py-6 bg-white rounded-lg shadow-md">
        <div class="text-center h-2/6 py-24">
          <div><span>유저1</span>님의 의뢰를 수락하셨습니다.</div>
        </div>
        <div class="pb-6">
          <div class="flex">
            <router-link :to="'/member/calendar' " class="btn-primary">일정 확인하기</router-link>          
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
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'AcceptPage',
  props: {
    globalShare: {
      type: Object,
      required: true
    }
  },
})
</script>

<style>

</style>