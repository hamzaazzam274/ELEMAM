<template>
  <div class="Main_Testing">
    <div class="container">
      <AddTest
        @Close="CloseAndOpenAddTest"
        @GetData="GetData"
        v-if="ShowAddTest"
      />
      <AddQu @Close="CloseAndOpenAddQu" @GetData="GetData" v-if="ShowAddQu" />
      <ShowTest @Close="Close" v-if="ShowTest" :TestIndex="this.TestIndex" />
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
        <div
          class="bg-[#eee] p-2.5 rounded cursor-pointer flex items-center gap-2.5"
          @click="CloseAndOpenAddTest"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>اضف اختبار</span>
        </div>
        <!-- @click="CloseAndOpenAddSub" -->
      </nav>
      <div>({{ AllTest.length }}) اختبار</div>
      <div class="data flex flex-col gap-2.5" style="min-height: 56.7vh">
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
          <p>{{ test.Time }}</p>
          <div class="btn" @click="Close">أختبر نفسك</div>
          <div
            class="popup bg-[#eee] rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto h-4/5 z-10 w-100 h-100"
            v-if="ShowPopup"
          >
            <div class="header flex justify-between">
              <span
                >اختبار رقم (<span>{{ index + 1 }}</span
                >)</span
              >
              <font-awesome-icon
                :icon="['fas', 'xmark']"
                @click="ToggelPopop"
              />
            </div>
            <div
              @click="CloseAndOpenAddQu"
              class="bg-white p-2.5 mr-auto ml-2.5 w-fit"
            >
              <font-awesome-icon :icon="['fas', 'plus']" />
              <span>أضف سؤال</span>
            </div>

            <div class="body">
              <div
                class="box border p-2.5 my-2.5 w-100"
                v-for="Qu in AllQu[index].AllQu"
                :key="Qu"
              >
                <div class="my-2.5">
                  <span class="qu text-lg">
                    {{ Qu.qu1 }}
                  </span>
                  ....
                  <span class="qu text-lg"> {{ Qu.qu2 }} ؟ </span>
                </div>
                <div class="answer flex justify-between">
                  <div
                    class="bg-[#eee] p-2.5 cursor-pointer rounded w-32 text-center"
                  >
                    {{ Qu.RightAnswer }}
                  </div>
                  <div
                    class="bg-[#eee] p-2.5 cursor-pointer rounded w-32 text-center"
                  >
                    {{ Qu.WrongeAnswer1 }}
                  </div>
                  <div
                    class="bg-[#eee] p-2.5 cursor-pointer rounded w-32 text-center"
                  >
                    {{ Qu.WrongeAnswer2 }}
                  </div>
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
import ShowTest from "../components/ShowTest.vue";

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
    };
  },
  components: {
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    AddTest,
    AddQu,
    ShowTest,
  },
  methods: {
    getvalues() {
      setTimeout(() => {
        this.Type = localStorage.getItem("updateType");
        this.Lang = localStorage.getItem("updateLang");
        this.Class = localStorage.getItem("updateClass");
        this.Sub = localStorage.getItem("updateSub");
      }, 10);
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
