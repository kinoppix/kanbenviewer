import React, { useEffect, useCallback } from 'react';
import AdviceRow from './AdviceRow'
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { useFetch } from "./useFetch";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: "100%",
  },
}));

// カラムのインデックス
// 排便の有無、形、色、チェックポイント、慢性疾患
const branch_index = [1, 2, 3, 4, 8];

function Advice({ kanben_bm, kanben_shape, kanben_color, onShapeChanged, onColorChanged }) {
  const classes = useStyles();

  const [advices, setAdvices] = React.useState({})

  const [tree, setTree] = React.useState(undefined)
  useEffect(() => {
    if (!tree) {
      return
    }
    const shape_key = (tree[kanben_bm].length === 1 || !tree[kanben_bm][kanben_shape]) ? '__default__' : kanben_shape
    onShapeChanged(shape_key !== '__default__')
    const color_key = (tree[kanben_bm][shape_key].length === 1 || !tree[kanben_bm][shape_key][kanben_color]) ? '__default__' : kanben_color
    onColorChanged(color_key !== '__default__')
    console.log(kanben_bm, shape_key, color_key)
    const advices = tree[kanben_bm][shape_key][color_key]
    setAdvices(advices)
  }, [kanben_bm, kanben_shape, kanben_color, onShapeChanged, onColorChanged, tree])

  const readBody = useCallback(
    async (body) => {
      const data = await body.json() // ここでレスポンスの実体を取得
      data.sort((a, b) => {
        return a[10] - b[10]
      })
      let newTree = {};
      // 挿入先のノードの参照を求める
      data.forEach((cols) => {
        const lastNode = branch_index.reduce((node, index) => {
          const key = (cols[index] !== "") ? cols[index] : "__default__";
          // 子ノードがなければ空ノードを作る
          if (node[key] === undefined) {
            node[key] = [];
          }
          return node[key]; //参照を返す
        }, newTree);
        // 参照先に要素を追加
        lastNode.push(cols);
      })
      console.log("reload");
      setTree(newTree)
      return newTree
    }, []
  )

  const { loading, error, data } = useFetch(process.env.REACT_APP_KANBEN_URL, null, readBody)
  if (loading) return <LinearProgress />;
  if (error) return <div>{`Error: ${error}`}</div>;
  if (!data) return null;

  return (
    <div>{
      Object.keys(advices).map((key) => {
        const checkpoint = (key === '__default__') ? '' : key
        const diseases = advices[key]
        return Object.keys(diseases).map(disease_key => {
          return (
            <div key={disease_key} style={disease_key === '__default__' ? {} : { backgroundColor: "#ffaaaa" }}>
              {disease_key !== '__default__' && <h2>{disease_key}</h2>}
              <List className={classes.root}>
                {diseases[disease_key].map(advice => (
                  <AdviceRow
                    checkpoint={checkpoint}
                    advice={advice}
                    key={advice[0]}
                  />
                ))}
              </List>
            </div>
          )
        })
      })
    }
    </div>
  )
}
export default Advice