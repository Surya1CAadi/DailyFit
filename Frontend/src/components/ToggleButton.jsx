import React, { useState } from 'react'

const Switcher12 = ({left, right, onChange}) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked)
    onChange(e);
  }

  return (
    <>
      <label className='themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center text-sm '>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={handleCheckboxChange}
          className='sr-only'
        />
        {/*<span className='label text-sm font-medium text-gray-600'>*/}
        {/*  {left}*/}
        {/*</span>*/}
        <span
          className={`slider m-1 flex h-6 md:h-8 w-[40px] md:w-[60px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-pink-500' : 'bg-blue-300'
          }`}
        >
          <span
            className={`dot flex justify-center items-center h-4 w-4 md:h-6 md:w-6 rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-[16px] md:translate-x-[28px] text-pink-500' : 'text-blue-500'
            }`}
          >
            {isChecked?right:left}
          </span>
        </span>
        {/*<span className='label text-sm font-medium text-gray-600'>*/}
        {/*  {right}*/}
        {/*</span>*/}
      </label>
    </>
  )
}

export default Switcher12
