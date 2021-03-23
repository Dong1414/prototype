<template>
 <TitleBar>요청 리스트</TitleBar>
<section class="section section-article-write-form px-1">
    <div class="container mx-auto">
      <div class="px-6 py-2 mb-6 bg-white rounded-lg shadow-md">
        <FormRow title="검색">
            <input ref="newArticleTitleElRef" class="form-row-input" type="text" placeholder="검색어를 입력해주세요.">
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
          <tr class="bg-white border-4 border-gray-200 text-center">            
            <td>            
              <router-link :to="'/order/detail?id=1' " class="px-16 py-2 ">유저1</router-link>
            </td>
            <td class="px-16 py-2">
              <span>
                유저1님께서 장례지도를 요청하셨습니다.
              </span>
            </td>            
            <td class="px-16 py-2">
              <span>
                2021-03-17 12:37
              </span>
            </td>
          </tr>
          <tr class="bg-white border-4 border-gray-200 text-center">            
            <td>
              <router-link :to="'/article/request?id=1' " class="px-16 py-2 ">유저1</router-link>
            </td>
            <td class="px-16 py-2">
              <span>
                유저1님께서 장례지도를 요청하셨습니다.
              </span>
            </td>            
            <td class="px-16 py-2">
              <span>
                2021-03-17 12:37
              </span>
            </td>
          </tr>
          <tr class="bg-white border-4 border-gray-200 text-center">            
            <td>
              <router-link :to="'/article/request?id=1' " class="px-16 py-2 ">유저1</router-link>
            </td>
            <td class="px-16 py-2">
              <span>
                유저1님께서 장례지도를 요청하셨습니다.
              </span>
            </td>            
            <td class="px-16 py-2">
              <span>
                2021-03-17 12:37
              </span>
            </td>
          </tr>
        </tbody>        
      </table>
</template>




<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'MemberRequestListPage',
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