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
import HomeComponent from './components/HomeComponent'
import iconHome from './images/home-icon.png'
import iconPlusActive from './images/plus-active-icon.png'
import iconPlusDisable from './images/plus-disable-icon.png'
import ProgressBarComponent from './components/ProgressBarComponent'
import ResultComponent from './components/ResultComponent'

const styles = {
  fadeIn: {
    animation: 'x 2s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn'),
  },
}

let inteval = null
let timeout = null
function App() {
  const [options, setOptions] = useState(['', '', ''])
  const [flag, setFlag] = useState(true)
  const [select, setSelect] = useState(0)
  const [count, setCount] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [position, setPosition] = useState(0)

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

  useEffect(() => {
    console.log(options.filter((value) => value !== '').length < 2)
  }, [options])

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
    timeout = setTimeout(() => onRandomBox(), 30000000)
    // onRandomBox()
  }

  function onChangeStep() {
    if (step === 1) setStep(2)
    if (step == 2 && options.filter((value) => value !== '').length >= 2) {
      const valueOptions = options.filter((value) => value !== '')
      if (valueOptions.length >= 2) {
        setLoading(true)
        timeout = setTimeout(() => {
          setLoading(false)
          setConfetti(true)
        }, 2000)
        // const position = Math.floor(Math.random() * valueOptions.length)
        setPosition(Math.floor(Math.random() * valueOptions.length))
        setStep(3)
      }
    }
    if (step === 3) {
      setStep(2)
      setOptions(['', '', ''])
      setConfetti(false)
    }
  }

  return (
    <div>
      {confetti && <Confetti numberOfPieces={100} />}

      <div className="AppContainer">
        <div style={{ height: '100%' }}>
          {!loading && step < 3 && (
            <div className="HomeContainer">
              <div>
                <img src={iconHome} style={{ width: '243px', height: '179px' }} />
              </div>
              <div className="Title">Hôm nay ăn gì?</div>
              <div className="Decription">Không ngại đi xa, chỉ cần lý do</div>
            </div>
          )}
          {loading ? (
            <ProgressBarComponent />
          ) : (
            <>
              <div className="OptionContainer" style={{ height: step >= 3 && '0px' }}>
                {step === 2 && (
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
                        <div
                          className={`ButtonAddContainer ${options.filter((value) => value !== '')
                            .length < 3 && 'ButtonAddDisableContainer'} `}
                          onClick={
                            options.filter((value) => value !== '').length < 3
                              ? () => {}
                              : () => addOption()
                          }
                        >
                          <img
                            src={
                              options.filter((value) => value !== '').length < 3
                                ? iconPlusDisable
                                : iconPlusActive
                            }
                            style={{
                              position: 'absolute',
                              margin: 'auto',
                              top: '0',
                              left: '0',
                              right: '0',
                              bottom: '0',
                              height: '18px',
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              {step === 3 && <ResultComponent value={options[position]} />}
              <div
                style={{
                  position: 'absolute',
                  bottom: '5%',
                  width: '100%',
                  backgroundColor: step == 3 && '#AD0000',
                }}
              >
                <div
                  style={{
                    backgroundColor: step == 3 && '#AD0000',
                    border: '1px solid #FFFFFF',
                  }}
                  className={`ButtonContainer ${options.filter((value) => value !== '').length <
                    3 &&
                    step === 2 &&
                    'ButtonDisableContainer'} ${step === 3} `}
                  onClick={() => onChangeStep()}
                >
                  {step === 1
                    ? 'Bắt đầu ngay'
                    : step === 2
                    ? 'Chọn món hôm nay'
                    : 'Quay lại chọn món'}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App

// {flag ? (
//   <>
//     {options.map((item, index) => (
//       <SuggestConponent
//         name={index}
//         key={index}
//         value={item}
//         onDeleteData={onDelete}
//         onChangeData={onChangeData}
//         isShowBtnDelete={options.length !== 1}
//       />
//     ))}

//     {options.length < 10 && (
//       <div style={{ marginTop: '10px' }}>
//         <div
//           className={`ButtonAddContainer ${options.filter((value) => value !== '')
//             .length < 3 && 'ButtonAddDisableContainer'} `}
//           onClick={
//             options.filter((value) => value !== '').length < 3
//               ? () => {}
//               : () => addOption()
//           }
//         >
//           {/* <span style={{ cursor: 'pointer' }} onClick={() => addOption()}> */}
//           <img
//             src={
//               options.filter((value) => value !== '').length < 3
//                 ? iconPlusDisable
//                 : iconPlusActive
//             }
//             style={{
//               position: 'absolute',
//               margin: 'auto',
//               top: '0',
//               left: '0',
//               right: '0',
//               bottom: '0',
//               height: '18px',
//             }}
//           />
//           {/* </span> */}
//         </div>
//       </div>
//     )}
//     {/* <StyleRoot>
//       <div className="ButtonComponent" style={styles.fadeIn} onClick={() => onTurn()}>
//         Quay
//       </div>
//     </StyleRoot> */}
//   </>
// ) : (
//   <div>
//     <StyleRoot>
//       <div style={styles.fadeIn}>
//         <Container>
//           <Row style={{ justifyContent: 'center' }}>
//             {options.map((item, index) => (
//               <Col
//                 xs={2}
//                 md={3}
//                 lg={4}
//                 style={{
//                   backgroundColor: 'yellow',
//                   border: '2px solid transparent',
//                   marginRight: '10px',
//                   marginTop: '10px',
//                 }}
//                 key={index}
//                 className={`${select === index && 'RandomContainer'}`}
//               >
//                 <div>{item}</div>
//               </Col>
//             ))}
//           </Row>
//         </Container>
//       </div>
//     </StyleRoot>
//   </div>
// )}
