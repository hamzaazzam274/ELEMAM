<template>
  <div class="Main_Class">
    <div class="container">
      <AddSub
        v-if="showAddSub"
        @Close="CloseAndOpenAddSub"
        @GetData="getdata"
      />
      <EditSub
        :Main_Id="this.MainId"
        v-if="ShowEdit"
        @close="CloseAndOpenEditSub"
        @GetData="getdata"
      />
      <nav aria-label="breadcrumb" class="flex items-center justify-between">
        <nav aria-label="breadcrumb">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem
              ><router-link to="/">{{ Type }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem
              ><router-link to="/">{{ Lang }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem active>{{ Class }}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </nav>
        <div
          @click="CloseAndOpenAddSub"
          class="flex items-center gap-2.5 bg-[#eee] p-2.5 rounded cursor-pointer"
        >
          <span>أضف مادة</span>
          <font-awesome-icon :icon="['fas', 'plus']" />
        </div>
      </nav>

      <div
        class="body flex gap-2.5 items-center flex-wrap"
        style="min-height: 58vh"
      >
        <img
          src="../assets/animation_loia37xm_small.gif"
          alt=""
          v-if="showDownloadIcon"
          class="m-auto"
        />
        <div
          class="box w-32 border p-2.5 rounded"
          v-for="(Data, index) in AllData"
          :key="Data"
        >
          <div class="header flex justify-between p-2.5 items-center">
            <div class="flex gap-2.5 items-center">
              <div class="num">{{ index + 1 }}</div>
              <div class="title">{{ Data.sub_name }}</div>
            </div>
            <div>{{ Data.Season }}</div>
            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
          </div>
          <div class="course shadow p-2.5 mb-2.5">
            <div class="title_course">الكورس</div>
            <div class="feat flex justify-between items-center mb-2.5">
              <div class="value">
                <span>{{ Data.Number_of_videos }}</span>
                فيديوهات
              </div>
              <div class="price">
                <span>{{ Data.Video_price }}</span> جنيه
              </div>
              <div class="button cursor-pointer bg-[#eee] p-2.5">شراء</div>
            </div>
            <div class="feat flex justify-between items-center mb-2.5">
              <div class="value">
                <span>{{ Data.Number_of_books }}</span>
                ملازم
              </div>
              <div class="price">
                <span>{{ Data.Book_price }}</span> جنيه
              </div>
              <div class="button cursor-pointer bg-[#eee] p-2.5">شراء</div>
            </div>
            <div class="feat flex justify-between items-center mb-2.5">
              <div class="value">بنك الأسئلة</div>
              <div class="price">
                <span>{{ Data.Question_bank_price }}</span> جنيه
              </div>
              <div class="button cursor-pointer bg-[#eee] p-2.5">شراء</div>
            </div>
            <div class="feat flex justify-between items-center mb-2.5">
              <div class="value">الكورس كاملاً</div>
              <div class="price_test line-through">
                <span>
                  {{
                    +Data.Question_bank_price +
                    +Data.Book_price +
                    +Data.Video_price
                  }}
                </span>
                جنيه
              </div>
              <div class="price">
                <span>
                  {{
                    +Data.Question_bank_price +
                    +Data.Book_price +
                    +Data.Video_price -
                    50
                  }}
                </span>
                جنيه
              </div>
              <div class="button cursor-pointer bg-[#eee] p-2.5">شراء</div>
            </div>
          </div>
          <div class="test shadow p-2.5">
            <div class="title_test flex items-center justify-between mb-2.5">
              <span>الإختبارات</span>
            </div>

            <router-link
              to="/Main_Testing"
              class="button bg-[--main-color] text-white p-2.5 rounded cursor-pointer text-center w-100"
            >
              أختبر نفسك
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-vue-ui-kit";
import { ref } from "vue";

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBOlDn6NmPGHHfdY-gYHvnA6MoM-y0Xbmo",
  authDomain: "elemam-center-for-training.firebaseapp.com",
  projectId: "elemam-center-for-training",
  storageBucket: "elemam-center-for-training.appspot.com",
  messagingSenderId: "253703295162",
  appId: "1:253703295162:web:927a97dbbc2276f30d7283",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
import AddSub from "../components/Add_Sub.vue";
import EditSub from "../components/Edit_Sub.vue";
export default {
  name: "Main_Class",
  emits: ["getData"],
  data() {
    return {
      AllData: [],
      showAddSub: null,
      ShowEdit: null,
      Ids: [],
      MainId: "",
      showDownloadIcon: null,
      Type: "",
      Lang: "",
      Class: "",
    };
  },
  props: ["Main_Id"],
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddSub,
    EditSub,
  },
  mounted() {
    setTimeout(() => {
      this.getvalues();
    }, 10);
    setTimeout(() => {
      this.getdata();
    }, 100);
    setTimeout(() => {
      this.GetId();
      this.AddSubToStore();
    }, 2000);
  },
  methods: {
    getvalues() {
      this.Type = localStorage.getItem("updateType");
      this.Lang = localStorage.getItem("updateLang");
      this.Class = localStorage.getItem("updateClass");
    },
    AddSubToStore() {
      let link = document.querySelectorAll(".box .test a");
      let Sub_Name = this.AllData;
      for (let i = 0; i < link.length; i++) {
        link[i].onclick = () => {
          localStorage.setItem("updateSub", Sub_Name[i].sub_name);
        };
      }
    },
    GetId() {
      let svg = document.querySelectorAll(".box .header > svg");
      let id = this.Ids;
      for (let i = 0; i < id.length; i++) {
        svg[i].onclick = () => {
          this.MainId = id[i];
          this.ShowEdit = true;
        };
      }
    },
    CloseAndOpenAddSub() {
      this.showAddSub = !this.showAddSub;
    },
    CloseAndOpenEditSub() {
      this.ShowEdit = !this.ShowEdit;
    },
    async getdata() {
      this.showDownloadIcon = true;
      this.AllData = [];
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const querySnapshot = await getDocs(
        collection(
          db,
          `كورسات - ${firstWord} - ${localStorage.getItem(
            "updateLang"
          )} - ${localStorage.getItem("updateClass")}`
        )
      );
      querySnapshot.forEach((doc) => {
        this.AllData.push(doc.data());
        this.Ids.push(doc.id);
      });
      this.showDownloadIcon = false;
      this.AddSubToStore();
    },
  },
  setup() {
    const activeItem = ref("collapseOne");
    return {
      activeItem,
    };
  },
};
</script>
<style lang="scss" scoped>
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
}
</style>
