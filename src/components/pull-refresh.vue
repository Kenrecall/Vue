<template >
    <div class="yo-scroll" :class="{'down':(state===0),'up':(state==1),refresh:(state===2),touch:touching}" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)">
        <section class="inner" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
            <header class="pull-refresh">
                <slot name="pull-refresh">
                  <img src="../assets/img/downlog.png" alt="a" class="refreshlog">
                    <span class="down-tip">下拉更新</span>
                    <span class="up-tip">松开刷新数据</span>
                    <span class="refresh-tip">加载中……</span>
                </slot>
            </header>
            <slot>
            </slot>
            <footer class="load-more" >
                <slot name="load-more">
                    <span v-show="downFlag === false">上加载更多</span>
                    <span v-show="downFlag === true">加载中……</span>
                </slot>
            </footer>
            <div class="nullData" v-show="dataList.noFlag" >暂无更多数据</div>
        </section>
    </div>
</template>

<script>
    export default {
        props: {
            offset: {
                type: Number,
                default: 50 //默认高度
            },
            enableInfinite: {
                type: Boolean,
                default: true
            },
            enableRefresh: {  // 可以刷新
                type: Boolean,
                default: true
            },
            dataList: {
                default: false,
                required: false
            },
            onRefresh: {
                type: Function,
                default: undefined,
                required: false
            },
            onInfinite: {
                type: Function,
                default: undefined,
                require: false
            }
        },
        data() {
            return {
                top: 0, //  向上位移距离
                state: 0,  // 滑动状态  默认 0 为down   1 为 up 超出默认下拉距离的情况下   2 为刷新事件触发  改变state 改变calss  显示隐藏 下拉刷新
                startX: 0,
                startY: 0,
                touching: false, // 页面触摸时    默认没有触摸到
                infiniteLoading: false,  // true 表示  正在执行 下拉加载的函数
                downFlag: false, //用来显示是否加载中
            }
        },
        methods: {
            touchStart(e) {
                this.startY = e.targetTouches[0].pageY;
                this.startX = e.targetTouches[0].pageX;
                this.startScroll = this.$el.scrollTop || 0;
                console.log(this.startScroll)
                this.touching = true; //留着有用，不能删除

                this.dataList.noFlag = false;  // false 说明还有数据   true 说明 底部 暂无更多数据
//                this.$el.querySelector('.load-more').style.display = 'block';
            },
            touchMove(e) {
                if(!this.enableRefresh || this.dataList.noFlag || !this.touching) {
                    // 不能刷新  || 暂无更多数据  ||
                    return
                }
                let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
                console.log(diff)
                if(diff > 0){
                  e.preventDefault();
                  this.top = Math.pow(diff, 0.8);
                }

              console.log(this.top)
                if(this.state === 2) { // in refreshing  正在刷新
                    return
                }
                if(this.top >= this.offset) { // 滑动距离 大于 默认高度  处理 state 状态
                    this.state = 1
                } else {
                    this.state = 0
                }

                let more = this.$el.querySelector('.load-more');
              console.log('底部距离')
              console.log(this.top)
                if(!this.top && this.state === 0) {
                    more.style.display = 'block';
                } else {
                    more.style.display = 'none';
                }
            },
            touchEnd(e) {

                if(!this.enableRefresh) {  //  true  能刷新
                    return
                }
                this.touching = false; // 触摸状态解除
                if(this.state === 2) { // in refreshing  正在刷新
                    this.state = 2
                    this.top = this.offset
                    return
                }
                if(this.top >= this.offset) { // do refresh  马上刷新
                    this.refresh()
                } else { // cancel refresh
                    this.state = 0
                    this.top = 0
                }

                //用于判断滑动是否在原地 ----begin
                let endX = e.changedTouches[0].pageX,
                    endY = e.changedTouches[0].pageY,
                    dy = this.startY - endY,
                    dx = endX - this.startX;

                //如果滑动距离太短
                if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    console.log("滑动距离太短")
                    return;
                }

                //--------end--------

                if(!this.enableInfinite || this.infiniteLoading) {
                    return
                }

                let outerHeight = this.$el.clientHeight,
                    innerHeight = this.$el.querySelector('.inner').clientHeight,
                    scrollTop = this.$el.scrollTop,
                    ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0,
                    bottom = innerHeight - outerHeight - scrollTop - ptrHeight;
                console.log(bottom + " __ " + this.offset)

                if(bottom <= this.offset && this.state === 0) {
                    this.downFlag = true;
                    this.infinite();
                } else {
                    this.$el.querySelector('.load-more').style.display = 'none';
                    this.downFlag = false;
                }

            },
            refresh() {
                this.state = 2;
                this.top = this.offset;
                setTimeout(() => {
                    this.onRefresh(this.refreshDone)
                }, 1000);
            },
            refreshDone() {
                this.state = 0
                this.top = 0
            },
            infinite() {
                this.infiniteLoading = true

                setTimeout(() => {
                    this.onInfinite(this.infiniteDone);
                }, 2000);
            },
            infiniteDone() { // 完成 下拉刷新5
                this.infiniteLoading = false;
              this.$el.querySelector('.load-more').style.display = 'none';
            }
        }
    }
</script>
<style lang="less">
  .yo-scroll {
    font-size: 0.4rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    z-index: 100;
    height: auto;
    -webkit-overflow-scrolling: touch;
    .inner {
      position: absolute;
      top:-1.2rem;
      width: 100%;
      height: auto;
      transition-duration: 300ms;
      .pull-refresh {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 1.2rem;
        text-align: center;
        line-height: 1.2rem;
      }
      .load-more {
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        display: none;
      }
      .nullData {
        //暂无更多数据样式

        color: #999999;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
      }
      .down-tip,
      .refresh-tip,
      .up-tip {
        display: none;
        position: absolute;
        left:48%;
      }


    }
  }

  .yo-scroll.touch .inner {
    transition-duration: 0s;
  }

  .yo-scroll.down .down-tip {
    display: inline-block;
  }

  .yo-scroll.up .up-tip {
    display: inline-block;
  }

  .yo-scroll.refresh .refresh-tip {
    display: inline-block;
  }
  .yo-scroll .refreshlog{
    position: absolute;
    top:0.3rem;
    left:40% ;
    height: 0.6rem;
    transition: 0.2s;

  }
  .yo-scroll.up .refreshlog ,.yo-scroll.refresh .refreshlog {
    transform: rotate(180deg);
  }
</style>
