<template>
  <div class="contSingleList" :style="{height:innerHeight+'px'}">
    <div class="tabItem">
      <slot></slot>
    </div>
    <vscroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
      <ul class="listItem">
        <li v-for="(item,index) in listdata" @click="alertf(1)">
          <span>{{ item.date }}</span>
          <span>{{ item.portfolio }}</span>
          <span :class="{'state0':(item.state===0),'state1':(item.state==1),state2:(item.state===2)}"  >{{ item.drop }}</span>
        </li>
      </ul>
    </vscroll>
  </div>
</template>
<style >
  .contSingleList{
    position: relative;
   width: 100%;
    overflow: scroll;
  }
  .listItem{}
  .listItem li{
    height: 2rem;
    line-height: 2rem;
    font-size: 0.4rem;
    background: #fff;
    margin-bottom: 0.2rem;
  }
</style>
<script>
  import vscroll from '@/pull-refresh'
  export default {
    data() {
      return {
        counter: 1, //当前页
        num: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        scrollData: {
          noFlag: false //暂无更多数据显示
        },
        innerHeight:window.innerHeight
      }
    },
    components: {
      vscroll
    },
    mounted: function() {
      this.getList();
    },
    methods: {
      alertf(){

      },
      getList() {
        this.counter =1;//  刷新的时候 初始页为第一页了
        var response = [];
        for(let i = 0; i < 20; i++) {
          response.push({
            date: "2017-06-1"+i,
            portfolio: "1.5195"+i,
            drop: i+"+.00 %" ,
            state: 1
          })
        }
        this.listdata = response.slice(0, this.num);
        this.scrollData.noFlag = false;
      },
      onRefresh(done) {
        this.getList();

        done(); // call done

      },
      onInfinite(done) {
        this.counter++;
        let end = this.pageEnd = this.num * this.counter; // 10 * 2 20    10 * 3   30
        let i = this.pageStart = this.pageEnd - this.num; // 20-10  10    30-10    20


        for(i; i < end; i++) {
          if(i >= 40) {
            //走完数据调用方法
            this.scrollData.noFlag = true;
            break;
          } else {
            this.listdata.push({
              date: "2017-06-1"+i,
              portfolio: "1.5195"+i,
              drop: i+"+.00 %" ,
              state: 2
            })

          }
        }
        // 执行回调函数
        done();
      }

    }
  }
</script>
