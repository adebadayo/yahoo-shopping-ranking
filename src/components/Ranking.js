import React from "react";
import PropTypes from 'prop-types'

export default class  Ranking extends React.Component{
  componentWillMount() {
    this.props.onMount(this.props.categoryId)
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if(this.props.categoryId !== nextProps.categoryId){
      this.props.onUpdate(nextProps.categoryId)
    }
  }

  render(){

    const { category, ranking, error } = this.props;

    return (
      <div>
        <h2>{
          typeof category !== 'undefined'
          ? `${category.name}のランキング`
            : ''
        }</h2>
        {(() => {
          if(error){
            return <p>エラーが発生しました。リロードしてください</p>
          } else if(typeof ranking === 'undefined'){
            return <p>読みこみ中</p>
          } else {
            return (
              <ol>
                {ranking.map(item => (
                  <li key={`ranking-item-${item.code}`}>
                    <img src={item.imageUrl} alt={item.name}/>
                    <a href={item.url} target="_blank">{item.name}</a>
                  </li>
                ))}
              </ol>
            );
          }
        })()};
        <p>カテゴリーID : {this.props.categoryId}</p>
      </div>
    )
  }
}

Ranking.propTypes = {
  categoryId : PropTypes.string,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,

  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),

  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),

  error: PropTypes.bool.isRequired
};

Ranking.defaultProps = {
  categoryId : '1'
}