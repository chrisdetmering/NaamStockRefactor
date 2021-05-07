import React from 'react';
import { Form, Button, Col, Row, Card } from 'react-bootstrap';
import './Transaction.css';

const Transaction = ({ type, quantity, handleQuantityChange, handleSubmit, details, total }) => {

  function handlePurchaseStock(e) {
    e.preventDefault();
    handleSubmit(type);
  }

  function onQuantityChange(e) {
    const newQuantity = e.target.value;
    if (newQuantity > getMaxQuantityToBuyOrSell() && type === "buy") return;
    if (newQuantity > details.position && type === "sell") return;
    handleQuantityChange(newQuantity);
  }

  function getMaxQuantityToBuyOrSell() {
    if (type === "sell") return details.position;

    return Math.round(details.wallet / details.stockPrice);
  }


  return (
    <div>
      {details.position ? <Card>Position: {details.position} stocks</Card> : null}
      <Form className='my-2' onSubmit={handlePurchaseStock}>
        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalAmount'
        >
          <Form.Label column sm={4} className='px-0'>
            Quantity
          </Form.Label>

          <Col sm={8} className='pl-3 pr-0'>
            <Form.Control
              type='number'
              onChange={onQuantityChange}
              value={quantity}
              placeholder='0.00'
              Required
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={4} className='px-0'>
            Price
          </Form.Label>

          <Col sm={8} className='pl-3 pr-0'>
            <Form.Control
              type='number'
              placeholder={details.stockPrice}
              className='number-input'
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={8} className='px-0'>
            Max quantity to {type}
          </Form.Label>

          <Col sm={4} className='pl-3 pr-0'>
            <Form.Control
              plaintext
              readOnly
              defaultValue='0'
              value={getMaxQuantityToBuyOrSell()}
              className='text-right'
            />
          </Col>
        </Form.Group>

        <hr className='total-line mx-auto my-1' />

        <Form.Group
          as={Row}
          className='row-buy-sell px-3 py-2'
          controlId='formHorizontalPrice'
        >
          <Form.Label column sm={6} className='px-0 font-weight-bold'>
            Total
          </Form.Label>

          <Col sm={6} className='pl-3 pr-0'>
            <Form.Control
              plaintext
              readOnly
              defaultValue='0'
              value={total}
              className='text-right font-weight-bold'
            />
          </Col>
        </Form.Group>

        <Button variant='success' type='submit' className='my-3'>
          {type} now
        </Button>
      </Form>

      <hr />
      <Form.Label className='label-alert mb-3'>
        ${details.wallet ? details.wallet.toFixed(2) : null} available to trade
      </Form.Label>
    </div>
  );
};

export default Transaction;
