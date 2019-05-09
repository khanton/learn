<template>
  <b-container>
    <b-row>
      <b-col class="mt-5" md="7">
        <h2>Вопрос</h2>
        <div v-html="question.question"></div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5"  md="7">
        <b-form-radio-group stacked v-model="answer" @change="onAnswer">
          <b-form-radio
            v-for="answer in question.answers"
            :key="answer.id"
            :value="answer.id"
          >{{answer.text}}</b-form-radio>
        </b-form-radio-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5"  md="7">
        <b-alert :show="wrong" variant="danger" v-if="showResult">
          <div v-html="question.wrong"></div>
        </b-alert>
        <b-alert :show="!wrong" variant="success" v-if="showResult">
          <div>Да это верный ответ!</div>
        </b-alert>
      </b-col>
    </b-row>
    <b-row v-if="showResult">
      <b-col class="mt-5"  md="7">
        <b-button @click="onNext">Я все понял! Дальше !</b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import _ from 'lodash' 

export default {
  fetch({ store }) {
    store.dispatch("questions/set", require("assets/questions.json"));
  },
  data() {
    return {
      id: 0,
      answer: null,
      wrong: false,
      question: {},
      showResult: false
    };
  },
  async created() {
    this.question = await this.$store.getters["questions/item"];
  },
  methods: {
    onAnswer(value) {

      const q = _.find(this.question.answers, {id:value});

      this.wrong = !q.correct
      this.showResult = true

    },
    async onNext() {
      this.showResult = false
      this.wrong = false
      this.answer = null
      await this.$store.dispatch("questions/next");
      this.question = await this.$store.getters["questions/item"];
    }
  }
};
</script>

<style></style>
