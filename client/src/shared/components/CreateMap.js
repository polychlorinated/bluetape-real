import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';

import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import Geocoder from './Geocoder';

const CreateMap = (props) => {
  const mapRef = useRef();
  // const [props.lnglat, props.setLngLat] = useState();
  const [location, setLocation] = useState();

  const getLoc = async () => {
    if (props.lnglat && !location && props.type !== 'projectCreate') {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.lnglat.lng},${props.lnglat.lat}.json?access_token=pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww`
      );
      setLocation(response.data.features[0].place_name);
    }
    if (!props.lnglat && props.type === 'projectCreate') {
      const response = axios
        .get(
          'https://geolocation-db.com/json/0bf34a90-393f-11ed-92e1-11df89e55a41'
        )
        .then((response) => {
          if (!props.lnglat) {
            getLocation(response.data.longitude, response.data.latitude);
            props.setLngLat({
              lng: response.data.longitude,
              lat: response.data.latitude,
              isRandom: true,
            });
          }
        });
      //   .finally((data) => {

      //   });
    }
  };

  getLoc();

  const getLocation = async (lng, lat) => {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww`
    );
    setLocation(response.data.features[0].place_name);
  };
  if (props.lnglat) {
    return (
      <div
        style={{ width: '100%', height: '20rem', borderRadius: '20px' }}
        className="mapShow__container"
      >
        <ReactMapGL
          style={{ height: '85%' }}
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww"
          initialViewState={{
            longitude:
              typeof props.lnglat.lng === 'string'
                ? props.lnglat.lng
                : `${props.lnglat.lng}`,
            latitude:
              typeof props.lnglat.lat === 'string'
                ? props.lnglat.lat
                : `${props.lnglat.lat}`,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker
            longitude={
              typeof props.lnglat.lng === 'string'
                ? props.lnglat.lng
                : `${props.lnglat.lng}`
            }
            latitude={
              typeof props.lnglat.lat === 'string'
                ? props.lnglat.lat
                : `${props.lnglat.lat}`
            }
            draggable
            onDragEnd={(e) => {
              props.setLngLat({
                lng: e.lngLat.lng,
                lat: e.lngLat.lat,
                isRandom: false,
              });
              getLocation(e.lngLat.lng, e.lngLat.lat);
            }}
          />
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => {
              getLocation(e.coords.longitude, e.coords.latitude);
              props.setLngLat({
                lng: e.coords.longitude,
                lat: e.coords.latitude,
                isRandom: false,
              });
            }}
          />
          <Geocoder
            setLngLat={props.setLngLat}
            location={location}
            setLocation={setLocation}
            getLocation={getLocation}
          />
        </ReactMapGL>

        <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          {props.lnglat.isRandom ? (
            <b style={{ color: 'red' }}>{`Not Specified!`}</b>
          ) : (
            <React.Fragment>
              <b>{`Location: `}</b>
              <i>{` ${location ? location : 'Not Specified!'}`}</i>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  } else return <div>Loading....</div>;
};

export default CreateMap;
