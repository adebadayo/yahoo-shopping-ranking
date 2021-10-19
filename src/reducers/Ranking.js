const getRanking = responce => {
  const ranking = [];
  const itemLength = responce.ResultSet.totalResultsReturned
  for(let index = 0; index < itemLength; index++){
    const item = responce.ResultSet['0'].Result[index + ''];
    ranking.push({
      code: item.Code,
      name: item.Name,
      url: item.Url,
      imageUrl: item.image.Medium,
    })
  }
  return ranking;
}

const initialState = {
  categoryId: undefined,
  ranking: undefined,
  error: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'START_REQUEST':
      return {
        categoryId: action.payload.categoryId,
        ranking: undefined,
        error: false
      }
    case 'RECEIVE_DATA':
      return action.payload.error
        ? {...state, error: true}
        : {
          ...state,
          ranking: getRanking(action.payload.reponce)
        }
    default:
      return state;
  }
}