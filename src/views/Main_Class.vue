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
              ><a href="#"> {{ Type }}</a></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem
              ><a href="#">{{ Lang }}</a></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem active>{{ Class }}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </nav>
        <font-awesome-icon
          :icon="['fas', 'plus']"
          @click="CloseAndOpenAddSub"
        />
      </nav>

      <div class="body flex gap-2.5 items-center flex-wrap">
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
              <span>(<span>20</span> ) اختبار</span>
            </div>
            <div
              class="button bg-[--main-color] text-white p-2.5 rounded cursor-pointer text-center"
            >
              أختبر نفسك
            </div>
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
  data() {
    return {
      AllData: [],
      showAddSub: null,
      ShowEdit: null,
      Ids: [],
      MainId: "",
      showDownloadIcon: null,
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
      this.getdata();
    }, 100);
    setTimeout(() => {
      this.GetId();
    }, 1000);
  },
  methods: {
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
      this.showDownloadIcon = true; // عرض أيقونة التحميل
      this.AllData = [];
      console.log(`${this.Type} - ${this.Lang} - ${this.Class}`);
      const querySnapshot = await getDocs(
        collection(db, `${this.Type} - ${this.Lang} - ${this.Class}`)
      );
      querySnapshot.forEach((doc) => {
        this.AllData.push(doc.data());
        this.Ids.push(doc.id);
      });
      this.showDownloadIcon = false; // إخفاء أيقونة التحميل
      console.log(this.Ids);
    },
  },
  setup() {
    const activeItem = ref("collapseOne");
    return {
      activeItem,
    };
  },
  computed: {
    Type() {
      return this.$store.state.type;
    },
    Lang() {
      return this.$store.state.lang;
    },
    Class() {
      return this.$store.state.class;
    },
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
