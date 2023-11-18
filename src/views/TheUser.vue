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
        <!-- FawryPay Checkout Button -->
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
export default {
  name: "TheUser",
  mounted() {
    this.GetData();
    this.State();
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
    Hmac() {},
    State() {
      const urlParams = new URLSearchParams(window.location.search);

      const orderId = urlParams.get("order");
      const successStatus = urlParams.get("success");
      const amountCents = urlParams.get("amount_cents");
      const hmac = urlParams.get("hmac");
      const id = urlParams.get("id");

      const amount_cents = urlParams.get("amount_cents");
      const created_at = urlParams.get("created_at");
      const currency = urlParams.get("currency");
      const error_occured = urlParams.get("error_occured");
      const has_parent_transaction = urlParams.get("has_parent_transaction");
      const obj_id = urlParams.get("obj.id");
      const integration_id = urlParams.get("integration_id");
      const is_3d_secure = urlParams.get("is_3d_secure");
      const is_auth = urlParams.get("is_auth");
      const is_capture = urlParams.get("is_capture");
      const is_refunded = urlParams.get("is_refunded");
      const is_standalone_payment = urlParams.get("is_standalone_payment");
      const is_voided = urlParams.get("is_voided");
      const order_id = urlParams.get("order.id");
      const owner = urlParams.get("owner");
      const pending = urlParams.get("pending");
      const source_data_pan = urlParams.get("source_data.pan");
      const source_data_sub_type = urlParams.get("source_data.sub_type");
      const source_data_type = urlParams.get("source_data.type");
      const success = urlParams.get("success");
      let test = `
${amount_cents}
${created_at}
${currency}
${error_occured}
${has_parent_transaction}
${obj_id}
${integration_id}
${is_3d_secure}
${is_auth}
${is_capture}
${is_refunded}
${is_standalone_payment}
${is_voided}
${order_id}
${owner}
${pending}
${source_data_pan}
${source_data_sub_type}
${source_data_type}
${success}
      `;
      if (hmac === test) {
        console.log("ok Hmac");
      } else {
        console.log("Error Hmac");
      }
      // استخدام هذه المعلومات كما تحتاج
      console.log("Order ID:", orderId);
      console.log("Success Status:", successStatus);
      console.log("Amount (cents):", amountCents);
      console.log("HMAC:", hmac);
      console.log("id:", id);
      if (successStatus === "true") {
        // الدفع ناجح
        console.log("Payment successful!");
      } else {
        // الدفع فاشل
        console.log("Payment failed!");
      }
    },
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
