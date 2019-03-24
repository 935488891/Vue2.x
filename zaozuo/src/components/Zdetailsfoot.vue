<template>
  <div id="footer">
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div class="placeholder">
          <i></i>客服
        </div>
      </div>
      <div class="weui-flex__item">
        <div class="placeholder" @click="tiaozhuan_car">
          <i></i>购物车
        </div>
      </div>
      <div class="weui-flex__item" @click="tiaozhuan_car">
        <div class="placeholder">立即购买</div>
      </div>
      <div class="weui-flex__item" @click="tianjia">
        <div class="placeholder">加入购物车</div>
      </div>

      <div>
        <div
          class="weui-mask"
          id="iosMask"
          :style="{'opacity':1, 'display': show? 'block': 'none'}"
        ></div>
        <div
          :class="{'weui-actionsheet':true, 'weui-actionsheet_toggle': show}"
          id="iosActionsheet"
        >
          <div class="weui-actionsheet__menu">
            <div class="cell">数量</div>
            <div class="cell">
              <span class="sub" @click="sub()">-</span>
              <span class="ga-cartprice qty" v-text="qty"></span>
              <span class="add" style="fontSize: 0.4211rem;" @click="add()">+</span>
            </div>
          </div>
          <div class="weui-actionsheet__action">
            <span class="weui-actionsheet__cell cancel" @click="cancel">取消</span>
            <span class="weui-actionsheet__cell determine" @click="determine">确定</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      qty: 1
    };
  },

  methods: {
    tiaozhuan_car() {
      this.$router.push({ name: "car" });
    },

    tianjia() {
      this.show = true;
    },

    //数量加加
    add() {
      this.qty++;
    },
    //数量减减
    sub() {
      if (this.qty > 1) {
        this.qty--;
      } else {
        this.qty = 1;
      }
    },

    //数量取消
    cancel() {
      this.show = false;
    },

    //数量确定
    determine() {
      if (localStorage.getItem("zaozuo_token") != null) {
        this.show = false;
        let goods = [];
        let obj_goods = {
          imgurl: this.$store.state.imgurl,
          name: this.$store.state.name,
          price: this.$store.state.price.slice(1),
          category: this.$store.state.category,
          color: this.$store.state.color,
          qty: this.qty
        };

        goods.push(obj_goods);

        let key = localStorage.getItem("zaozuo_name");
        let value = JSON.parse(sessionStorage.getItem(key));
        if (value != null && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            goods.push(value[i]);
          }
        }
        sessionStorage.setItem(key, JSON.stringify(goods));
      } else {
        this.$router.push({ name: "log_reg" });
      }
    }
  }
};
</script>

<style scoped>
#footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 20;
  background-color: #fff;
}
.weui-flex {
  height: 50px;
}
.weui-flex__item {
  text-align: center;
  line-height: 50px;
}
.weui-flex :nth-child(1) {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 15%;
}
.weui-flex :nth-child(2) {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 15%;
}
.weui-flex :nth-child(3) {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 35%;
  font-size: 14px;
}
.weui-flex :nth-child(4) {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 35%;
  font-size: 14px;
  color: #fff;
  background-color: #000;
}

.cell {
  position: relative;
  padding: 10px 0;
  text-align: center;
  font-size: 18px;
}
.weui-actionsheet__action {
  margin-top: 0;
}
.sub,
.add,
.qty {
  display: inline-block;
  width: 0.6053rem;
  height: 0.6053rem;
  border: 0.0263rem solid #ccc;
  text-align: center;
  line-height: 0.6053rem;
  font-size: 0.4211rem;
}
.qty {
  width: 1.2105rem;
  border-left: none;
  border-right: none;
}

.cancel,
.determine {
  display: inline-block;
  width: 30%;
}
.cancel {
  float: left;
  background: #ccc;
}
.determine {
  float: right;
  background: orange;
}
</style>