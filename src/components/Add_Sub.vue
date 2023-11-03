<template>
  <div class="Add_Sub">
    <div class="main_popup" @click="Close"></div>
    <div
      class="container bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
    >
      <div class="header text-left p-2.5 text-lg">
        <font-awesome-icon :icon="['fas', 'xmark']" @click="Close" />
      </div>
      <div class="body flex flex-wrap justify-between gap-3">
        <div class="form-floating text-end long">
          <input type="text" class="form-control" id="Sub" />
          <label for="Sub">المادة</label>
        </div>
        <div class="form-floating text-end w-48">
          <select @change="SelectFunction">
            <option></option>
            <option value="ترم أول">ترم أول</option>
            <option value="ترم ثاني">ترم ثاني</option>
          </select>
        </div>
        <div class="form-floating text-end w-48">
          <input type="number" class="form-control" id="Num_video" />
          <label for="Num_video">عدد الفيديوهات</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Price_Of_vedio"
            @change="Calc"
            v-model="Price_Of_vedio"
          />
          <!-- value="0" -->
          <label for="Price_Of_vedio">سعر الفيديوهات</label>
        </div>
        <div class="form-floating text-end w-48">
          <input type="number" class="form-control" id="Num_Of_Books" />
          <label for="Num_Of_Books">عدد الملازم</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Price_Of_Books"
            @change="Calc"
            v-model="Price_Of_Books"
          />
          <label for="Price_Of_Books">سعر الملازم</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Question_bank_price"
            @change="Calc"
            v-model="Question_bank_price"
          />
          <label for="Question_bank_price">سعر بنك الأسئلة</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Price_of_online_tests"
            @change="Calc"
            v-model="Price_of_online_tests"
          />
          <label for="Price_of_online_tests">سعر اختبارات الأونلاين</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control pointer-events-none"
            id="total"
            v-model="Total"
          />
          <label for="total">إجمالي سعر الكورس</label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Discount"
            v-model="Discount"
            @change="DiscountFunction"
            minlength="9"
          />
          <label for="Discount"> الخصم من 10% </label>
        </div>
        <div class="form-floating text-end w-48">
          <input
            type="number"
            class="form-control"
            id="Discount_Total"
            v-model="Discount_Total"
          />
          <label for="Discount_Total"> السعر بعد الخصم </label>
        </div>
      </div>
      <div class="footer text-left mt-5">
        <div
          class="button bg-[--main-color] p-2.5 cursor-pointer text-white text-center"
          @click="Add_Data"
        >
          تم
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { collection, addDoc, getFirestore } from "firebase/firestore";
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
export default {
  name: "Add_Sub",
  data() {
    return {
      name: "",
      Total: "",
      Discount_Total: "",
      Discount: "",
      Price_Of_vedio: "",
      Price_Of_Books: "",
      Question_bank_price: "",
      Price_of_online_tests: "",
      Season: "",
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
  methods: {
    SelectFunction(event) {
      console.log(event.target.value);
      this.Season = event.target.value;
    },
    async Add_Data() {
      const docRef = await addDoc(
        collection(db, `${this.Type} - ${this.Lang} - ${this.Class}`),
        {
          sub_name: document.getElementById("Sub").value,
          Season: this.Season,
          Number_of_videos: document.getElementById("Num_video").value,
          Video_price: document.getElementById("Price_Of_vedio").value,
          Number_of_books: document.getElementById("Num_Of_Books").value,
          Book_price: document.getElementById("Price_Of_Books").value,
          Question_bank_price: document.getElementById("Question_bank_price")
            .value,
          Price_of_online_tests: document.getElementById(
            "Price_of_online_tests"
          ).value,
          Discount_Total: this.Discount_Total,
        }
      );
      console.log("Document written with ID: ", docRef.id);
      this.Close();
      this.GetData();
    },
    GetData() {
      this.$emit("GetData");
    },
    Close() {
      this.$emit("close");
    },
    DiscountFunction() {
      if (this.Discount >= 10) {
        let value = this.Total * 100;
        this.Discount_Total = value - value * `0.${this.Discount}`;
        this.Discount_Total = this.Discount_Total / 100;
      }
    },
    Calc() {
      this.Total =
        +this.Price_Of_vedio +
        +this.Price_Of_Books +
        +this.Question_bank_price +
        this.Price_of_online_tests;
    },
    movePlaceholder(event) {
      const label = event.target.parentNode.querySelector("label");
      label.classList.add("active");
    },
    resetPlaceholder(event) {
      const label = event.target.parentNode.querySelector("label");
      label.classList.remove("active");
    },
  },
};
</script>
