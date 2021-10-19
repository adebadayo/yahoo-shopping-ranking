import React from "react";
import propTypes from 'prop-types'

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
    return (
      <div>
        <h2>Rankingコンポーネント</h2>
        <p>カテゴリーID : {this.props.categoryId}</p>
      </div>
    )
  }
}

Ranking.propTypes = {
  categoryId : propTypes.string,
  onMount: propTypes.func.isRequired,
  onUpdate: propTypes.func.isRequired
};

Ranking.defaultProps = {
  categoryId : '1'
}