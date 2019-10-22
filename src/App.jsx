import React, { useEffect } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { styled } from '@material-ui/core/styles';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import Advice from './Advice'
import LinearProgress from '@material-ui/core/LinearProgress';
import ColoredToggleButton from './ColoredToggleButton'

const branch_index = [1, 2, 3, 4, 8];



function App() {
  const [isLoading, setIsLoading] = React.useState(false)
  useEffect(() => {
    async function fetchData() {
      function buildTree(cols, node, index) {
        if (index === branch_index.length) {
          node.push(cols);
          return;
        }
        let key = cols[branch_index[index]]; // 選択肢カラムのセルの値
        if (key === "") {
          key = "__default__";
        }
        if (node[key] === undefined) {
          node[key] = [];
        }
        let child_node = node[key];
        buildTree(cols, child_node, index + 1);
      }
      setIsLoading(true)
      const result = await axios(process.env.REACT_APP_KANBEN_URL)
      setIsLoading(false)
      let tree = {};
      result.data.sort((a,b)=>{
        return a[10] - b[10]
      })
      result.data.forEach((val) => {
        buildTree(val, tree, 0)
      })
      console.log("reload");
      setTree(tree)
      setQuery({ kanben_bm: '有', kanben_shape: '普通系（はんねり、バナナ、かちふと）', kanben_color: '茶色系（茶色、黄土色、こげ茶）' })
    }
    fetchData();
  }, [])

  const [tree, setTree] = React.useState(undefined)
  const [query, setQuery] = React.useState(undefined);
  useEffect(() => {
    if (!tree || !query) {
      return
    }
    const {kanben_bm, kanben_shape, kanben_color} = query
    const shape_key = (tree[kanben_bm].length === 1 || !tree[kanben_bm][kanben_shape]) ? '__default__' : kanben_shape
    setShapeToggle(shape_key !== '__default__')
    const color_key = (tree[kanben_bm][shape_key].length === 1 || !tree[kanben_bm][shape_key][kanben_color]) ? '__default__' : kanben_color
    setColorToggle(color_key !== '__default__')
    console.log(kanben_bm, shape_key, color_key)
    const advices = tree[kanben_bm][shape_key][color_key]
    setAdvices(advices)
  }, [query, tree])
  const [advices, setAdvices] = React.useState({});
  const [kanben_bm, setBowelMovement] = React.useState('有')
  const [kanben_shape, setShape] = React.useState('普通系（はんねり、バナナ、かちふと）')
  const [kanben_color, setColor] = React.useState('茶色系（茶色、黄土色、こげ茶）')
  const [toggle_shape, setShapeToggle] = React.useState(true)
  const [toggle_color, setColorToggle] = React.useState(true)
  const handleBowelMovement = function (event, value) {
    if (value === null) return
    setBowelMovement(value);
    setQuery({ kanben_bm: value, kanben_shape: kanben_shape, kanben_color: kanben_color })
  }
  const handleShape = function (event, value) {
    if (value === null) return
    setShape(value);
    setQuery({ kanben_bm: kanben_bm, kanben_shape: value, kanben_color: kanben_color })
  }
  const handleColor = function (event, value) {
    if (value === null) return
    setColor(value);
    setQuery({ kanben_bm: kanben_bm, kanben_shape: kanben_shape, kanben_color: value })
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>カンベンビューア</h1>
        <h3>便は出ましたか？</h3>
        <ToggleButtonGroup
          value={kanben_bm}
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
            value={kanben_shape}
            size="large"
            exclusive
            onChange={handleShape}
          >
            <ToggleButton value="ゆるい系（水様、泥状）" disabled={!toggle_shape}>
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
            value={kanben_color}
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
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Advice src={advices} />
        )}
      </div>
    </div>
  )
}

export default App;
