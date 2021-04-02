import React from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';     // For Google Maps
// import config from '../config';                                                // For Google Maps
import '../assets/css/vphome.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const searchResults = useSelector(
    (state) => state.searchReducer.searchResults
  );
  const noResult = useSelector((state) => state.searchReducer.noResult);

  // For Google Maps
  // const { loadError } = useLoadScript({
  //   googleMapsApiKey: config.googleAPI,
  // });

  return (
    <div>
      <div className="container searchresults">
        <br />
        <div className="row">
          <div className="mx-auto">
            {/* Search Results */}
            <br />
            <div>
              {searchResults.map((item, i) => (
                <div key={i} className="vp-search-result">
                  <div
                    className="card vp-card vp-shadow container"
                    style={{ marginBottom: '30px' }}
                  >
                    <div style={{ display: 'flex' }}>
                      <img
                        src={
                          'data:image/jpeg;base64,' +
                          new Buffer(item.Small_Pic).toString('base64')
                        }
                        alt=""
                        width="300px"
                        height="200px"
                      />
                      <img
                        src={
                          'data:image/jpeg;base64,' +
                          new Buffer(item.Large_Pic).toString('base64')
                        }
                        alt=""
                        width="300px"
                        height="200px"
                      />
                      {/* Google Maps removed for now */}
                      {/* <GoogleMap
                        mapContainerStyle={{ height: '250px', width: '400px' }}
                        zoom={17}
                        center={{ lat: item.Lat, lng: item.Lng }}
                        options={{
                          streetViewControl: false,
                          mapTypeControl: false,
                        }}
                      >
                        <Marker position={{ lat: item.Lat, lng: item.Lng }} />
                      </GoogleMap> 
                      {loadError && (
                        <p>Map cannot be displayed at this time.</p>
                      )}
                      */}
                    </div>
                    <h5
                      className="text-align-left"
                      style={{ paddingTop: '10px' }}
                    >
                      <strong>{item.Name}</strong>
                      <br />
                    </h5>
                    <div style={{ display: '' }}>
                      <p style={{ padding: '0px', color: 'grey' }}>
                        {item.Price_Level} • {item.Cuisine}, {item.Tags}
                        <p
                          className="float-right"
                          style={{ paddingRight: '2px' }}
                        >
                          Free Delivery
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {noResult}
              {noResult && (
                <div>
                  <br />
                  <Link to="/" style={{ textDecoration: 'none' }}>
                    <h5 className="text-center">
                      <i class="fas fa-chevron-left h6 "></i> Back
                    </h5>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
