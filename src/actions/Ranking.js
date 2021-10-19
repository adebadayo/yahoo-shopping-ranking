import fetchJsonp from "fetch-jsonp";
import qs from 'qs';

require('dotenv').config();

const API_URL = "https://developer.yahoo.co.jp/webapi/shopping/v2/categoryRanking.html"
const APP_ID = process.env.APP_ID

const startRequest = categoryId => ({
  type: 'START_REQUEST',
  payload: { categoryId }
})

// レスポンス受信
const receiveData =  (categoryId, error, responce) => ({
  type: 'RECEIVE_DATA',
  payload: { categoryId, error, responce }
})

// リクエスト完了
const finishRequest = categoryId => ({
  type: 'FINISH_REQUEST',
  payload: { categoryId }
})

export const fetchRanking = categoryId => {
  return async dispatch => {
    dispatch(startRequest(categoryId));

    const queryString = qs.stringify({
      appid: APP_ID,
      category_id: categoryId
    });


    try {
      const responce = await fetchJsonp(`${API_URL}?${queryString}`)
      const data = await responce.json();
      dispatch(receiveData(categoryId, null, data))
    } catch(err) {
      dispatch(receiveData(categoryId, err))
    }

    dispatch(finishRequest(categoryId))
  }
}