import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import IconButton from "@material-ui/core/IconButton"
import AddCircle from "@material-ui/icons/AddCircle"
import { Redirect } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import addOrderItem from "./AddOrder"
import { increment, clearItemAdd } from "../../actions"
import { useSnackbar } from "notistack"
import MessageUtil from '../../utils/alertMsg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    color: "green",
  },
}))

export default function GetMenu(props) {
  const { id, close } = props
  const classes = useStyles()
  const [msgError, setMsgError] = useState("")
  const [data, setData] = useState([])
  const [redirect, setRedirect] = useState(false)
  const [selItem, setSelItem] = useState({})
  const table_no = useSelector((state) => state.table.tableNo)
  const order_no = useSelector((state) => state.table.order.orderNo)
  const emp_code = useSelector((state) => state.table.empCode)

  const specialText = useSelector((state) => state.item.specialText)
  const subMenuCode = useSelector((state) => state.item.subMenuCode)

  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const handleOnClick = (code, group) => {
    setRedirect(true)
    setSelItem({
      code: code,
      group: group,
    })
    close()
  }

  const onAddNewItem = (code, name, price) => {
    addOrderItem({
      code,
      name,
      price,
      table_no,
      order_no,
      emp_code,
      specialText,
      subMenuCode,
    })
    dispatch(increment())
    dispatch(clearItemAdd())
    const variant = "success"
    enqueueSnackbar("เพิ่มรายการอาหาร", { variant })
  }

  useEffect(() => {
    fetch(`/api/product/${id}`)
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
  }, [id])

  if (redirect) {
    return <Redirect push to={`/detail/${selItem.group}/${selItem.code}`} />
  }

  return (
    <div className={classes.root}>
      <GridList>
        {data &&
          data.map((item) => (
            <GridListTile key={item.code_key}>
              <img
                src={`${item.img_host}${item.img_url}`}
                alt={item.description}
                onClick={() =>
                  handleOnClick(`${item.code}`, `${item.group_code}`)
                }
              />
              <GridListTileBar
                title={item.name}
                subtitle={<span>Code: {item.code}</span>}
                actionIcon={
                  <IconButton
                    aria-label={`info about ${item.description}`}
                    className={classes.icon}
                    onClick={() =>
                      onAddNewItem(item.code, item.name, item.price)
                    }
                  >
                    <AddCircle />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
      {msgError && <MessageUtil message={msgError} />}
    </div>
  )
}
