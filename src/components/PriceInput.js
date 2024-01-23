import React, { useState } from 'react';
import { addComma } from '../utils/processNumber';

export const PriceInput = () => {
  const [amount, setAmount] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    let input = e.target.value.replace(/,/g, '');

    const valid = /^[0-9]*\.?[0-9]*$/.test(input);
    if (!valid) {
      // setIsValid(false);
      return;
    } else if (valid) {
      input = addComma(input);
      setAmount(input);
      setIsValid(true);
    }
  };
  // submit將input value 轉成數字用
  // const getNumberValue = (formattedString) => {
  //   return parseFloat(formattedString.replace(/,/g, ''));
  // };

  // getNumberValue(amount);
  return (
    <div className='max-w-md mx-auto bg-white p-8 mt-10 rounded-md shadow-lg'>
      <div>
        <label>入住費用（每人每晚）</label>
        <div className='flex items-center rounded-md bg-gray-200'>
          <div className='p-2'>TWD</div>

          <input
            type='text'
            id='amount'
            value={amount}
            onChange={handleInputChange}
            placeholder='請輸入費用'
          ></input>
        </div>
      </div>
      {isValid ? null : <p className='alert'>不可以為空白</p>}

      <div className='flex items-center justify-end mt-6'>
        <div className='flex items-center'>
          <p className='ml-2 text-sm'>輸入 0 表示免費</p>
        </div>
      </div>
    </div>
  );
};