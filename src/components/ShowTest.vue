<template>
  <div class="ShowTest">
    <div class="main_Overlay z-10"></div>
    <div
      class="container rounded p-2.5 bg-white fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 overflow-auto h-4/5 z-20"
    >
      <div
        class="header flex justify-between border-b border-[#eee] mb-2.5 p-2.5 rounded"
      >
        <span>اختبار رقم ({{ TestIndex + 1 }})</span>
        <font-awesome-icon
          :icon="['fas', 'xmark']"
          class="bg-[red] rounded text-white py-1 px-2.5"
          @click="OpenCheck"
        />
      </div>
      <div
        class="Check bg-[#fafafa] p-2.5 text-center flex flex-col gap-2.5"
        v-if="ShowCheck"
      >
        <div>هل متأكد من أنك تريد الخروج من الإمتحان ؟</div>

        <div>
          <span class="btn" @click="Close">نعم</span>
          <span class="btn" @click="CloseCheck">لا</span>
        </div>
      </div>
      <div class="form">
        <div class="rounded p-2.5">
          <div class="body flex flex-col gap-2.5">
            <div class="feat border p-2 5 rounded">
              <div>الأسئلة</div>
              <div class="form flex flex-col gap-2.5">
                <textarea
                  name="qu1"
                  id="qu1"
                  cols="10"
                  rows="4"
                  placeholder="السؤال"
                  class="resize-none border p-2.5"
                  v-model="qu1"
                ></textarea>
                <input
                  type="text"
                  id="RightAnswer"
                  placeholder="الإجابة الصحيحة"
                  class="border p-2.5"
                  v-model="RightAnswer"
                />
                <textarea
                  name="qu2"
                  id="qu2"
                  cols="10"
                  rows="2"
                  placeholder="تكملة السؤال"
                  class="resize-none border p-2.5"
                  v-model="qu2"
                ></textarea>
                <input
                  type="text"
                  id="WrongAnswer1"
                  placeholder="إجابة خاطئة - 1"
                  class="border p-2.5"
                  v-model="WrongAnswer1"
                /><input
                  type="text"
                  id="WrongAnswer2"
                  placeholder="إجابة خاطئة - 2"
                  class="border p-2.5"
                  v-model="WrongAnswer2"
                />
              </div>
            </div>
          </div>
          <div
            class="Add_Qu flex items-center gap-2.5 mr-auto w-fit p-2 text-[--main-color] border-[--main-color] border-1 rounded cursor-pointer mt-2.5"
            @click="AddData"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
            <span>اضف سؤال</span>
          </div>
        </div>
      </div>
      <div class="counter text-left p-2.5">عدد الأسئلة ({{ Qu.length }})</div>
      <div class="body mt-2.5">
        <img
          src="../assets/animation_lolk2w1w_small.gif"
          alt=""
          class="m-auto"
          v-if="ShowImg"
        />
        <div class="All_Qu my-3">
          <div class="box my-2.5 relative" v-for="(qu, index) in Qu" :key="qu">
            <font-awesome-icon
              :icon="['fas', 'pen-to-square']"
              class="absolute transform -translate-x-1/2 translate-y-1/2 left-10"
            />
            <font-awesome-icon
              :icon="['fas', 'trash-can']"
              class="absolute transform -translate-x-1/2 translate-y-1/2 left-5"
              @click="DeleteQu"
            />
            <div
              class="qu flex items-center p-2.5 gap-1 bg-[#fafafa] rounded whitespace-pre-line"
            >
              <div class="num">{{ index + 1 }} -</div>
              <div class="qu1">{{ qu.qu1 }}</div>
              <span>...</span>
              <div class="qu2">{{ qu.qu2 }}</div>
            </div>
            <div class="Answer flex mt-2.5 flex-wrap gap-2.5">
              <div
                class="RightAnswer w-auto min-w-32 text-center border p-2.5 cursor-pointer rounded"
              >
                {{ qu.RightAnswer }}
              </div>
              <div
                class="WrongAnswer1 w-auto min-w-32 text-center border p-2.5 cursor-pointer rounded"
              >
                {{ qu.WrongeAnswer1 }}
              </div>
              <div
                class="WrongAnswer2 w-auto min-w-32 text-center border p-2.5 cursor-pointer rounded"
              >
                {{ qu.WrongeAnswer2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="ErrorActive" class="text-[red] bold text-center my-2.5">
        أجب علي جميع الأسئلة
      </div>
      <div
        class="ShowDegree bg-[--main-color] text-white text-center cursor-pointer p-2.5 rounded"
        @click="ShowResult"
      >
        النتيجة
      </div>
      <div class="ShowResult" v-if="MyResult">
        <div>نتيجتك => {{ result }} / {{ Allresult }}</div>
        <div>نسبتك المؤية : {{ percent }} %</div>
        <div>تقديرك : {{ appreciation }}</div>
        <div class="flex gap-2.5 items-center">
          <div class="bg-[red] w-2.5 h-2.5"></div>
          <div>الإجابة الصحيحة</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDoc,
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  deleteField,
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
  name: "ShowTest",
  emits: ["close"],
  props: ["TestIndex"],
  mounted() {
    this.ShowImg = true;
    setTimeout(() => {
      this.GetData();
    }, 10);
  },
  data() {
    return {
      ShowCheck: null,
      Qu: [],
      qu1: "",
      qu2: "؟",
      RightAnswer: "",
      WrongAnswer1: "",
      WrongAnswer2: "",
      ShowImg: null,
      ErrorActive: null,
      result: 0,
      Allresult: "",
      appreciation: "",
      percent: "",
      MyResult: null,
    };
  },
  methods: {
    ShowResult() {
      let AnswerDad = document.querySelectorAll(".Answer");
      let AllAnswer = document.querySelectorAll(".Answer > div");
      let active = document.querySelectorAll(".Answer > .active");
      if (active.length !== this.Qu.length || active.length === 0) {
        this.ErrorActive = true;
        this.MyResult = false;
      } else {
        this.MyResult = true;
        this.ErrorActive = false;
        AllAnswer.forEach((e) => {
          e.classList.add("pointer-events-none");
        });
        for (let i = 0; i < active.length; i++) {
          this.Allresult = active.length;
          for (let j = 0; j < 3; j++) {
            if (AnswerDad[i].children[j].innerHTML === this.Qu[i].RightAnswer) {
              AnswerDad[i].children[j].style.background = "red";
            }
          }
          if (active[i].innerHTML === this.Qu[i].RightAnswer) {
            this.result += 1;
            this.percent = (this.result / this.Allresult) * 100;
            if (this.percent >= 90 && this.percent <= 100) {
              this.appreciation = "إمتياز";
            } else if (this.percent >= 80 && this.percent <= 89) {
              this.appreciation = "جيد جدا";
            } else if (this.percent >= 70 && this.percent <= 79) {
              this.appreciation = "جيد";
            } else if (this.percent >= 50 && this.percent <= 69) {
              this.appreciation = "مقبول";
            } else if (this.percent >= 25 && this.percent <= 49) {
              this.appreciation = "ضعيف";
            } else if (this.percent >= 0 && this.percent <= 24) {
              this.appreciation = "ضعيف جدا";
            }
          }
        }
      }
    },
    ClickActive() {
      let AnswerDad = document.querySelectorAll(".Answer");
      AnswerDad.forEach(() => {
        for (let i = 0; i < AnswerDad.length; i++) {
          document
            .querySelectorAll(".Answer")
            [i].querySelectorAll("div")
            .forEach((e) => {
              e.style.order = -Math.floor(Math.random() * 4);
              e.onclick = () => {
                document
                  .querySelectorAll(".Answer")
                  [i].querySelectorAll("div")
                  .forEach((e) => {
                    e.classList.remove("active");
                  });
                e.classList.add("active");
              };
            });
        }
      });
    },
    async DeleteQu() {
      let sentence = localStorage.getItem("updateType");

      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;
      const docRef = doc(db, collectionPath, localStorage.getItem("updateSub"));
      // const index = this.TestIndex;
      console.log(docRef);
      await updateDoc(docRef, {
        test: deleteField(),
      });
    },
    CleanData() {
      this.qu1 = "";
      this.qu2 = "؟";
      this.RightAnswer = "";
      this.WrongAnswer1 = "";
      this.WrongAnswer2 = "";
    },

    async GetData() {
      let sentence = localStorage.getItem("updateType");

      let words = sentence.split(" ");
      let firstWord = words[0];
      const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
        "updateLang"
      )} - ${localStorage.getItem("updateClass")}`;
      const docRef = doc(db, collectionPath, localStorage.getItem("updateSub"));
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const index = this.TestIndex;
      this.Qu = docData.test[index].AllQu;
      this.ShowImg = false;
      setTimeout(() => {
        this.ClickActive();
      }, 10);
    },
    async AddData() {
      if (
        document.getElementById("qu1").value !== "" &&
        document.getElementById("RightAnswer").value !== "" &&
        document.getElementById("qu2").value !== "" &&
        document.getElementById("WrongAnswer1").value !== "" &&
        document.getElementById("WrongAnswer2").value !== ""
      ) {
        let sentence = localStorage.getItem("updateType");

        let words = sentence.split(" ");
        let firstWord = words[0];
        const collectionPath = `اختبارات - ${firstWord} - ${localStorage.getItem(
          "updateLang"
        )} - ${localStorage.getItem("updateClass")}`;
        const docRef = doc(
          db,
          collectionPath,
          localStorage.getItem("updateSub")
        );
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data();
          if (!docData.test) {
            docData.test = [];
          }
          const index = this.TestIndex;
          const newData = {
            qu1: document.getElementById("qu1").value,
            RightAnswer: document.getElementById("RightAnswer").value,
            qu2: document.getElementById("qu2").value,
            WrongeAnswer1: document.getElementById("WrongAnswer1").value,
            WrongeAnswer2: document.getElementById("WrongAnswer2").value,
          };

          if (Array.isArray(docData.test[index].AllQu)) {
            docData.test[index].AllQu.push(newData);
          } else {
            docData.test[index].AllQu = [newData];
          }
          this.Qu = docData.test[index].AllQu;
          console.log(this.Qu);
          await setDoc(docRef, docData);
        } else {
          await setDoc(docRef, {
            test: [
              {
                AllQu: {
                  [0]: {
                    qu1: document.getElementById("qu1").value,
                    RightAnswer: document.getElementById("RightAnswer").value,
                    qu2: document.getElementById("qu2").value,
                    WrongeAnswer1:
                      document.getElementById("WrongAnswer1").value,
                    WrongeAnswer2:
                      document.getElementById("WrongAnswer2").value,
                  },
                },
              },
            ],
          });
        }
        this.CleanData();
      }
      setTimeout(() => {
        this.ClickActive();
      }, 10);
    },
    OpenCheck() {
      this.ShowCheck = true;
    },
    CloseCheck() {
      this.ShowCheck = false;
    },
    Close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.Check {
  animation: Check 0.3s 1;
}
.active {
  background: var(--main-color);
  color: #fff;
}
@keyframes Check {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
@media (min-width: 1200px) {
}

@media (min-width: 768px) and (max-width: 1199px) {
}

@media (max-width: 767px) {
  .Answer {
    flex-direction: column;
    & > div {
      width: 100% !important;
    }
  }
}
</style>
