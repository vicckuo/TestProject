import React, { useEffect, useState } from 'react';

import { getNumberIntervals } from '../utils/processNumber';
import { AgeGroupSelect } from '../components/AgeGroupSelect';
import { PriceInput } from '../components/PriceInput';

export const AgeGroupPriceList = ({ onChange }) => {
  const [isOverlap, setIsOverlap] = useState(false);
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [agePriceSettings, setAgePriceSettings] = useState([
    {
      id: 'initial-setting',
      ageGroup: [0, 20],
      price: 0,
    },
  ]);

  const checkAgeCoverage = (settings) => {
    const coveredAges = new Set();
    settings.forEach(({ ageGroup }) => {
      for (let age = ageGroup[0]; age <= ageGroup[1]; age++) {
        coveredAges.add(age);
      }
    });
    return coveredAges.size === 21;
  };

  useEffect(() => {
    setIsAddDisabled(checkAgeCoverage(agePriceSettings));
  }, [agePriceSettings]);

  const addNewSetting = () => {
    const Id = `setting-${agePriceSettings.length}-${Date.now()}`;
    const newSetting = { id: Id, ageGroup: [0, 20], price: 0 };

    setAgePriceSettings([...agePriceSettings, newSetting]);
  };

  const removeSetting = (id) => {
    const newSettings = agePriceSettings.filter((setting) => setting.id !== id);
    setAgePriceSettings(newSettings);

    const intervals = newSettings.map((setting) => setting.ageGroup);
    const { overlap } = getNumberIntervals(intervals);

    if (overlap.length > 0) {
      setIsOverlap(true);
    } else {
      setIsOverlap(false);
    }

    onChange(newSettings);
  };

  const handlePriceChange = (index, newPrice) => {
    const newSettings = [...agePriceSettings];
    newSettings[index].price = newPrice;
    setAgePriceSettings(newSettings);
    onChange(newSettings);
  };

  const handleAgeChange = (index, startAge, endAge) => {
    const newSettings = [...agePriceSettings];
    newSettings[index].ageGroup = [startAge, endAge];

    const intervals = agePriceSettings.map((setting) => setting.ageGroup);
    const { overlap } = getNumberIntervals(intervals);

    if (overlap.length > 0) {
      setIsOverlap(true);

      return;
    } else {
      setIsOverlap(false);
      setAgePriceSettings(newSettings);
      onChange(newSettings);
    }
  };

  return (
    <div>
      {agePriceSettings.map((setting, index) => (
        <div
          key={setting.id}
          className='py-10 relative grid grid-cols-2 gap-4 p-4 border-b-2 mx-2 border-gray-200'
        >
          <AgeGroupSelect
            ageIntervals={agePriceSettings.map((s) => s.ageInterval)}
            onAgeChange={(start, end) => handleAgeChange(index, start, end)}
            index={index}
            isOverlap={isOverlap}
          />
          <PriceInput
            price={setting.price}
            onPriceChange={(newPrice) => handlePriceChange(index, newPrice)}
          />
          {index !== 0 && (
            <button
              onClick={() => removeSetting(setting.id)}
              className='absolute top-0 right-0'
            >
              Ｘ移除
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addNewSetting}
        disabled={isAddDisabled}
        className={isAddDisabled ? 'text-gray-600 transition-all' : null}
      >
        ＋新增價格設定
      </button>
    </div>
  );
};
