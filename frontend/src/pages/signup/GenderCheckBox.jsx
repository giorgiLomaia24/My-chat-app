import React from 'react'

function GenderCheckBox({handleCheckboxChange,selectedGender}) {
  return (
      <div className='flex mt-2'>
          <div className="form-control">
              <label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}>
                  <span className="label-text text-gray-300">Male</span>
                  <input type="checkbox" className="checkbox border-slate-300"
                      checked={selectedGender === 'male'}
                      onChange={() => handleCheckboxChange('male')}
                  />
              </label>
          </div>
          <div className="form-control">
              <label className={`label gap-2 cursor-pointer ${selectedGender === 'male' ? 'selected' : ''}`}>
                  <span className="label-text text-gray-300">Female</span>
                  <input type="checkbox" className="checkbox border-slate-300"
                   checked={selectedGender === 'female'}
                   onChange={() => handleCheckboxChange('female')}/>
              </label>
          </div>
    </div>
  )
}

export default GenderCheckBox