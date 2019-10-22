import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { styled } from '@material-ui/core/styles';
import logo from './logo.svg';
import './App.css';
import Advice from './Advice'
import ColoredToggleButton from './ColoredToggleButton'


function App() {

  const [query, setQuery] = React.useState({ kanben_bm: '有', kanben_shape: '普通系（はんねり、バナナ、かちふと）', kanben_color: '茶色系（茶色、黄土色、こげ茶）' });

  const handleShapeRef = React.useRef(null)
  const [toggle_shape, setShapeToggle] = React.useState(true)
  const [toggle_color, setColorToggle] = React.useState(true)
  const handleBowelMovement = function (event, value) {
    if (value === null) return
    setQuery({...query, kanben_bm: value})
    // ↓これと同じ
    // setQuery({ kanben_bm: value, kanben_shape: kanben_shape, kanben_color: kanben_color })
  }
  const handleShape = function (event, value) {
    if (value === null) return
    setQuery({...query, kanben_shape: value})
  }
  const handleColor = function (event, value) {
    if (value === null) return
    setQuery({...query, kanben_color: value})
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>カンベンビューア</h2>
        <h3>便は出ましたか？</h3>
        <ToggleButtonGroup
          value={query.kanben_bm}
          size="large"
          exclusive
          onChange={handleBowelMovement}
        >
          <ToggleButton value="無">
            出なかった
        </ToggleButton>
          <ToggleButton value="便秘">
            便秘
        </ToggleButton>
          <ToggleButton value="有">
            出た<span role="img" aria-label="poop">💩</span>
        </ToggleButton>
        </ToggleButtonGroup>
        <div>
          <h3>形は？色は？</h3>
          <ToggleButtonGroup
            value={query.kanben_shape}
            size="large"
            exclusive
            onChange={handleShape}
          >
            <ToggleButton ref={handleShapeRef} value="ゆるい系（水様、泥状）" disabled={!toggle_shape}>
              ゆるい系
          </ToggleButton>
            <ToggleButton value="普通系（はんねり、バナナ、かちふと）" disabled={!toggle_shape}>
              普通系
          </ToggleButton>
            <ToggleButton value="硬い系（芋状、カチコロ）" disabled={!toggle_shape}>
              硬い系
              </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <ToggleButtonGroup
            value={query.kanben_color}
            size="large"
            exclusive
            onChange={handleColor}
          >
            <ToggleButton value="茶色系（茶色、黄土色、こげ茶）" disabled={!toggle_color} style={{background: "sienna", color: "white", fontWeight: "bold"}}>
              茶色系
              </ToggleButton>
            <ToggleButton value="灰色" disabled={!toggle_color} style={{background: "darkgray", color: "white", fontWeight: "bold"}}>
              灰色
              </ToggleButton>
            <ToggleButton value="黒色" disabled={!toggle_color} style={{background: "black", color: "white", fontWeight: "bold"}}>
              黒色
              </ToggleButton>
              <ToggleButton value="緑色" disabled={!toggle_color} style={{background: "darkgreen", color: "white", fontWeight: "bold"}}>
              緑色
              </ToggleButton>
            {/* <ColoredToggleButton value="赤色" disabled={!toggle_color} color="red">
              赤色
              </ColoredToggleButton> */}
              <ToggleButton value="赤色" disabled={!toggle_color} style={{background: "darkred", color: "white", fontWeight: "bold"}}>
              赤色
              </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div>
        <Advice {...query} handleShape={handleShapeRef} />
      </div>
    </div>
  )
}

export default App;
