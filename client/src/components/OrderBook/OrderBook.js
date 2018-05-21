import React, { Component } from 'react';
import './OrderBook.css';

class OrderBook extends Component {
  constructor(props) {
    super(props);
  }

  renderOrderInformation() {
    return (
      <ul className="price-amt-ul">
        {' '}
        <li className="price-amt-item">
          {' '}
          <span> 123456 </span> <span> hahahaha </span>{' '}
        </li>
      </ul>
    );
  }

  render() {
    const { type } = this.props;
    return (
      <div className="order-book-wrapper">
        <div className={`type-${type} type-header`}> {type}</div>

        <div className="order-book-header">
          <span className={`type-${type}`}> Price </span>
          <span className={`type-${type}`}> Amount </span>
        </div>

        {this.renderOrderInformation()}
      </div>
    );
  }
}

export default OrderBook;
