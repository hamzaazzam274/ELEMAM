<template>
  <div class="container">
    <div class="User_file flex items-center">
      <div class="data w-1/2 flex flex-col gap-2.5">
        <div class="name">
          <font-awesome-icon :icon="['fas', 'user-graduate']" />
          <span>
            {{ AllName }}
          </span>
        </div>
        <div class="phone flex items-center gap-2.5">
          <font-awesome-icon icon="fa-solid fa-phone" />
          <span>0{{ phone }}</span>
        </div>
        <div class="phone flex items-center gap-2.5">
          <font-awesome-icon :icon="['fas', 'at']" />
          <span>{{ email }}</span>
        </div>
        <div class="location flex items-center gap-2.5">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          <span>{{ college_place }}</span>
        </div>
        <div class="class flex items-center gap-2.5">
          <font-awesome-icon :icon="['fas', 'chalkboard-user']" />
          <span>{{ Class }} - {{ Lang }}</span>
        </div>
      </div>
      <div class="result w-1/2 flex items-center justify-center">
        <span>متوسط النتائج</span>
      </div>
    </div>
    <div class="flex gap-2.5">
      <div
        class="All_Result bg-[#eee] w-48 text-center p-2.5 cursor-pointer rounded"
      >
        نتائج الإختبارات
      </div>
      <div
        class="All_Courses bg-[#eee] w-48 text-center p-2.5 cursor-pointer rounded"
      >
        كورساتي
<<<<<<< HEAD
=======
        <!-- FawryPay Checkout Button -->
>>>>>>> 9220627ec37910fb23593e9983d128d63f473271
      </div>
    </div>
  </div>
</template>
<script>
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
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
<<<<<<< HEAD
=======
// import crypto from "crypto-js";
import CryptoJS from "crypto-js";
// الآن يمكنك استخدام 'crypto' في هذا الملف بشكل طبيعي

>>>>>>> 9220627ec37910fb23593e9983d128d63f473271
export default {
  name: "TheUser",
  mounted() {
    this.GetData();
<<<<<<< HEAD
=======
    this.State();
>>>>>>> 9220627ec37910fb23593e9983d128d63f473271
  },
  data() {
    return {
      AllName: "",
      name1: "",
      name2: "",
      name3: "",
      phone: "",
      email: "",
      college_place: "",
      Class: "",
      Lang: "",
    };
  },
  methods: {
<<<<<<< HEAD
=======
    Hmac() {},
    State() {
      const urlParams = new URLSearchParams(window.location.search);

      // جمع البيانات المطلوبة لحساب الهاش
      const dataKeys = [
        "amount_cents",
        "created_at",
        "currency",
        "error_occured",
        "has_parent_transaction",
        "obj.id",
        "integration_id",
        "is_3d_secure",
        "is_auth",
        "is_capture",
        "is_refunded",
        "is_standalone_payment",
        "is_voided",
        "order.id",
        "owner",
        "pending",
        "source_data.pan",
        "source_data.sub_type",
        "source_data.type",
        "success",
        "billing_data",
      ];

      const test = dataKeys.map((key) => urlParams.get(key));

      // حساب الهاش باستخدام crypto-js
      const secretKey = "DFDAACE2D9EF9DA02CAB73EFA36945DF";
      const hashedData = CryptoJS.HmacSHA512(test, secretKey).toString(
        CryptoJS.enc.Hex
      );

      console.log("Hmac =>", urlParams.get("hmac"));
      console.log("Test =>", test);
      console.log("hashedData =>", hashedData);

      // قارن بين الهاش المتوقع والهاش الفعلي
      if (urlParams.get("hmac") === hashedData) {
        console.log("ok Hmac");
      } else {
        console.log("Error Hmac");
      }

      // استخدام هذه المعلومات كما تحتاج
      if (urlParams.get("success") === "true") {
        console.log("Payment successful!");
      } else {
        console.log("Payment failed!");
      }

      // إضافة المزيد من الاستجابات حسب الحاجة
    },
>>>>>>> 9220627ec37910fb23593e9983d128d63f473271
    async GetData() {
      console.log(typeof localStorage.getItem("userphone"));
      const q = query(
        collection(db, "الطلاب"),
        where("userid", "==", localStorage.getItem("userid"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        this.name1 = user.name_1;
        this.name2 = user.name_2;
        this.name3 = user.name_3;

        this.AllName = `
        ${this.name1} ${this.name2} ${this.name3}
        `;
        this.phone = user.phone;
        this.email = user.email;
        this.college_place = user.college_place;
        this.Class = user.Class;
        this.Lang = user.Lang;
        console.log(this.AllName);
        console.log(user);
      });
    },
  },
};
</script>
