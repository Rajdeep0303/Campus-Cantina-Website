
// import { getMaxListeners } from "../../../backend/db";
import '../../assets/css/driver.css';
import map_sample from '../../assets/img/map_customerorder.png';
import MyMap from '../../components/MyMap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const CurrentOrders = () =>{
    
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios
          .get('http://localhost:3001/api/order/user-orders', {
            params: {
              driverID: 1,
            },
            
          })
          .then((res) => {
            setOrders(res.data);
          });
      },[]);

    return (
        <div className = "container-fluid">
            <div className = "order_header h3 text-white text-center mx-auto py-2 w-50">Current Orders
            </div>
            <div className = "card border card_customerorder_body w-75 d-flex mx-auto mb-5">
            {orders.map((item, i) => (
                           <div className = "card-header card_customerorder h4 pt-3 font-italic font-weight-bold text-white">Customer Order:
                           <span className = "h4 pl-2">#{item.ID}</span>
                           </div>))}
                <div className = "card-body">
                    <div className = "py-1 px-5">
                    <div className = "h3 text-center font-weight-bold current-order-text">Head to Customer</div>
                    <div className = "text-center">{' '}<MyMap></MyMap>{' '}</div>
                    <div className = "container text-center">

                        <div className = "row">
                            <div className = "col">
                                <div className = "pt-4"><span className = "current-order-text h5">Order Details</span>
                                {orders.map((item, i) => (
                           <ul>
                               <div>{item.Restaurant_Name}</div>
                           </ul>
                           ))}
                                </div>
                                <div className = "pt-4"> <span className = "current-order-text h5">Total</span>
                                {orders.map((item, i) => (
                           <ul>
                               <div>{item.Total}</div>
                           </ul>
                           ))}
                                </div>

                                <div className = "pt-4"><span className = "current-order-text h5">Order Status:</span>
                                    <div className = "pl-2 font-italic text-info">Pending</div>
                                </div>
                            </div>

                            <div className = "col">
                                <div className = "pt-4"><span className = "current-order-text h5">Customer Info:</span> {orders.map((item, i) => (
                           <ul>
                               <div>{item.Customer_Name}</div>
                           </ul>
                           ))}</div>
                                <div className = "pt-4"><span className = "current-order-text h5">Delivery Instructions:</span>
                                {orders.map((item, i) => (
                           <ul>
                               <div>{item.Delivery_Instruction}</div>
                           </ul>
                           ))}
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className = "click_delivered text-center mt-5 mb-2 text-muted">*Click delivered once food is handed to customer*</div>
                    <button type = "button" className = "col-9 col-sm-5 col-md-4 mx-auto delivered_button btn btn-block text-white" onclick = "myDirections()">Delivered!</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default CurrentOrders;