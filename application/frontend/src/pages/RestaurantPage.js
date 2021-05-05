/*
Summary of RestaurantPage.js: 
 - Renders on '/restaurantpage'
 - to load when the restaurant item is clicked
 - Components: Google Map, Add Menu items Modal, Banner Image, Menu Items
*/
import React, { useState, useEffect } from 'react';
import '../assets/css/restaurant_page.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Banner from '../assets/img/restaurant/banner.jpg';
import Banner from '../assets/img/restaurant/Restaurant_Banner.jpg';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import config from '../config.js';
import Pizza from '../assets/img/cuisines/Pizza.png';

const RestaurantPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [addIdClicked, setAddIdClicked] = useState(1);

  const { clickedRestaurantName } = useParams();

  const restaurantsList = useSelector(
    (state) => state.searchReducer.allRestaurants
  );
  const currentRestaurant = restaurantsList.filter(
    (restaurant) => restaurant.Name.trim() === clickedRestaurantName.trim()
  );
  useEffect(() => {
    setMenuItems([
      {
        itemID: 1,
        itemName: 'Cheese Pizza',
        itemCalories: '(700-1180 Cal.)',
        itemPrice: '$11.99',
        itemCount: 1,
        itemComments: '',
      },
      {
        itemID: 2,
        itemName: 'Pepporoni Pizza',
        itemCalories: '(900-1210 Cal.)',
        itemPrice: '$12.99',
        itemCount: 1,
        itemComments: '',
      },
      {
        itemID: 3,
        itemName: 'Wings',
        itemCalories: '(500-950 Cal.)',
        itemPrice: '$8.99',
        itemCount: 1,
        itemComments: '',
      },
      {
        itemID: 4,
        itemName: 'Breadsticks',
        itemCalories: '(200-420 Cal.)',
        itemPrice: '$6.99',
        itemCount: 1,
        itemComments: '',
      },
    ]);
  }, []);

  //Google Map
  const center = {
    lat: 37.7234,
    lng: -122.481,
  };

  function MyMap() {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: config.googleAPI,
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
      setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null);
    }, []);

    return isLoaded ? (
      <GoogleMap
        mapContainerStyle={{ height: '270px', width: '350px' }}
        zoom={17}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        <Marker position={{ lat: 37.7234, lng: -122.481 }} />
      </GoogleMap>
    ) : (
      <></>
    );
  } //end of MyMap function

  return (
    <div className="container-fluid">
      <div className="container">
        <img className="w-100 restaurantBanner" src={Banner} alt="Banner" />
        <div className="m-4 d-flex justify-content-around flex-wrap">
          {currentRestaurant.map((item, i) => (
            <div className="m-2" key={i}>
              <div className="pl-1">
                <p className="primaryTextPage h1">{item.Name}</p>
                <mark className="font-weight-bold"> COVID-19 Safe </mark>
                <span className="openTag">OPEN </span>
                <p className="text-muted mt-2">
                  {item.Price_Level} • {item.Cuisine} <br />
                  {item.Tags} <br />
                  {item.Address} <br />
                </p>
              </div>
              <div className="rp-info secondaryTextPage">
                <table height="90px" className="mx-auto">
                  <tbody>
                    <tr>
                      <td className="align-middle primaryTextPage">
                        <p>
                          $1.99 <br /> delivery fee
                        </p>
                      </td>
                      <td className="align-middle p-3 primaryTextPage">
                        <p>
                          18-24 <br /> minutes
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          <div className="m-2 restaurant-home-map">
            <MyMap></MyMap>
          </div>
        </div>
      </div>

      <hr />

      <div className="container text-center">
        <div className="m-4 ">
          <img src={Pizza} alt="logo" height="55" className="rounded" />
          <h4 className="text-center pb-3 pt-3">Choose from the Menu below</h4>
          <div className="d-flex justify-content-around flex-wrap">
            {menuItems.map((item, i) => (
              <div key={i} className="card rp-item p-3 m-2">
                <p>
                  <strong>{item.itemName}</strong>
                  <br />
                  <span className="text-muted">{item.itemCalories}</span>
                  <br />
                  <span>{item.itemPrice}</span>
                </p>
                <i
                  className="fas fa-cart-plus h4 mt-2 add-cart-icon"
                  data-toggle="modal"
                  data-target="#modalCenter"
                  onClick={() => setAddIdClicked(item.itemID)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade modal-div"
        id="modalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalCenterTitle"
        aria-hidden="true"
      >
        {menuItems
          .filter((item1) => item1.itemID === addIdClicked)
          .map((item, i) => (
            <div
              className="modal-dialog modal-dialog-centered"
              role="document"
              key={i}
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="modalLongTitle">
                    {item.itemName}
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
                  <span className="text-muted">{item.itemCalories}</span>
                  <p className="m-3">Comments</p>
                  <div className="text-center">
                    <textarea cols="45" rows="3"></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <div className="mr-auto">
                    <i
                      className="fa fa-minus mr-2 add-remove-icons"
                      aria-hidden="true"
                      onClick={(e) => {
                        let temp = [...menuItems];
                        let temp_element = { ...temp[item.itemID - 1] };
                        if (item.itemCount >= 2) {
                          temp_element.itemCount = item.itemCount - 1;
                        }
                        temp[item.itemID - 1] = temp_element;
                        setMenuItems(temp);
                      }}
                    />
                    <span className="m-1 px-2 h5 rounded bg-warning">
                      {item.itemCount}
                    </span>
                    <i
                      className="fa fa-plus ml-2  add-remove-icons"
                      aria-hidden="true"
                      onClick={(e) => {
                        let temp = [...menuItems];
                        let temp_element = { ...temp[item.itemID - 1] };
                        if (item.itemCount < 9) {
                          temp_element.itemCount = item.itemCount + 1;
                        }
                        temp[item.itemID - 1] = temp_element;
                        setMenuItems(temp);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn primary-color-bg text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RestaurantPage;
