
const AddOrder = props => {
  const { 
    code, name, price, table_no, order_no, emp_code, specialText, subMenuCode 
  } = props
  const cust_count = 0
  const item_count = 0
  const total_amount = 0

  const checkOrder = () => {
    fetch(`/api/orders?order_no=${order_no}`)
      .then(res => res.json())
      .then(
        response => {
          if (response.data.length === 0) {
            addOrder()
          } else {
            addOrderDetail()
          }
        },
        error => {
          console.log("in error found => ", error)
        }
      )
      .catch(error => {
        console.log("Error: (AddOrder: " + error + ")")
      })
  }

  const addOrder = () => {
    fetch(`/api/orders/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_no,
        table_code: table_no,
        emp_code,
        cust_count,
        item_count,
        total_amount
      })
    }).then(response => {
          addOrderDetail()
        },
        error => {
          console.log("in error found => ", error)
        }
      )
      .catch(error => {
        console.log("Error: (AddOrder: " + error + ")")
      })
  }
  const addOrderDetail = () => {
    fetch(`/api/orders_detail/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        index: table_no + "_" + code,
        order_no,
        menu_code: code,
        menu_name: name,
        price,
        qty: 1,
        total_amount: price,
        special_text: specialText,
        sub_menu_code: subMenuCode
      })
    })
      .then(
        response => {
        },
        error => {
          console.log("in error found => ", error)
        }
      )
      .catch(error => {
        console.log("Error: (AddOrder: " + error + ")")
      })
  }

  checkOrder()
}

export default AddOrder
