<template>
  <div>
    <dl class="type">
      <dt>类型</dt>
      <dd
        @click="toType(idx, item)"
        v-for="(item,idx) in type"
        :key="idx"
        :style="{'border':idx==typecur?'2px solid #000':'2px solid #a0a0a0'}"
        class="dd"
      >
        <span :class="{'cycle':idx==typecur}"></span>
        <span v-text="item"></span>
      </dd>
    </dl>

    <dl class="color">
      <dt>颜色</dt>
      <dd
        @click="toColor(idx, item)"
        v-for="(item,idx) in picUrl"
        :key="idx"
        :style="{'border':idx==colorcur?'1px solid #000':'1px dashed #a0a0a0'}"
      >
        <span :class="{'cycle':idx==colorcur}"></span>
        <span class="img" :style="{backgroundColor: item}"></span>
      </dd>
    </dl>
  </div>
</template>
<script>
// import pic from "../assets/details_color.jpg";
export default {
  data() {
    return {
      type: [],
      picUrl: [],
      typecur: 0,
      colorcur: 0
    };
  },
  methods: {
    toType(idx, item) {
      this.typecur = idx;
      this.$store.commit('upd_category', item);
    },

    toColor(idx, item) {
      this.colorcur = idx;
      this.$store.commit('upd_color', item);
    },

    async shuju() {
      let idx = this.$route.params.id;
      let data = await this.$axios.get(`${this.$store.state.ip}/details`, {
        params: {
          id: idx
        }
      });
      this.type = data.data[0].type;
      this.picUrl = data.data[0].color;

      this.$store.commit('upd_category', this.type[0]);
      this.$store.commit('upd_color', this.picUrl[0]);
    }
  },
  created() {
    this.shuju();
  }
};
</script>
<style scoped>
.mid {
  clear: both;
}
.img {
  display: inline-block;
  width: 30px;
  height: 30px;
}
dd {
  display: inline-block;
  position: relative;
}
.type .dd {
  width: 150px;
  height: 40px;
  border: 1px solid #a0a0a0;
  color: #a0a0a0;
  margin: 0px 10px 10px 0px;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
}
.color dd {
  padding: 5px;
  border: 1px dashed #a0a0a0;
  margin-right: 10px;
}
dt {
  font-size: 14px;
  color: #a0a0a0;
  padding: 30px 0 15px 0;
}
div {
  border-top: 8px solid #f6f6f6;
  margin: 20px;
}
.cycle {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 2;
  border-right: #000 8px solid;
  border-left: transparent 8px solid;
  border-top: transparent 8px solid;
}
</style>