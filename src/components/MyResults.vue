<template>
  <div
    class="box border p-2.5 Main_Box"
    v-for="(Subject, index) in Subjects"
    :key="Subject"
  >
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div>{{ index + 1 }}</div>
        <div>{{ Subject }}</div>
      </div>
      <div class="AllResults flex flex-col">
        <div class="percent">0%</div>
        <div class="appreciation">ممتاز</div>
      </div>
    </div>
    <div
      class="ShowResult cursor-pointer bg-[--main-color] text-white p-2.5 text-center"
      @click="GetDataByIndex(index)"
    >
      نتائح الإختبارات
    </div>
    <div
      class="main_Overlay"
      v-if="ShowResult"
      @click="ShowResultFunction"
    ></div>
    <div
      class="bg-white fixed z-10 rounded p-2.5 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 max-h-90 overflow-auto container"
      v-show="ShowResult"
    >
      <div class="text-left p-2.5">
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          @click="ShowResultFunction"
        />
      </div>
      <div class="feat">
        <div
          class="test border p-2.5"
          v-for="Result in Results_1"
          :key="Result"
        >
          <div class="flex justify-between items-center">
            <div>اختبار رقم ( {{ Result.TestNumber }})</div>
            <div>
              <div>{{ Result.percent }}%</div>
              <div>{{ Result.appreciation }}</div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div>{{ Result.result }}/{{ Result.Allresult }}</div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              {{
                new Date(Result.Time.toMillis()).toLocaleString(["ar"], {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>نتائج أخري ( غير تابعة لفرقتك الدراسية )</div>
  <div class="box border p-2.5" v-for="Result in Results_2" :key="Result">
    <div>{{ Result.Type }}</div>
    <div>{{ Result.Class }}</div>
    <div>{{ Result.Lang }}</div>
    <div>{{ Result.Sub }}</div>
    <div>{{ Result.result }}/{{ Result.Allresult }}</div>
    <div class="flex justify-between items-center">
      <div>اختبار رقم ( {{ Result.TestNumber }})</div>
      <div>
        <div>{{ Result.percent }}%</div>
        <div>{{ Result.appreciation }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
  name: "MyResults",
  emits: ["TotalResultFunction", "AppreciationsFunction"],
  data() {
    return {
      Results_1: [],
      Results_2: [],
      ShowResult: null,
      Subjects: [],
      Main_Index: "",
      Sub: [],
      TotalResult: "",
      Appreciations: "",
    };
  },
  mounted() {
    this.GetData();
  },
  methods: {
    async GetPercent() {
      let Percents = document.querySelectorAll(".AllResults .percent");
      let Appreciations = document.querySelectorAll(
        ".AllResults .appreciation"
      );
      let Array = [];
      let Array_1 = [];
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      for (let e = 0; e < this.Sub.length; e++) {
        for (let i = 0; i < docData.resultes.length; i++) {
          if (docData.resultes[i].Sub === this.Sub[e]) {
            Array.push(docData.resultes[i].percent);
          }
        }
        const sum = Array.reduce(
          (accumulator, currentValue) => accumulator + parseInt(currentValue),
          0
        );
        const average = sum / (Array.length * 100);
        const result = (average * 100).toFixed(1);
        Percents[e].innerHTML = `${result}%`;
        Array_1.push(result);

        if (result >= 90 && result <= 100) {
          Appreciations[e].innerHTML = "إمتياز";
        } else if (result >= 80 && result <= 89) {
          Appreciations[e].innerHTML = "جيد جدا";
        } else if (result >= 70 && result <= 79) {
          Appreciations[e].innerHTML = "جيد";
        } else if (result >= 50 && result <= 69) {
          Appreciations[e].innerHTML = "مقبول";
        } else if (result >= 25 && result <= 49) {
          Appreciations[e].innerHTML = "ضعيف";
        } else if (result >= 0 && result <= 24) {
          Appreciations[e].innerHTML = "ضعيف جدا";
        }
      }
      console.log(Array_1);
      const sum = Array_1.reduce(
        (accumulator, currentValue) => accumulator + parseFloat(currentValue),
        0
      );
      this.TotalResult = ((sum / +`${Array_1.length}00`) * 100).toFixed(1);
      // this.Appreciations = sum;

      if (this.TotalResult >= 90 && this.TotalResult <= 100) {
        this.Appreciations = "إمتياز";
      } else if (this.TotalResult >= 80 && this.TotalResult <= 89) {
        this.Appreciations = "جيد جدا";
      } else if (this.TotalResult >= 70 && this.TotalResult <= 79) {
        this.Appreciations = "جيد";
      } else if (this.TotalResult >= 50 && this.TotalResult <= 69) {
        this.Appreciations = "مقبول";
      } else if (this.TotalResult >= 25 && this.TotalResult <= 49) {
        this.Appreciations = "ضعيف";
      } else if (this.TotalResult >= 0 && this.TotalResult <= 24) {
        this.Appreciations = "ضعيف جدا";
      }
      this.$emit("TotalResultFunction", this.TotalResult);
      this.$emit("AppreciationsFunction", this.Appreciations);
      console.log(this.TotalResult);
    },
    async GetDataByIndex(index) {
      this.Results_1 = [];
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let Array = [];
      for (let i = 0; i < docData.resultes.length; i++) {
        if (docData.resultes[i].Sub === this.Sub[index]) {
          console.log(docData.resultes[i].Sub);
          this.ShowResult = true;
          this.Results_1.push(docData.resultes[i]);
          this.Results_1?.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
          Array.push(this.Results_1[0].percent);
          console.log(Array);
        }
      }
    },
    ShowResultFunction() {
      this.ShowResult = !this.ShowResult;
    },
    async GetData() {
      const docRef = doc(db, "الطلاب", localStorage.getItem("userid"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      let Array = [];
      // let State;
      for (let i = 0; i < docData.resultes.length; i++) {
        if (
          docData.resultes[i].Type === docData.TypeOfClass &&
          docData.resultes[i].Class === docData.Class &&
          docData.resultes[i].Lang === docData.Lang
        ) {
          Array.push(docData.resultes[i].Sub);
          const uniqueValues = new Set(Array);
          this.Subjects = uniqueValues;
          const arrayMethod1 = [...this.Subjects];
          console.log(arrayMethod1);
          this.Sub = arrayMethod1;
          setTimeout(() => {
            this.GetPercent();
          }, 1);
          // State = true;
          // if(docData.resultes[i].Sub === ) {

          //   this.Results_1.push(docData.resultes[i]);
          // console.log(docData.resultes);
          // console.log(docData.resultes[i]);
          // console.log(this.Results_1);
          // const arrayMethod = [...this.Results_1];
          // console.log(arrayMethod);
        } else {
          this.Results_2.push(docData.resultes[i]);
        }
      }
    },
  },
};
</script>
