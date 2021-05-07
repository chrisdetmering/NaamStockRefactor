import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';
import { Tabs, Tab } from 'react-bootstrap';

const ControlledTabs = ({ handleSubmit, quantity, handleQuantityChange, details, total }) => {
  const [type, setType] = useState('buy');

  return (
    <Tabs
      id='controlled-tab-example'
      activeKey={type}
      onSelect={(k) => setType(k)}
    >
      <Tab eventKey='buy' title='Buy'>
        {type === 'buy' &&
          <Transaction
            details={details}
            total={total}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleSubmit={handleSubmit}
            type={type}
          />}
      </Tab>
      <Tab eventKey='sell' title='Sell'>
        {type === 'sell' &&
          <Transaction
            details={details}
            total={total}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleSubmit={handleSubmit}
            type={type}
          />}
      </Tab>
    </Tabs>
  );
};

export default ControlledTabs;
