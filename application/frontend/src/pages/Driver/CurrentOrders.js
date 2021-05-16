// import { getMaxListeners } from "../../../backend/db";
import '../../assets/css/driver.css';
import map_sample from '../../assets/img/map_customerorder.png';
import MyMap from '../../components/MyMap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/order/user-orders', {
        params: {
          driverID: 586,
        },
      })
      .then((res) => {
        setOrders(res.data);
      });
  }, []);

  return (
      <div>
      {orders.filter((order) => order.Completed == 0).map((item,i) => (

      
    <div className="container">
      <div className="card border card_customerorder_body mx-auto mt-3 mb-3">
       
          <div className="card-header card_customerorder h4 pt-3 font-italic font-weight-bold text-white">
            Customer Order:
            <span className="h4 pl-2">#{item.ID}</span>
          </div>
       
        <div className="card-body mx-auto">
            <div className="h3 text-center font-weight-bold current-order-text">
              Head to Customer
              <div>
              {' '}
              <MyMap></MyMap>{' '}
            </div>
            </div>
            <div className="container text-center">
              <div className="row">
                <div className="left-col col-5 col-sm-6">
                  <div className="pt-4">
                    <span className="current-order-text h5 font-weight-bold">Order Details</span>
                    
                      <ul>
                        <div>{item.Restaurant_Name}</div>
                      </ul>
                    
                  </div>
                  <div className="pt-4">
                    {' '}
                    <span className="current-order-text font-weight-bold h5">Total</span>
                    
                      <ul>
                        <div>&#36;{item.Total}</div>
                      </ul>
                 
                  </div>

                  <div className="pt-4">
                    <span className="current-order-text font-weight-bold h5">Order Status:</span>
                    <div className="pl-2 font-italic text-info">Pending</div>
                  </div>
                </div>

                <div className="right-col col-5 col-sm-6">
                <div className="pt-4">
                    <span className="current-order-text font-weight-bold h5">
                      Order No.
                    </span>{' '}
                    
                      <ul>
                        <div>#{item.ID}</div>
                      </ul>
                 
                  </div>
                  <div className="pt-4">
                    <span className="current-order-text font-weight-bold h5">
                      Customer Info:
                    </span>{' '}
                    
                      <ul>
                        <div>{item.Customer_Name}</div>
                      </ul>
                  
                  </div>
                  <div className="pt-2">
                    <span className="current-order-text font-weight-bold h5">
                      Delivery Instructions:
                    </span>
                    
                      <ul>
                        <div>{item.Delivery_Instruction}</div>
                      </ul>
                   
                  </div>
                </div>
              </div>
            </div>

            <div className="click_delivered text-center col-md-12 mt-2 mb-2 text-muted">
              *Click delivered once food is handed to customer*
            </div>
            <button
              type="button"
              className="col-sm-12 col-4 py-2 btn btn-block delivered_button mx-auto text-white"
              onClick="myDirections()"
            >
              Delivered!
            </button>
          
        </div>
      </div>
    </div>
    
    ))}
    </div>
  );
};
export default CurrentOrders;
