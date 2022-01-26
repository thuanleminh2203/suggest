/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react'
import SuggestConponent from './components/SuggestComponent'
import iconPlus from './images/plus-icon.png'

function App() {
  const [options, setOptions] = useState(['1'])

  const onChangeData = (index, value) => {
    const indexOption = options.findIndex((v, i) => index === i)
    const data = [...options]
    data[indexOption] = value
    console.log(data)
    setOptions(data)
  }

  const addOption = () => {
    const data = [...options]
    data[options.length] = ''
    setOptions(data)
  }

  const onDelete = (index) => {
    setOptions(options.filter((v, k) => index !== k))
  }

  return (
    <div
      className="AppContainer"
      style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}
    >
      <div className="OptionContainer">
        {options.map((item, index) => (
          <SuggestConponent
            name={index}
            key={index}
            value={item}
            onDeleteData={onDelete}
            onChangeData={onChangeData}
            isShowBtnDelete={options.length !== 1}
          />
        ))}

        {options.length < 10 && (
          <div style={{ marginTop: '10px' }}>
            <div className="ButtonAddComponent">
              <span style={{ cursor: 'pointer' }} onClick={() => addOption()}>
                <img src={iconPlus} style={{ verticalAlign: 'middle', height: '16px' }} />
                Thêm lựa chọn
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
