/* eslint-disable no-unused-vars */
import React from 'react'
import iconDelete from '../images/delete-icon.png'

function SuggestComponent(props) {
  const { value, name, onChangeData, onDeleteData, isShowBtnDelete } = props

  const onChange = (e) => {
    const { target } = e
    const { value, name } = target
    onChangeData(parseInt(name), value)
  }

  const onDelete = (e) => {
    const { target } = e
    const { name } = target
    onDeleteData(parseInt(name))
  }

  return (
    <div style={{ marginTop: '10px', display: 'flex' }}>
      <input
        onChange={(e) => onChange(e)}
        type="text"
        placeholder="Nhập đề xuất gợi ý"
        name={name}
        value={value}
        autoComplete="off"
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '3px',
        }}
      >
        {isShowBtnDelete && (
          <img
            src={iconDelete}
            name={name}
            onClick={(e) => onDelete(e)}
            style={{
              height: '16px',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default SuggestComponent
