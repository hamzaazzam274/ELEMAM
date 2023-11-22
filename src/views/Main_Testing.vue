<template>
  <div class="Main_Testing">
    <div class="container">
      <AddTest
        @Close="CloseAndOpenAddTest"
        @GetData="GetData"
        v-if="ShowAddTest"
      />
      <ShowTest @Close="Close" v-if="ShowTest" :TestIndex="this.TestIndex" />
      <nav
        aria-label="breadcrumb"
        class="flex items-center justify-between mb-2.5"
      >
        <nav aria-label="breadcrumb">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem
              ><router-link to="/">{{ Type }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem>
              <router-link to="/">{{ Lang }}</router-link></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem>
              <router-link to="/Main_Class">{{ Class }}</router-link>
            </MDBBreadcrumbItem>
            <MDBBreadcrumbItem active>{{ Sub }}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </nav>
        <span
          class="bg-[#eee] p-2.5 rounded cursor-pointer flex items-center gap-2.5"
          @click="CloseAndOpenAddTest"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>اضف اختبار</span>
        </span>

        <!-- @click="CloseAndOpenAddSub" -->
      </nav>
      <div class="data flex flex-col gap-2.5">
        <img
          src="../assets/animation_lolk2w1w_small.gif"
          alt="animation"
          class="m-auto"
          v-if="ShowLoding"
        />
        <div v-if="ShowMsg" class="text-center">{{ MsgEmpty }}</div>
        <div
          class="box border p-2.5 rounded"
          v-for="(test, index) in AllTest"
          :key="index"
        >
          <div class="number">
            اختبار رقم (<span>{{ index + 1 }}</span
            >)
          </div>
          <h3>{{ test.Type }}</h3>
          <div class="flex gap-2.5 items-center">
            <font-awesome-icon :icon="['fas', 'clock']" />
            <p class="Time">{{ test.Time }}</p>
          </div>
          <div class="flex gap-2.5 items-center">
            <font-awesome-icon :icon="['fas', 'calendar-days']" />
            <p class="Date">{{ test.Date }}</p>
          </div>
          <div class="btn" @click="CheckTimeAndData(index)">أختبر نفسك</div>
        </div>
      </div>
    </div>
  </div>
  <PayTest v-if="PayTest" @ColseAndOpen="ColseAndOpen" />
</template>
<script>
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-vue-ui-kit";
import AddTest from "../components/Add_Test.vue";
import ShowTest from "../components/ShowTest.vue";
import PayTest from "../components/PayTest.vue";

import {
  getDoc,
  getFirestore,
  doc,
  query,
  where,
  collection,
  getDocs,
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
// import moment from "moment";
export default {
  name: "Main_Testing",
  emits: ["GetData"],
  mounted() {
    this.getvalues();
    setTimeout(() => {
      this.GetData();
    }, 1000);
  },
  data() {
    return {
      ShowAddTest: null,
      ShowAddQu: null,
      MsgEmpty: "",
      ShowMsg: null,
      ShowLoding: true,
      ShowPopup: null,
      ShowTest: null,
      AllTest: [],
      AllQu: [],
      TestIndex: "",
      Type: "",
      Lang: "",
      Class: "",
      Sub: "",
      PayState: true,
      PayTest: null,
    };
  },
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddTest,
    ShowTest,

    PayTest,
  },
  methods: {
    ColseAndOpen() {
      this.PayTest = !this.PayTest;
    },
    async CheckTimeAndData(index) {
      if (this.AllTest[index].Type === "مدفوع") {
        console.log("مدفوع");
        const q = query(
          collection(db, "الطلاب"),
          where("userid", "==", localStorage.getItem("userid"))
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const user = doc.data();
          if (user.pay.success) {
            for (let i = 0; i < user.pay.length; i++) {
              if (
                user.pay[i].BillName === "جميع الإختبارات" &&
                user.pay[i].BillClass === this.Class &&
                user.pay[i].BillLang === this.Lang &&
                user.pay[i].success === true
              ) {
                console.log(user.pay[i]);
                this.PayState = true;
              } else {
                console.log("user.pay[i]", false);
                this.PayState = false;
                this.PayTest = true;
              }
            }
          } else {
            this.PayState = false;
            this.PayTest = true;
          }
        });
        setTimeout(() => {
          console.log("PayState", this.PayState);
        }, 1000);
      }
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const formattedDate = currentDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      console.log(formattedDate);

      console.log(formattedTime);
      if (
        this.AllTest[index].Time <= formattedTime &&
        this.AllTest[index].Date <= formattedDate &&
        this.PayState === true
      ) {
        this.Close();
      } else {
        console.log("error");
      }
    },
    getvalues() {
      setTimeout(() => {
        this.Type = localStorage.getItem("updateType");
        this.Lang = localStorage.getItem("updateLang");
        this.Class = localStorage.getItem("updateClass");
        this.Sub = localStorage.getItem("updateSub");
      }, 100);
    },
    exportTestIndex() {
      let btn = document.querySelectorAll(".box .btn");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
          console.log(
            +btn[i].parentElement.children[0].children[0].innerHTML - 1
          );
          this.TestIndex =
            +btn[i].parentElement.children[0].children[0].innerHTML - 1;
        };
      }
      console.log(btn);
    },
    Close() {
      this.ShowTest = !this.ShowTest;
    },
    ToggelPopop() {
      this.ShowPopup = !this.ShowPopup;
    },
    async GetData() {
      console.log("getData");
      let sentence = localStorage.getItem("updateType");
      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;

      const docRef = doc(db, collectionPath, this.Sub);
      const docSnap = await getDoc(docRef);
      this.ShowLoding = false;
      setTimeout(() => {
        this.exportTestIndex();
      }, 10);

      if (docSnap.exists()) {
        let arr = [];
        arr.push(docSnap.data());
        this.AllTest = arr[0].test;
        this.AllQu = arr[0].test;
        this.ShowMsg = false;
      } else {
        this.MsgEmpty = `لا توجد إختبارات متاحة الآن لمادة ${this.Sub}`;
        this.ShowMsg = true;
      }
    },
    CloseAndOpenAddQu() {
      this.ShowAddQu = !this.ShowAddQu;
    },
    CloseAndOpenAddTest() {
      this.ShowAddTest = !this.ShowAddTest;
    },
  },
};
</script>
