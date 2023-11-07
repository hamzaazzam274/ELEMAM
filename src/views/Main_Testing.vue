<template>
  <div class="Main_Testing">
    <div class="container">
      <AddTest
        @Close="CloseAndOpenAddTest"
        @GetData="GetData"
        v-if="ShowAddTest"
      />
      <AddQu @Close="CloseAndOpenAddQu" @GetData="GetData" v-if="ShowAddQu" />
      <nav
        aria-label="breadcrumb"
        class="flex items-center justify-between mb-2.5"
      >
        <nav aria-label="breadcrumb">
          <MDBBreadcrumb>
            <MDBBreadcrumbItem
              ><a href="#"> {{ Type }}</a></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem
              ><a href="#">{{ Lang }}</a></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem
              ><a href="#">{{ Class }}</a></MDBBreadcrumbItem
            >
            <MDBBreadcrumbItem active>{{ Sub }}</MDBBreadcrumbItem>
          </MDBBreadcrumb>
        </nav>
        <span class="bg-[#eee] p-2.5 rounded cursor-pointer">
          <font-awesome-icon
            :icon="['fas', 'plus']"
            @click="CloseAndOpenAddTest"
          />
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
          <div class="number">اختبار رقم ({{ index + 1 }})</div>
          <h3>{{ test.Type }}</h3>
          <p>{{ test.Time }}</p>
          <div class="btn">أختبر نفسك</div>
          <div class="popup">
            <div class="header">
              <font-awesome-icon :icon="['fas', 'xmark']" />
              <span>اختبار رقم ({{ index + 1 }})</span>
            </div>
            <font-awesome-icon
              :icon="['fas', 'plus']"
              @click="CloseAndOpenAddQu"
            />

            <div class="body bg-[#eee] p=2.5">
              <div class="box" v-for="Qu in AllQu[index].AllQu" :key="Qu">
                <div class="qu">
                  {{ Qu.qu1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-vue-ui-kit";
import AddTest from "../components/Add_Test.vue";
import AddQu from "../components/Add_Qu.vue";

import { getDoc, getFirestore, doc } from "firebase/firestore";
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
  name: "Main_Testing",
  emits: ["GetData"],
  mounted() {
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
      AllTest: [],
      AllQu: [],
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
    Sub() {
      return this.$store.state.Sub;
    },
  },
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddTest,
    AddQu,
  },
  methods: {
    async GetData() {
      console.log("getData");
      let sentence = this.Type;
      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${this.Lang} - ${this.Class}`;

      const docRef = doc(db, collectionPath, this.Sub);
      const docSnap = await getDoc(docRef);
      this.ShowLoding = false;
      if (docSnap.exists()) {
        let arr = [];
        arr.push(docSnap.data());
        this.AllTest = arr[0].test;
        this.AllQu = arr[0].test;
        console.log(this.arr);
        console.log(this.AllQu[0].AllQu);
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
