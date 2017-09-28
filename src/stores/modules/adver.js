import { GET_ADVER_INFO } from '../mutation.types'
const state = {
  info: {
    name: '',
    type: {},
    link: {
      linkDetails: []
    },
    delivery: {
      deliveryDetail: {}
    },
    time: {
      playTimeFrameDetails: []
    },
    region: {
      playRegionDetails: []
    }
  }
}

const mutations = {
  [GET_ADVER_INFO] (state, value) {
    state.info = {
      ...state.info,
      ...value
    }
  }
}

export default {
  state,
  mutations
}
