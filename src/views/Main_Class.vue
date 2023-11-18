<template>
  <div class="Main_Class">
    <div class="container">
      <AddSub
        v-if="showAddSub"
        @Close="CloseAndOpenAddSub"
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
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>أضف مادة</span>
        </div>
      </nav>
      <div style="min-height: 58vh" class="mt-2.5">
        <span>({{ AllData.length }}) مادة </span>
        <div
          class="body flex gap-2.5 items-center flex-wrap justify-between mt-2.5"
        >
          <img
            src="../assets/animation_loia37xm_small.gif"
            alt=""
            v-if="showDownloadIcon"
            class="m-auto"
          />
          <div
            class="box w-48 border-1 p-2.5 rounded relative"
            v-for="(Data, index) in AllData"
            :key="Data"
          >
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="absolute left-[7px] top-[7px] bg-[var(--main-color)] text-white text-xs p-1 rounded-full"
            />
            <span
              class="absolute left-[35px] top-[7px] bg-[var(--main-color)] text-white text-xs p-1 rounded-full cursor-pointer hidden"
              @click="Updata"
              >حفظ التغييرات</span
            >
            <div class="header flex justify-between p-2.5 items-center mt-2.5">
              <div class="flex gap-2.5 items-center">
                <div
                  class="num bg-[--main-color] text-white w-6 h-6 flex items-center justify-center rounded"
                >
                  {{ index + 1 }}
                </div>
                <div class="title font-bold text-[#7e7e7e]">
                  {{ Data.sub_name }}
                </div>
              </div>
              <div class="text-[#6e6e6e] text-xs font-bold">
                {{ Data.Season }}
              </div>
            </div>
            <div class="book flex flex-col gap-2.5">
              <a
                :href="Data.BookLink"
                class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded"
              >
                <font-awesome-icon
                  :icon="['fas', 'book']"
                  class="text-[--main-color]"
                />
                <span class="text-[--main-color]">كتاب المادة</span>
              </a>
              <input
                type="text"
                placeholder="لينك كتاب المادة"
                class="border p-1 input1 pointer-events-none"
                :value="Data.BookLink"
              />
            </div>
            <div
              class="free_course flex flex-col gap-2.5 border-1 border-[--main-color] p-2.5 my-2.5 rounded"
            >
              <div class="title flex gap-1 items-center">
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  class="text-[--main-color]"
                />

                <div class="text-lg">الكورس المجاني</div>
              </div>
              <div class="video flex flex-col gap-2.5">
                <a
                  :href="Data.FreeCourse_Video"
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded"
                >
                  <font-awesome-icon
                    :icon="['fab', 'youtube']"
                    class="text-[--main-color]"
                  />
                  <span class="text-[--main-color]">الفيديوهات</span>
                </a>
                <input
                  type="text"
                  placeholder="لينك كتاب المادة"
                  class="border p-1 input2 pointer-events-none"
                  :value="Data.FreeCourse_Video"
                />
              </div>
              <div class="pdf1 flex flex-col gap-2.5">
                <a
                  :href="Data.FreeCourse_Pdf_1"
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded"
                >
                  <font-awesome-icon
                    :icon="['fas', 'book-open-reader']"
                    class="text-[--main-color]"
                  />
                  <span class="text-[--main-color]">المذكرات</span>
                </a>
                <input
                  type="text"
                  placeholder="لينك كتاب المادة"
                  class="border p-1 input3 pointer-events-none"
                  :value="Data.FreeCourse_Pdf_1"
                />
              </div>
              <div class="pdf2 flex flex-col gap-2.5">
                <a
                  :href="Data.FreeCourse_Pdf_2"
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded"
                >
                  <font-awesome-icon
                    :icon="['fas', 'clipboard-question']"
                    class="text-[--main-color]"
                  />
                  <span class="text-[--main-color]">بنك الأسئلة</span>
                </a>
                <input
                  type="text"
                  placeholder="لينك كتاب المادة"
                  class="border p-1 input4 pointer-events-none"
                  :value="Data.FreeCourse_Pdf_2"
                />
              </div>
              <div
                class="pay cursor-pointer w-100 border text-center p-2.5"
                @click="pay1"
              >
                شراء
              </div>
            </div>
            <!-- <div class="test shadow p-2.5">
            <router-link
              to="/Main_Testing"
              class="button bg-[--main-color] text-white p-2.5 rounded cursor-pointer text-center w-100"
            >
              الإختبارات
            </router-link>
          </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-vue-ui-kit";
import { ref } from "vue";

import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";

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
export default {
  name: "Main_Class",
  emits: ["getData"],
  data() {
    return {
      AllData: [],
      showAddSub: null,
      Ids: [],
      MainId: "",
      showDownloadIcon: null,
      Type: "",
      Lang: "",
      Class: "",
      Edit1: "",
      Admin: true,
      num: "",
    };
  },
  props: ["Main_Id"],
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddSub,
  },
  mounted() {
    setTimeout(() => {
      this.getvalues();
    }, 10);
    setTimeout(() => {
      this.getdata();
    }, 100);
  },
  methods: {
    async pay1() {
      const API =
        "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RRd056UXdMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkucmtzSHVZcWN0MHZUMDJjOUdlY3JNZ0JlT196UjRiMkEyWVN2S2I3ZWhXcC1sN0k5MTR4S1B3bjhFV2VUWTd5SGJSOTV5MGxMdFNhbW91cl9IWmJqQlE=";
      let Data = {
        api_key: API,
      };
      let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });
      let response = await request.json();
      let token = response.token;
      this.pay2(token);
    },
    async pay2(token) {
      let Data = {
        auth_token: token,
        delivery_needed: "false",
        amount_cents: "100",
        currency: "EGP",
        merchant_order_id: 5,
        items: [],
      };
      let request = await fetch(
        "https://accept.paymob.com/api/ecommerce/orders",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        }
      );
      let response = await request.json();
      let id = response.id;
      console.log(response);
      console.log(token);
      this.pay3(token, id);
    },
    async pay3(token, id) {
      let Data = {
        auth_token: token,
        amount_cents: "100",
        expiration: 3600,
        order_id: id,
        billing_data: {
          apartment: "803",
          email: "claudette09@exa.com",
          floor: "42",
          first_name: "Clifford",
          street: "Ethan Land",
          building: "8028",
          phone_number: "+86(8)9135210487",
          shipping_method: "PKG",
          postal_code: "01898",
          city: "Jaskolskiburgh",
          country: "CR",
          last_name: "Nicolas",
          state: "Utah",
        },
        currency: "EGP",
        integration_id: 4352564,
        lock_order_when_paid: "false",
      };
      let request = await fetch(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        }
      );
      let response = await request.json();
      let TheToken = response.token;
      console.log(response.token);
      this.CardPayment(TheToken);
    },
    CardPayment(token) {
      let iframURL = `https://accept.paymob.com/api/acceptance/iframes/802769?payment_token=${token}`;
      location.href = iframURL;
    },

    async Updata() {
      let input1 = document.querySelectorAll(".box  input.input1");
      let input2 = document.querySelectorAll(".box  input.input2");
      let input3 = document.querySelectorAll(".box  input.input3");
      let input4 = document.querySelectorAll(".box  input.input4");
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const washingtonRef = doc(
        db,
        `كورسات - ${firstWord} - ${localStorage.getItem(
          "updateLang"
        )} - ${localStorage.getItem("updateClass")}`,
        this.Ids[this.num]
      );
      await updateDoc(washingtonRef, {
        BookLink: input1[this.num].value,
        FreeCourse_Video: input2[this.num].value,
        FreeCourse_Pdf_1: input3[this.num].value,
        FreeCourse_Pdf_2: input4[this.num].value,
      });
      this.getdata();
    },
    EditFunction() {
      let box = document.querySelectorAll(".box");
      let svg = document.querySelectorAll(".box > svg");
      let span = document.querySelectorAll(".box > span");
      let inputs = document.querySelectorAll(".box  input");
      for (let i = 0; i < svg.length; i++) {
        svg[i].onclick = async () => {
          this.num = i;
          box.forEach((e) => {
            e.classList.remove("border-[--main-color]");
          });
          span.forEach((e) => {
            e.classList.add("hidden");
          });
          span[i].classList.remove("hidden");
          inputs.forEach((e) => {
            e.classList.add("pointer-events-none");
          });
          box[i].classList.add("border-[--main-color]");
          box[i].querySelectorAll("input").forEach((e) => {
            e.classList.remove("pointer-events-none");
          });
          console.log(this.Ids[i]);
        };
      }
      console.log("EditFunction");
    },
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
      setTimeout(() => {
        this.EditFunction();
        this.AddSubToStore();
      }, 100);
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
.box > svg {
}
.border-[--main-color] {
  border: 1px solid var(--main-color) !important;
}
.book a {
  transition: 0.3s;
}
.book a:hover {
  background: var(--main-color);
}
.book a:hover svg,
.book a:hover span {
  color: #fff;
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
  .body .box {
    width: 100% !important;
  }
}

@media (max-width: 767px) {
  .body .box {
    width: 100% !important;
  }
}
</style>
