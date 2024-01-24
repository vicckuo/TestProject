import React, { useState } from 'react';
import { getNumberIntervals } from '../utils/processNumber';

export const AgeGroupSelect = ({ onAgeChange, isOverlap }) => {
  const maxAge = 20;
  const [startAge, setStartAge] = useState(0);
  const [endAge, setEndAge] = useState(maxAge);
  const [disabledStartOptions, setDisabledStartOptions] = useState([]);
  const [disabledEndOptions, setDisabledEndOptions] = useState([]);

  const updateDisabledOptions = (newStartAge, newEndAge) => {
    const intervals = [[newStartAge, newEndAge]];
    const { notInclude } = getNumberIntervals(intervals);

    const newDisabledStartOptions = [];
    const newDisabledEndOptions = [];

    notInclude.forEach(([start, end]) => {
      if (start === 0) {
        newDisabledEndOptions.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => i + start)
        );
      } else if (end === maxAge) {
        newDisabledStartOptions.push(
          ...Array.from({ length: end - start + 1 }, (_, i) => i + start)
        );
      }
    });

    if (newStartAge === newEndAge) {
      const range = Array.from({ length: maxAge + 1 }, (_, i) => i);
      setDisabledStartOptions(range.filter((age) => age !== newStartAge));
      setDisabledEndOptions(range.filter((age) => age !== newEndAge));
    } else {
      setDisabledStartOptions(newDisabledStartOptions);
      setDisabledEndOptions(newDisabledEndOptions);
    }
  };

  const handleStartAgeChange = (event) => {
    const newStartAge = parseInt(event.target.value, 10);
    setStartAge(newStartAge);
    updateDisabledOptions(newStartAge, endAge);
    onAgeChange(newStartAge, endAge);
  };

  const handleEndAgeChange = (event) => {
    const newEndAge = parseInt(event.target.value, 10);
    setEndAge(newEndAge);
    updateDisabledOptions(startAge, newEndAge);
    onAgeChange(startAge, newEndAge);
  };

  return (
    <div>
      <label>年齡</label>
      <div className='flex items-center justify-center'>
        <select
          value={startAge}
          onChange={handleStartAgeChange}
        >
          {Array.from({ length: maxAge + 1 }, (_, i) => i).map((age) => (
            <option
              key={age}
              value={age}
              disabled={disabledStartOptions.includes(age)}
            >
              {age}
            </option>
          ))}
        </select>

        <div style={{ margin: '0 10px' }}>~</div>
        <select
          value={endAge}
          onChange={handleEndAgeChange}
        >
          {Array.from({ length: maxAge + 1 }, (_, i) => i).map((age) => (
            <option
              key={age}
              value={age}
              disabled={disabledEndOptions.includes(age)}
            >
              {age}
            </option>
          ))}
        </select>
      </div>

      {isOverlap && <p className='alert'>年齡區間不可重疊</p>}
    </div>
  );
};
