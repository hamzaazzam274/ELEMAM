<template>
  <div class="mt-2.5 flex gap-2.5 flex-wrap justify-between">
    <div
      class="box w-32 border p-2.5"
      v-for="(data, index) in AllData"
      :key="data"
    >
      <div class="header">
        <div class="number">{{ index + 1 }}</div>
        <div class="title">{{ data.SubName }}</div>
      </div>
      <div class="body">
        <div>
          <span>الدراسة : </span> <span>{{ data.BillType }}</span>
        </div>
        <div>
          <span>الفرقة : </span> <span>{{ data.BillClass }}</span>
        </div>
        <div><span>الصنف : </span> <span>بنك الأسئلة</span></div>
        <div>
          <span>السعر : </span>
          <span>{{ data.BillPrice / 100 }}</span>
        </div>
        <div>
          <span>كود الإستلام : </span> <span>{{ data.order_id }}</span>
        </div>
        <div>
          <span> تاريخ الدفع : </span>
          <span>
            {{
              new Date(data.Time.toMillis()).toLocaleString(["ar"], {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </span>
        </div>
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
  name: "MyCourse",
  props: ["success"],
  mounted() {
    this.GetData();
  },
  data() {
    return {
      AllData: [],
    };
  },
  methods: {
    async GetData() {
      const q = query(
        collection(db, "الطلاب"),
        where("userid", "==", localStorage.getItem("userid"))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const user = doc.data().pay;
        let AllDataArray = [];
        AllDataArray.push(user);
        this.AllData = AllDataArray[0];
        console.log("AllData", this.AllData.length);
      });
    },
  },
};
</script>
