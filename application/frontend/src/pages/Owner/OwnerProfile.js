import React from "react";
import restaurantcartoon from "../../assets/img/restaurant_ex.jpeg";
//import "../../index.css";
import axios from "axios";
import "../../assets/css/index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { setOwnerName } from "../../redux/actions/ownerSignupActions";

const OwnerProfile = () => {
  //dispatch is a function - sends actions to redux
  const dispatch = useDispatch();

  const [ownerInfo, setOwnerInfo] = useState([]);
  const [ownerEmail, setOwnerEmail] = useState([]);

  //restaurants from backend
  const restaurantsList = useSelector(
    (state) => state.searchReducer.allRestaurants
  );
  const currentRestaurant = restaurantsList.filter(
    (restaurant) => restaurant.Name.trim() === ('Taco Shell')
  );

  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/restaurant/owner-info", {
        params: { ownerEmail: "marshall.herrera@example.com" },
      })
      .then((res) => {
        setOwnerInfo(res.data);
        console.log(ownerInfo);
        setLoadData(false);
      });
    console.log(ownerInfo);
  },[loadData]);

  //extract value from global redux (reads from store)
  const ownerName = useSelector((state) => state.ownerSignupReducer.ownerName);
  return (
    <div className="container-fluid">
      <br />
      {currentRestaurant.map((item, index) => (
        <>
          <div className="text-center">
            <h3 className="owner-heading"> Profile </h3>
          </div>
          <div className="editprofile" key={index}>
            {/* content header */}
            <div className="border-bottom my-3 text-center">
              <div className="row text-left">
                <div class="col-7">
                  <label for="name">
                    {" "}
                    <h5>
                      <strong>{item.Name}</strong>
                    </h5>
                  </label>
                </div>
                <div class="col text-right">
                  <label for="name"> {item.Price_Level} •{" "}
                  {item.Cuisine}, {item.Tags}</label>
                </div>
              </div>
            </div>

            {/* content body */}
            {ownerInfo.map((ownerItem, i) => (
                          <div class="profile-content" key={i}>
                          <div class="row">
                            <div class="col">
                              <div class="row">
                                <div class="col">
                                  <label className="form-descrip">
                                    <strong>Restaurant Owner</strong>
                                  </label>
                                </div>
            
                                <div class="col">
                                  <label for="name"> {ownerItem.Name}</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label className="form-descrip">
                                    <strong>Contact</strong>
                                  </label>
                                </div>
                                <div class="col">
                                  <label for="phone">{ownerItem.Phone}</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label className="form-descrip">
                                    <strong>Email</strong>
                                  </label>
                                </div>
                                <div class="col">
                                  <label for="email">{ownerItem.Email}</label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label className="form-descrip">
                                    <strong>Restaurant Address</strong>
                                  </label>
                                </div>
                                <div class="col">
                                  <label for="address">
                                    {item.Address}
                                  </label>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col">
                                  <label className="form-descrip">
                                    <strong>Marketing Post</strong>
                                  </label>
                                </div>
                                <div class="col">
                                  <label for="marketing">Save $5 on first 5 orders! </label>
                                </div>
                              </div>
                            </div>
                            <div class="col-6">
                              <img
                                src={restaurantcartoon}
                                class="rounded img-thumbnail restImage"
                                alt="Restaurant Img"
                                width="300"
                              />
                            </div>
                          </div>
                          {/* edit icon */}
                          <br />
                          <div class="text-center">
                            <a className="edit-btn" href="/owner/editprofile">
                              <i className="far fa-edit " aria-hidden="true"></i> Edit{" "}
                            </a>
                          </div>
                        </div>

            ))}

          </div>
        </>
      ))}
    </div>
  );
};

export default OwnerProfile;
