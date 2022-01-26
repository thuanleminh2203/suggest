/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import { useState } from 'react'
import SuggestConponent from './components/SuggestComponent'
import iconPlus from './images/plus-icon.png'
import { fadeIn } from 'react-animations'
import Radium, { StyleRoot } from 'radium'
import { Col, Container, Row } from 'react-bootstrap'
import { useEffect } from 'react'
import Confetti from 'react-confetti'

const styles = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
}

let inteval = null
let timeout = null
function App() {
  const [options, setOptions] = useState(['1'])
  const [flag, setFlag] = useState(true)
  const [select, setSelect] = useState(0)
  const [count, setCount] = useState(0)
  const [confetti, setConfetti] = useState(false)

  const onChangeData = (index, value) => {
    const indexOption = options.findIndex((v, i) => index === i)
    const data = [...options]
    data[indexOption] = value
    console.log(data)
    setOptions(data)
  }

  const addOption = () => {
    const data = [...options]
    data[options.length] = '1'
    setOptions(data)
  }

  const onDelete = (index) => {
    setOptions(options.filter((v, k) => index !== k))
  }

  useEffect(() => {
    if (count === 50) {
      clearInterval(inteval)
      clearTimeout(timeout)
      setCount(0)
      setConfetti(true)
    }
  }, [count])

  function onRandomBox() {
    inteval = setInterval(() => {
      setCount((preCount) => preCount + 1)
      setSelect(Math.floor(Math.random() * options.length))
    }, 100)
  }

  function onTurn() {
    setFlag(!flag)
    timeout = setTimeout(() => onRandomBox(), 3000)
    // onRandomBox()
  }

  return (
    <>
      {confetti && <Confetti numberOfPieces={500} />}

      <div
        className="AppContainer"
        style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center' }}
      >
        <div className="OptionContainer">
          {flag ? (
            <>
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
                  <div className="ButtonAddContainer">
                    <span style={{ cursor: 'pointer' }} onClick={() => addOption()}>
                      <img src={iconPlus} style={{ verticalAlign: 'middle', height: '16px' }} />
                      Thêm lựa chọn
                    </span>
                  </div>
                </div>
              )}
              <StyleRoot>
                <div className="ButtonComponent" style={styles.fadeIn} onClick={() => onTurn()}>
                  Quay
                </div>
              </StyleRoot>
            </>
          ) : (
            <div>
              <StyleRoot>
                <div style={styles.fadeIn}>
                  <Container>
                    <Row style={{ justifyContent: 'center' }}>
                      {options.map((item, index) => (
                        <Col
                          xs={2}
                          md={3}
                          lg={4}
                          style={{
                            backgroundColor: 'yellow',
                            border: '2px solid transparent',
                            marginRight: '10px',
                            marginTop: '10px',
                          }}
                          key={index}
                          className={`${select === index && 'RandomContainer'}`}
                        >
                          <div>{item}</div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
              </StyleRoot>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
