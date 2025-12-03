import React, { useState } from 'react'
import MultiRangeSlider from "multi-range-slider-react";

export default function RangeSlider() {
    const [minValue, set_minValue] = useState(25);
    const [maxValue, set_maxValue] = useState(75);

    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

  return (
        <div className="searchBar-single-wrap mt-2">
            <MultiRangeSlider
                baseClassName="multi-range-slider-black"
                minValue={minValue}
                maxValue={maxValue}
                ruler={false}
                label={false}
                onInput={(e) => {
                    handleInput(e);
                }}
            />
        </div>
  )
}
