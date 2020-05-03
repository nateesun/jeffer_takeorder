import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import Checkbox from "@material-ui/core/Checkbox"
import { useDispatch } from "react-redux"
import { addNewSubMenuCode, clearNewSubMenuCode } from "../../actions"
import MessageUtil from '../../utils/alertMsg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
}))

export default function MenuSubList(props) {
  const classes = useStyles()
  const [msgError, setMsgError] = useState("")
  const [data, setData] = useState([])
  const [subCode, setSubCode] = useState([])
  const dispatch = useDispatch()

  const handleAdd = (item) => {
    let hasExist = false
    for (let i = 0; i < subCode.length; i++) {
      const iSubCode = subCode[i]
      if (iSubCode === item.code) {
        hasExist = true
      }
      if (i === subCode.length - 1) {
        if (hasExist) {
          setSubCode((sCode) => sCode.filter((sc) => sc !== item.code))
          dispatch(clearNewSubMenuCode(item.code))
        } else {
          setSubCode((sCode) => sCode.concat(item.code))
          dispatch(addNewSubMenuCode(item.code))
        }
      }
    }
    if (subCode.length === 0) {
      setSubCode((sCode) => sCode.concat(item.code))
      dispatch(addNewSubMenuCode(item.code))
    }
  }

  const isSelect = (code) => {
    for (let i = 0; i < subCode.length; i++) {
      const iSubCode = subCode[i]
      if (iSubCode === code) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    fetch(`/api/menu_list/${props.code}`)
      .then((res) => res.json())
      .then(
        (response) => {
          if (response.status === "not_found") {
            setData([])
          } else {
            setData(response.data)
          }
        },
        (error) => {
          setMsgError(`${error}`)
        }
      )
      .catch((error) => {
        setMsgError(`${error}`)
      })
    return function () {
      setData([])
    }
  }, [props.code])

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        {data.map((item) => (
          <GridListTile key={item.code}>
            <img
              src={`${item.img_host}${item.img_url}`}
              alt={item.name}
              onClick={() => handleAdd(item)}
            />
            <GridListTileBar
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <Checkbox
                  style={{ color: "white" }}
                  checked={isSelect(item.code)}
                />
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {msgError && <MessageUtil message={msgError} />}
    </div>
  )
}
