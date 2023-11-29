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
      <div class="result w-1/2 flex items-center justify-center flex-col">
        <div>{{ TotalResult }}%</div>
        <div>{{ Appreciations }}</div>
        <div>{{ Ranking }}</div>
      </div>
    </div>
    <div class="flex gap-2.5 justify-between">
      <div
        class="All_Result bg-[#eee] w-48 text-center p-2.5 cursor-pointer rounded"
        @click="CloseTogell_2"
      >
        نتائجي
      </div>
      <div
        class="All_Courses bg-[#eee] w-48 text-center p-2.5 cursor-pointer rounded"
        @click="CloseTogell_1"
      >
        كورساتي
        <!-- FawryPay Checkout Button -->
      </div>
    </div>
    <MyCourse v-if="close_1" />
    <MyResults
      v-if="close_2"
      @TotalResultFunction="handleTotalResult"
      @AppreciationsFunction="handleAppreciations"
    />
  </div>
</template>
<script>
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  updateDoc,
  doc,
  getDoc,
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
// import crypto from "crypto-js";
import CryptoJS from "crypto-js";
// الآن يمكنك استخدام 'crypto' في هذا الملف بشكل طبيعي
import MyCourse from "../components/MyCourse.vue";
import MyResults from "../components/MyResults.vue";
export default {
  name: "TheUser",
  components: {
    MyCourse,
    MyResults,
  },
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
      close_1: null,
      close_2: true,
      TotalResult: "",
      Appreciations: "",
      Ranking: "",
      TypeOfClass: "",
    };
  },
  methods: {
    handleAppreciations(Data) {
      this.Appreciations = Data;
    },
    async handleTotalResult(Data) {
      this.TotalResult = Data;
      // ["AllResults"]: this.TotalResult,
      console.log(typeof Data);
      const documentRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      await updateDoc(documentRef, {
        ["AllResults"]: `${Data}`,
      });
      const studentsCollection = collection(db, "الطلاب");
      const querySnapshot = await getDocs(studentsCollection);
      let array = [];

      querySnapshot.forEach((doc) => {
        if (
          doc.data().Class === this.Class &&
          doc.data().Lang === this.Lang &&
          doc.data().TypeOfClass === this.TypeOfClass
        ) {
          console.log(doc.id, " => ", doc.data().AllResults);
          array.push(doc.data().AllResults);
        }
      });

      // const array1 = [13, 233, 43, 434, 45, 65, 74, 48, 39, 210];

      // تصفية القيم الغير معرفة (undefined)
      const filteredArray = array.filter((element) => element !== undefined);

      // فرز المصفوفة بترتيب تنازلي
      const sortedArray = filteredArray.sort((a, b) => b - a);

      // اختيار أول 10 عناصر
      const top10Elements = sortedArray.slice(0, 10);

      console.log(top10Elements);

      querySnapshot.forEach((doc) => {
        if (
          top10Elements.includes(doc.data().AllResults) &&
          doc.data().userid === localStorage.getItem("userid")
        ) {
          console.log(top10Elements.indexOf(doc.data().AllResults) + 1);
          if (top10Elements.indexOf(doc.data().AllResults) + 1 === 1) {
            this.Ranking = "الأول";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 2) {
            this.Ranking = "الثاني";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 3) {
            this.Ranking = "الثالث";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 4) {
            this.Ranking = "الرابع";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 5) {
            this.Ranking = "الخامس";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 6) {
            this.Ranking = "السادس";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 7) {
            this.Ranking = "السابع";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 8) {
            this.Ranking = "الثامن";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 9) {
            this.Ranking = "التاسع";
          } else if (top10Elements.indexOf(doc.data().AllResults) + 1 === 10) {
            this.Ranking = "العاشر";
          }
        }
      });
    },
    CloseTogell_1() {
      this.close_1 = true;
      this.close_2 = false;
    },
    CloseTogell_2() {
      this.close_1 = false;
      this.close_2 = true;
    },
    Hmac() {},
    async State() {
      const urlParams = new URLSearchParams(window.location.search);

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
      ];

      const test = dataKeys.map((key) => urlParams.get(key));

      const secretKey = "DFDAACE2D9EF9DA02CAB73EFA36945DF";
      const hashedData = CryptoJS.HmacSHA512(test, secretKey).toString(
        CryptoJS.enc.Hex
      );

      console.log("Hmac =>", urlParams.get("hmac"));
      console.log("Test =>", test);
      console.log("hashedData =>", hashedData);

      if (urlParams.get("hmac") === hashedData) {
        console.log("ok Hmac");
      } else {
        console.log("Error Hmac");
      }

      if (urlParams.get("success") === "true") {
        console.log("Payment successful!");
      } else {
        console.log("Payment failed!");
      }
      console.log(urlParams.get("success"));
      const washingtonRef = doc(db, "الطلاب", localStorage.getItem("userid"));

      const washingtonSnap = await getDoc(washingtonRef);

      const payArray = washingtonSnap.data().pay;

      for (let i = 0; i < payArray.length; i++) {
        if (+urlParams.get("order") === payArray[i].order_id) {
          console.log("order_id => ", urlParams.get("order"));

          const updatedPayArray = [...payArray];

          updatedPayArray[i] = {
            ...updatedPayArray[i],
            success: urlParams.get("success"),
          };

          await updateDoc(washingtonRef, { pay: updatedPayArray });

          break;
        }
      }
      console.log(+urlParams.get("order"));
      console.log(payArray.length);
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
        this.TypeOfClass = user.TypeOfClass;
        console.log(this.AllName);
        console.log(user);
      });
      // setTimeout(() => {
      this.handleTotalResult();
      // }, 1000);
    },
  },
};
</script>
