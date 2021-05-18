/*
Summary of OwnerOrderHistory.js: 
 - Renders on '/owner/orders'
 - to load when clicked on Orders on the Sidebar for Owner's login
*/
import React, { useEffect, useState } from 'react';
import '../../assets/css/ownerlayout.css';
import '../../assets/css/index.css';
import axios from 'axios';

const OwnerOrderHistory = () => {
  const [driversList, setDriversList] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderContent, setOrderContent] = useState([]);
  const [clickedOrderIDAssignDriver, setClickedOrderIDAssignDriver] =
    useState('');
  const [selectedDriverName, setSelectedDriverName] = useState('');
  const [loadData, setLoadData] = useState(false);

  const handleAssignDriver = (e) => {
    e.preventDefault();
    console.log(selectedDriverName);
    console.log(clickedOrderIDAssignDriver);
    let selectedDriverID = driversList
      .filter((driver) => driver.Name === selectedDriverName)
      .map((d1) => d1.ID);
    console.log(selectedDriverID[0]);
    axios
      .post('http://localhost:3001/api/order/assign-driver', null, {
        params: {
          orderID: clickedOrderIDAssignDriver,
          driverID: selectedDriverID[0],
        },
      })
      .then((res) => {
        console.log(res);
        setSelectedDriverName('');
        setLoadData(true);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/order/user-orders', {
        params: { restaurantName: 'Taco Shell' },
      })
      .then((res) => {
        setOrderItems(res.data);
        setLoadData(false);
      });

    axios.get('http://localhost:3001/api/driver/all-drivers').then((res) => {
      const tempList = res.data.filter(
        (row) => row.Restaurant === 'Taco Shell'
      );
      setDriversList(tempList);
    });
  }, [loadData]);

  return (
    <div className="container text-center">
      <br />
      <h3 className="owner-heading"> Orders</h3>

      {orderItems.length > 0 ? (
        <div className="table-responsive order-table">
          {/* Orders Table */}
          <table className="table table-striped ">
            <thead>
              <tr className="table-secondary" className="order-list-title">
                <th scope="col">Order #</th>
                <th scope="col">Items</th>
                <th scope="col">Customer</th>
                <th scope="col">Price</th>
                <th scope="col">Order Status</th>
                <th scope="col">Driver</th>
              </tr>
            </thead>

            <tbody>
              <>
                {orderItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ID}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-dark view-btn"
                        data-toggle="modal"
                        data-target="#viewModal"
                        onClick={(e) => {
                          setOrderContent(item.Order_Contents);
                        }}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      {item.Completed === 0 ? (
                        <label> Pending</label>
                      ) : (
                        <label> Completed</label>
                      )}
                    </td>
                    <td>{item.Customer_Name}</td>
                    <td>${item.Total}</td>
                    <td>
                      {item.Driver_ID !== 0 ? (
                        driversList
                          .filter((driver) => driver.ID === item.Driver_ID)
                          .map((d1) => d1.Name)
                      ) : (
                        <>
                          {item.Driver_ID}
                          <i
                            className="fas fa-edit assign-driver-icon ml-3 h4"
                            data-toggle="modal"
                            data-target="#assignModal"
                            onClick={(e) => {
                              setClickedOrderIDAssignDriver(item.ID);
                            }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <br /> <br />
          <h4 className="owner-heading text-center">
            {' '}
            Waiting to recieve orders...
          </h4>
        </>
      )}
      {/* View Modal */}
      <div
        className="modal fade"
        id="viewModal"
        tabIndex="-1"
        role="dialog"
        data-dismiss="modal"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">
                Ordered Items
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{orderContent}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Driver Modal */}
      <div
        className="modal fade pb-5"
        id="assignModal"
        tabIndex="-1"
        role="dialog"
        data-dismiss="modal"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">
                Assign to Driver
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <select
                className="custom-select"
                id="inlineFormCustomSelect"
                value={selectedDriverName}
                defaultValue={''}
                onChange={(e) => setSelectedDriverName(e.target.value)}
                required
              >
                <option value="" disabled>
                  Assign to a Driver...
                </option>
                {driversList.map((driver, i) => (
                  <option value={driver.Name} key={i}>
                    {driver.Name}
                  </option>
                ))}
              </select>
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn save-btn btn-lg btn-block primary-color text-center mt-5 w-25"
                  data-dismiss="modal"
                  onClick={handleAssignDriver}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerOrderHistory;
