<template>
<div class="adver-model">
  <div class="has-city-list" v-show="!modifyCity">
    <h3>
      已选择 <i>{{ oldSelect.length }}</i> 个城市
      <a @click="modify">修改</a>
    </h3>
    <div class="list">
      <span v-for="item in oldSelect">{{ item.cityName }}</span>
    </div>
  </div>
  <div class="modify-city" v-show="modifyCity">
    <h3>按省市投放
      <a @click="closeCity" class="close"></a>
    </h3>
    <div class="region">
      <h4>选择投放省市</h4>
      <ul>
        <li v-for="item in regionList">
          <h5 class="square-select"
            @click="selectRefion(item)"
            :class="{'square-selected': item.selectLe === item.cityList.length}">
            {{ item.provinceName }}
          </h5>
          <div class="city">
            <span v-for="city in item.cityList"
            class="square-select"
            :class="{'square-selected': city.selected}"
            @click="selectCity(item, city)">
            {{ city.cityName }}</span>
          </div>
        </li>
      </ul>
      <div class="footer">
        <p>已选择 <i>{{ selectCityCount }}</i> 个城市</p>
        <div class="">
          <a class="button" @click="closeCity">取消</a>
          <a class="button" @click="sure">确定</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import AdService from '@/services/ad.service'

export default {
  data() {
    return {
      selectCityCount: 0,
      modifyCity: false,
      regionList: [],
      selectCityList: [],
      oldSelect: [],
      selectIds: ''
    }
  },
  props: ['cityInfo'],
  computed: {
  },
  mounted() {
    this.AdService = new AdService()
  },
  methods: {
    async modify () {
      this.modifyCity = true
      if (this.regionList.length > 0) {
        return
      }
      let res = await this.AdService.getCityList()
      res.map(item => {
        item.selected = false
        let selectLe = 0
        item.cityList.map(city => {
          if (this.selectIds.indexOf(city.cityId) > -1) {
            city.selected = true
            selectLe += 1
          } else {
            city.selected = false
          }
        })
        item.selectLe = selectLe
      })
      this.regionList = res
      this.cityCount()
    },
    cityCount () {
      let i = 0
      this.regionList
      .map(item => {
        i = i + item.selectLe
      })
      return i
    },
    closeCity () {
      this.modifyCity = false
    },
    sure () {
      this.modifyCity = false
      this.selectCityListFun()
      this.oldSelect = [
        ...this.selectCityList
      ]
    },
    selectCityListFun () {
      let list = []
      this.regionList
      .filter(item => item.selectLe > 0)
      .map(item => {
        item.cityList
        .filter(city => city.selected)
        .map(city => {
          list.push(city)
        })
      })
      this.selectCityList = list
    },
    selectRefion (item) {
      let isSeAll = (item.selectLe === item.cityList.length) ? 'true' : 'false'
      item.cityList.map(city => {
        if (isSeAll === 'true') {
          city.selected = false
        } else {
          city.selected = true
        }
      })
      item.selectLe = isSeAll === 'true' ? 0 : item.cityList.length
      this.selectCityCount = this.cityCount()
    },
    selectCity (item, city) {
      city.selected = !city.selected
      let i = city.selected ? 1 : -1
      item.selectLe = item.selectLe + i
      this.selectCityCount = this.selectCityCount + i
    }
  },
  watch: {
    'oldSelect' (val) {
      this.$emit('changeCity', val)
    },
    'cityInfo' (val) {
      this.oldSelect = [...val]
      let ids = ''
      val.map(item => {
        ids += item.cityId + ','
      })
      this.selectIds = ids
      this.selectCityCount = val.length
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'scss/variables.scss';
$iconImgUrl:'../../../../../assets/img';

.adver-model{
  width: 400px;
  .has-city-list{
    padding: 10px 10px 10px 16px;
    h3{
      line-height: 20px;
      font-weight: normal;
      font-size: 14px;
      i{
        color: $red;
        padding: 0 4px;
      }
      a{
        color: $primary-font;
        margin-left: 20px;
      }
    }

    .list{
      width: 100%;
      padding: 4px 0px 0 50px;
      font-size: 12px;
      overflow: hidden;
      span{
        padding-left: 12px;
        position: relative;
        display: inline-block;
        height: 17px;
        line-height: 17px;
        min-width: 80px;
        &:before{
          content: "";
          position: absolute;
          width: 6px;
          height: 5px;
          top: 7px;
          left: 0;
          background: url(#{$iconImgUrl}/icon/duihao.png) no-repeat;
          background-size: 6px;
        }
      }
    }
  }
  .modify-city{
    h3{
      height: 30px;
      line-height: 30px;
      color: #555;
      position: relative;
      text-align: center;
      border-bottom: 1px solid $border-color;
      a.close{
        position: absolute;
        width: 20px;
        height: 20px;
        background: url(#{$iconImgUrl}/icon/close.png) center no-repeat;
        background-size: 10px;
        top: 5px;
        right: 5px;
      }
    }
    .region{
      width: 100%;
      padding: 5px 16px;
      font-size: 12px;
      h4{
        height: 25px;
        line-height: 25px;
        color: #555;
        position: relative;
        &:after{
          content: "";
          position: absolute;
          left: -9px;
          width: 3px;
          height: 14px;
          top: 5px;
          border-radius: 5px;
          background: $primary-font;
        }
      }
      ul{
        width: 100%;
        display: block;
        li{
          border-bottom: 1px dashed $border-color;
          // &:last-child{
          //   border-bottom: none;
          // }
          h5{
            padding-top: 4px;
            height: 21px;
            line-height: 17px;
            font-weight: normal;
          }
          .city{
            width: 100%;
            padding-left: 30px;
            span{
              display: inline-block;
              margin: 0px 15px 0px 0;
            }
          }
        }
      }
    }
    .footer{
      p{
        i{
          color: $red;
        }
      }
      >div{
        text-align: center;
        margin: 10px;
        a{
          display: inline-block;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
