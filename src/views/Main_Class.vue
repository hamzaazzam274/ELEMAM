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
            class="main_box w-48 border-1 p-2.5 rounded relative"
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
                class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
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
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
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
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
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
                  class="border-1 border-[--main-color] flex items-center justify-center gap-2.5 p-2.5 rounded hover-0"
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
                class="pay cursor-pointer w-100 border text-center p-2.5 hover-0"
              >
                شراء
              </div>
            </div>
            <div
              class="Cash_course flex flex-col gap-2.5 border-1 border-[--main-color] p-2.5 my-2.5 rounded"
            >
              <div class="title flex gap-1 items-center">
                <font-awesome-icon
                  :icon="['fas', 'coins']"
                  class="text-[--main-color]"
                />

                <div class="text-lg">الكورس المدفوع</div>
              </div>
              <div class="video bg-[#fafafa] p-2.5 rounded box">
                <div class="flex justify-between">
                  <div class="title text-xl BillName">الفيديوهات</div>
                  <div class="price text-sm">
                    <input
                      type="number"
                      class="w-10 p-1 rounded input5 pointer-events-none text-center ml-1"
                      v-if="Admin"
                      :value="Data.CachCourse_Video"
                    />
                    <span v-else>{{ Data.CachCourse_Video }}</span>
                    <span>جنية مصري</span>
                  </div>
                </div>
                <div class="w-100 text-left mt-2">
                  <span
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay"
                    >شراء</span
                  >
                </div>
              </div>
              <div class="pdf1 bg-[#fafafa] p-2.5 rounded box">
                <div class="flex justify-between">
                  <div class="title text-xl BillName">المذكرات</div>
                  <div class="price text-sm">
                    <input
                      type="number"
                      class="w-10 p-1 rounded input6 pointer-events-none text-center ml-1"
                      v-if="Admin"
                      :value="Data.CachCourse_PdfPrice_1"
                    />
                    <span v-else>{{ Data.CachCourse_PdfPrice_1 }}</span>
                    <span>جنية مصري</span>
                  </div>
                </div>
                <div class="w-100 text-left mt-2">
                  <span
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay"
                    >شراء</span
                  >
                </div>
              </div>
              <div class="pdf2 bg-[#fafafa] p-2.5 rounded box">
                <div class="flex justify-between">
                  <div class="title text-xl BillName">بنك الأسئلة</div>
                  <div class="price text-sm">
                    <input
                      type="number"
                      class="w-10 p-1 rounded input7 pointer-events-none text-center ml-1"
                      v-if="Admin"
                      :value="Data.CachCourse_PdfPrice_2"
                    />
                    <span v-else>{{ Data.CachCourse_PdfPrice_2 }}</span>
                    <span>جنية مصري</span>
                  </div>
                </div>
                <div class="w-100 text-left mt-2">
                  <span
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay"
                    >شراء</span
                  >
                </div>
              </div>
              <div class="AllCourse bg-[#fafafa] p-2.5 rounded box">
                <div class="flex justify-between">
                  <div class="title text-xl BillName">الكورس كامل</div>
                  <div class="line-through">
                    <span class="ml-1">{{
                      +Data.CachCourse_Video +
                      +Data.CachCourse_PdfPrice_1 +
                      +Data.CachCourse_PdfPrice_2
                    }}</span>
                    <span>جنية مصري</span>
                  </div>
                </div>
                <div class="price text-sm text-left">
                  <input
                    type="number"
                    class="w-10 p-1 rounded input8 pointer-events-none text-center ml-1"
                    v-if="Admin"
                    :value="Data.AllCourse"
                  />
                  <span v-else>{{ Data.AllCourse }}</span>
                  <span>جنية مصري</span>
                </div>
                <div class="w-100 flex justify-between items-center mt-2">
                  <span>
                    خصم :
                    <span> 10 % </span>
                  </span>
                  <span
                    class="px-2.5 py-1 border-1 border-[--main-color] cursor-pointer rounded hover-0 pay"
                    >شراء</span
                  >
                </div>
              </div>
              <div class="test shadow p-2.5">
                <router-link
                  to="/Main_Testing"
                  class="button bg-[--main-color] text-white p-2.5 rounded cursor-pointer text-center w-100"
                >
                  الإختبارات
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main_Overlay" v-if="Close"></div>
      <div
        class="popup rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto h-1/2 z-20 w-1/2"
        v-if="Close"
      >
        <div class="header flex justify-between items-center">
          <span>فاتورة</span>
          <font-awesome-icon :icon="['fas', 'xmark']" @click="Close = false" />
        </div>
        <div class="body">
          <div class="flex items-center gap-2.5">
            <div class="w-24 text-center">الدراسة</div>
            <span>:</span>
            <strong>{{ BillType }}</strong>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="w-24 text-center">القسم</div>
            <span>:</span>
            <strong>{{ BillLang }}</strong>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="w-24 text-center">الفرقة</div>
            <span>:</span>
            <strong>{{ BillClass }}</strong>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="w-24 text-center">الصنف</div>
            <span>:</span>
            <strong>{{ BillName }}</strong>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="w-24 text-center">السعر</div>
            <span>:</span>
            <strong>{{ BillPrice }} <span>جنية مصري</span></strong>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="w-24 text-center">المادة</div>
            <span>:</span>
            <strong>{{ SubName }}</strong>
          </div>
        </div>
        <div
          class="pay bg-[--main-color] p-2.5 cursor-pointer text-white text-center mt-2.5"
          @click="pay1"
        >
          أدفع
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
  getDoc,
  serverTimestamp,
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
      CachCourse_Video: 0,
      CachCourse_PdfPrice_1: 0,
      CachCourse_PdfPrice_2: 0,
      AllCourse: "",
      Close: null,
      BillVedio: "",
      BillName: "",
      BillPrice: "",
      BillType: "",
      BillClass: "",
      BillLang: "",
      SubName: "",
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
    CloseFunction() {
      setTimeout(() => {
        let boxes = document.querySelectorAll(".main_box .Cash_course");
        let title = document.querySelectorAll(".main_box > .header .title ");

        for (let i = 0; i < boxes.length; i++) {
          boxes[i].querySelectorAll(".main_box .pay")[0].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].CachCourse_Video;
            this.BillName = "الفيديوهات";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
          boxes[i].querySelectorAll(".main_box .pay")[1].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].CachCourse_PdfPrice_1;
            this.BillName = "المذكرات";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
          boxes[i].querySelectorAll(".main_box .pay")[2].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].CachCourse_PdfPrice_2;
            this.BillName = "بنك الأسئلة";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
          boxes[i].querySelectorAll(".main_box .pay")[3].onclick = () => {
            this.SubName = title[i].innerHTML;
            this.BillPrice = this.AllData[i].AllCourse;
            this.BillName = "الكورس كامل";
            this.BillType = localStorage.getItem("updateType");
            this.BillLang = localStorage.getItem("updateLang");
            this.BillClass = localStorage.getItem("updateClass");
            this.Close = true;
          };
        }
      }, 1000);
    },

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
        amount_cents: `${this.BillPrice}00`,
        currency: "EGP",
        merchant_order_id: Date.now(),
        integration_id: 4352564,
        lock_order_when_paid: "false",
        order_description: "Product description goes here", // وصف المنتج - قم بتحديثه
        order_items: [
          {
            name: this.BillName, // اسم المنتج - قم بتحديثه
            BillType: this.BillType,
            BillLang: this.BillLang,
            BillClass: this.BillClass,
          },
        ],
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
      console.log("Data =>", Data.billing_data);
      console.log("response", response);
      console.log(token);
      this.pay3(token, id);
    },
    async pay3(token, id) {
      let Data = {
        auth_token: token,
        amount_cents: `${this.BillPrice}00`,
        expiration: 3600,
        order_id: id,
        billing_data: {
          apartment: "803",
          first_name: localStorage.getItem("username_1"),
          middle_name: localStorage.getItem("username_2"), // الاسم الثلاثي - قم بتحديثه
          last_name: localStorage.getItem("username_3"),
          email: localStorage.getItem("useremail"), // البريد الإلكتروني - قم بتحديثه
          phone_number: localStorage.getItem("userphone"),
          floor: "42",
          street: "Ethan Land",
          building: "8028",
          shipping_method: "PKG",
          postal_code: "01898",
          city: "Jaskolskiburgh",
          country: "CR",
          state: "Utah",
        },
        currency: "EGP",
        integration_id: 4352564,
        lock_order_when_paid: "false",
        order_description: "Product description goes here", // وصف المنتج - قم بتحديثه
        order_items: [
          {
            name: this.BillName, // اسم المنتج - قم بتحديثه
            BillType: this.BillType,
            BillLang: this.BillLang,
            BillClass: this.BillClass,
            success: false,
          },
        ],
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
      console.log("Data:", Data);
      console.log("Full Response:", response);
      let userid = localStorage.getItem("userid");
      console.log(userid);
      // تحديث الحقل باستخدام `updateDoc`
      const documentRef = doc(db, "الطلاب", userid);
      // احصل على المستند الحالي
      const documentSnapshot = await getDoc(documentRef);
      const fieldName = "pay";
      const currentFieldValue = documentSnapshot.data()[fieldName];
      setTimeout(() => {
        console.log(documentSnapshot.data());
      }, 1000);

      // قم بإعداد الكائن الجديد
      console.log(serverTimestamp());
      let newObject = {
        name: this.BillName,
        BillType: this.BillType,
        BillLang: this.BillLang,
        BillClass: this.BillClass,
        BillPrice: `${this.BillPrice}00`,
        SubName: this.SubName,
        data: new Date(),
      };
      // إضافة الكائن الجديد إلى القيمة الحالية للحقل
      currentFieldValue.push(newObject);

      // تحديث المستند بالقيمة الجديدة
      await updateDoc(documentRef, {
        [fieldName]: currentFieldValue,
      });
      setTimeout(() => {
        let TheToken = response.token;
        this.CardPayment(TheToken);
      }, 1000);
    },
    CardPayment(token) {
      let iframURL = `https://accept.paymob.com/api/acceptance/iframes/802769?payment_token=${token}`;
      location.href = iframURL;
    },

    async Updata() {
      let input1 = document.querySelectorAll(".main_box  input.input1");
      let input2 = document.querySelectorAll(".main_box  input.input2");
      let input3 = document.querySelectorAll(".main_box  input.input3");
      let input4 = document.querySelectorAll(".main_box  input.input4");
      let input5 = document.querySelectorAll(".main_box  input.input5");
      let input6 = document.querySelectorAll(".main_box  input.input6");
      let input7 = document.querySelectorAll(".main_box  input.input7");
      let input8 = document.querySelectorAll(".main_box  input.input8");
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
        CachCourse_Video: input5[this.num].value,
        CachCourse_PdfPrice_1: input6[this.num].value,
        CachCourse_PdfPrice_2: input7[this.num].value,
        AllCourse: input8[this.num].value,
      });
      this.getdata();
    },
    EditFunction() {
      let box = document.querySelectorAll(".main_box");
      let svg = document.querySelectorAll(".main_box > svg");
      let span = document.querySelectorAll(".main_box > span");
      let inputs = document.querySelectorAll(".main_box  input");
      for (let i = 0; i < svg.length; i++) {
        svg[i].onclick = async () => {
          console.log(svg[i]);
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
          console.log(box[i]);
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
        this.CloseFunction();
      }, 1000);
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

.hover-0 {
  transition: 0.3s;
}
.hover-0:hover {
  background: var(--main-color);
  color: #fff;
}
.hover-0:hover svg,
.hover-0:hover span {
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
