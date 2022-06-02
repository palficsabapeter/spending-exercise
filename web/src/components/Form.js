import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { AlertBox, AlertHidden, FormStyles } from '../styles/ComponentStyles';

export default function Form() {
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  const [error, setError] = useState({
    isError: false,
    msg: 'Placeholder text',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }
  
  function setEmptyState() {
    setState({
      description: '',
      amount: 0,
      currency: 'USD'
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (state.description === '') {
      console.error('empty')
      setError({isError: true, msg: 'Description cannot be empty'})
    } else if (state.amount === 0 || state.amount < 0) {
      console.log('no_amount')
      setError({isError: true, msg: 'Amount cannot be zero or negative'})
    } else {
      fetch('http://localhost:5000/spendings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: state.description,
          amount: state.amount,
          currency: state.currency
        })
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setError(false, 'Placeholder text');
        setEmptyState();
        window.location.reload();
      })
  }
}

  return (
    <>
    {!error.isError && (
      <AlertHidden>
        Placeholder
      </AlertHidden>
    )}
    {error.isError && (
      <AlertBox>
        {error.msg}
      </AlertBox>
    )}
      <FormStyles>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' onClick={handleSubmit}/>
      </FormStyles>
    </>
  );  
}
