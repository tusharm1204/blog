<template>
  <div class=" mx-auto max-w-full px-2 sm:px-6 md:px-8">
    <div class="py-5 px-2">
        <div class="px-2 lg:px-2">
            <div class="flow-root pb-10 px-2 bg-white shadow-sm w-auto h-auto rounded p-4">
                <div class="lg:flex-row md:flex-col sm:mt-0 sm:flex-none flex lg:justify-between lg:mr-5 items-center flex-col gap-3">
                  <SearchBox @search="handleSeach"/>
               </div>
                <div class="overflow-x-auto mt-4">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-x-auto">
                        <div class="overflow-x-auto sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                                <thead class="border-b border-black/20">
                                    <tr>
                                      <th class="py-3.5 px-2 text-base font-semibold text-gray-900 text-start">Name</th>
                                        <th class="py-3.5 px-4 text-base font-semibold text-gray-900 text-center">Email</th>
                                        <th class="py-3.5 px-2 text-base font-semibold text-gray-900 ">Message</th>
                                    </tr>
                                </thead>
                                <tbody v-if="contacts.length > 0" class="divide-y divide-gray-200 bg-white">
                                  <tr v-for="contact in contacts" :key="contact">
                                            <td class="text-xs px-2 text-gray-900 font-normal  py-3 text-start">{{ contact.name }}
                                            </td>
                                             <td class="text-xs px-2 text-gray-900 font-normal  py-3">{{ contact.email }}
                                            </td>
                                             <td class="text-xs px-2 text-gray-900 font-normal  py-3  truncate cell-breakword" v-html="contact.message">
                                            </td>
                                        </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="11" class="text-center min-w-full h-12 text-2xl font-semibold">No matching records found</td>
                                    </tr>
                                </tbody>
                            </table>
                          </div>
                          <div class="flex justify-between items-center mt-3 mx-3">
                            <PageEvent @onChange="pageChange" />
                            <ul class="pagination  flex justify-end">
                                  <li class="page-item">
                                  <a class="page-link" href="#" @click.prevent="handlePrev">Previous</a>
                                  </li>
                                  <li class="page-item" v-for="page in totalPage" :key="page">
                                  <a class="page-link" href="#" @click.prevent="currentPage = page">{{page}}</a>
                                  </li>
                                  <li class="page-item">
                                  <a class="page-link" href="#" @click.prevent="handleNext">Next</a>
                                  </li>
                                  </ul>
                              </div>
                        </div>
                      </div>
                      
                    </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { PERPAGE } from "@/Constance/constance";
import { ref, onMounted,watch } from "vue";
import PageEvent from "./PageEvent.vue";
import SearchBox from "./SearchBox.vue";
import axios from "axios";  


const contacts = ref([]);
const page = ref(1);
let perPage = ref(PERPAGE);
const totalPage = ref(0);
const currentPage = ref(1);

onMounted(() => {
  getContact();
});

const handleSeach  = (value) => {
  getContact(1,value);
  console.log(value);
};

watch (currentPage,(value) =>{
  console.log(value);
  getContact(value);
});


const handlePrev =() =>{
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const handleNext =() =>{
  if (currentPage.value < totalPage.value) {
        currentPage.value++;
      }

};


const pageChange = (value) => {
  perPage.value = parseInt(value);
  getContact(1);
  page.value = 1;
};

const getContact = (page,search = '') => {
  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  let token = user.token ;

      axios.get(`https://blog-api-dev.octalinfotech.com/api/contact-us/index?page=${page}&per_page=${perPage.value}&search=${search}`,{
        headers : {
          authorization : `Bearer ${token}`
        }
      }).then((res)=>{
      contacts.value = res.data.data.data;
      totalPage.value = res.data.data.last_page;

      })
        .catch((err) => {  
   console.log(err);
        });
};
</script>

<style scoped>
.cell-breakword {
  word-break: break-all;
  max-width: 5px;
}

.cell-breakword:hover {
  overflow: visible;
  white-space: normal;
  height: auto;
}
</style>
