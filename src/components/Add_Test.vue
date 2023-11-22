<template>
  <div class="Add_Test">
    <div class="main_Overlay" @click="CloseAddTest"></div>
    <div
      class="container rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto z-10 h-90"
    >
      <div class="head text-left flex justify-between mb-2.5">
        <span>أضف اختبار</span
        ><font-awesome-icon :icon="['fas', 'xmark']" @click="CloseAddTest" />
      </div>
      <div class="body flex flex-col gap-2.5">
        <div class="feat border p-2.5 rounded">
          <div>ميعاد الإختبار</div>
          <div class="type flex flex-wrap justify-between">
            <div class="form-floating text-end w-48 mt-2.5">
              <input
                type="time"
                class="form-control"
                id="Time"
                v-model="selectedTime"
                @change="updateTimeFormat"
              />
              <label for="Time">وقت الإختبار</label>
            </div>
            <div class="form-floating text-end w-48 mt-2.5">
              <v-container>
                <v-date-picker
                  v-model="selectedDate"
                  show-adjacent-months
                ></v-date-picker>
                <div class="text-right">
                  تاريخ الإختبار : {{ formatDate(selectedDate) }}
                </div>
              </v-container>
            </div>
          </div>
        </div>
        <div class="feat border p-2.5 rounded">
          <div>نوع الإختبار</div>
          <div class="type flex flex-wrap justify-between">
            <div
              class="p-2.5 border cursor-pointer mt-2.5 flex gap-2.5 w-48 items-center type"
            >
              <font-awesome-icon :icon="['fas', 'thumbs-up']" />
              <span>مجاني</span>
            </div>
            <div
              class="p-2.5 border cursor-pointer mt-2.5 flex gap-2.5 w-48 items-center type"
            >
              <font-awesome-icon :icon="['fas', 'coins']" /> <span>مدفوع</span>
            </div>
          </div>
        </div>
      </div>

      <div class="button text-left mt-5">
        <span
          class="bg-[--main-color] text-white p-2.5 rounded cursor-pointer"
          @click="AddData"
          >تم</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore";

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
import { format } from "date-fns";
export default {
  name: "Add_Test",

  data() {
    return {
      selectedHour: 12,
      selectedMinute: 0,
      selectedPeriod: "AM",
      currentTime: "",
      dialog: false,
      selectedTime: "",
      formattedTime: "",
      selectedDate: null,
    };
  },
  mounted() {
    this.ClassActive();
  },

  methods: {
    formatDate(date) {
      if (!date) return "";
      return format(date, "dd/MM/yyyy"); // تغيير التنسيق حسب رغبتك
    },
    updateTimeFormat() {
      const timeArray = this.selectedTime.split(":");
      const hours = parseInt(timeArray[0], 10);
      const minutes = timeArray[1] || "00";

      // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;

      // Update the formatted time
      this.formattedTime = `${formattedHours}:${minutes} ${period}`;
      console.log(this.formattedTime);
    },

    GetData() {
      this.$emit("GetData");
    },
    ClassActive() {
      let btn = document.querySelectorAll(".type > .type ");
      for (let i = 0; i < btn.length; i++) {
        btn[i].onclick = () => {
          btn.forEach((e) => {
            e.classList.remove("active");
            e.classList.remove("border-[--main-color]");
          });
          btn[i].classList.add("active");
          btn[i].classList.add("border-[--main-color]");
        };
      }
    },
    CloseAddTest() {
      this.$emit("close");
    },
    async AddData() {
      let sentence = localStorage.getItem("updateType");

      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;
      this.currentTime = this.formattedTime;

      const docRef = doc(db, collectionPath, localStorage.getItem("updateSub"));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        if (!docData.test) {
          docData.test = [];
        }
        const allQuIndex = Object.keys(docData.test).length;
        Object.keys(docData.test[allQuIndex]?.AllQu || {}).length;
        const newData = {
          Time: this.formattedTime,
          Date: this.formatDate(this.selectedDate),
          Type: document.querySelector(".type .active span").innerHTML,
          AllQu: {},
        };
        console.log(this.formatDate(this.selectedDate));
        docData.test.push(newData);
        await setDoc(docRef, docData);
      } else {
        await setDoc(docRef, {
          test: [
            {
              Time: this.formattedTime,
              Date: this.formatDate(this.selectedDate),
              Type: document.querySelector(".type .active span").innerHTML,
              AllQu: {},
            },
          ],
        });
      }

      this.CloseAddTest();
      this.GetData();
    },
  },
};
</script>
