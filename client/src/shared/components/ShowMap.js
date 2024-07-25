import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import axios from 'axios';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';

const ShowMap = (props) => {
  const mapRef = useRef();
  const [lnglat, setLngLat] = useState();
  const [location, setLocation] = useState();
  useEffect(() => {
    setLngLat({ lng: props.longitude, lat: props.latitude });
    getLocation(props.longitude, props.latitude);
  }, []);
  const getLocation = async (lng, lat) => {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoidW1lcm5pc2FyIiwiYSI6ImNrc3g3bXhpbzE0cWgydXQ3NHlkcGk4dDAifQ.AbnGi15rgLvZOahIz-M9Ww`
    );
    setLocation(response.data.features[0].place_name);
  };
  if (lnglat) {
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
            longitude: lnglat.lng,
            latitude: lnglat.lat,
            zoom: 8,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <Marker longitude={lnglat.lng} latitude={lnglat.lat} />
          <NavigationControl position="bottom-right" />
          <GeolocateControl
            position="top-left"
            trackUserLocation
            onGeolocate={(e) => {
              setLngLat({
                lng: e.coords.longitude,
                lat: e.coords.latitude,
              });
              getLocation(e.coords.longitude, e.coords.latitude);
            }}
          />
        </ReactMapGL>
        <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <b>{`Location: `}</b>
          {props.isRandom ? (
            <b style={{ color: 'red' }}>
              {`Was not specified during creation!`}
            </b>
          ) : (
            <i>{` ${location ? location : 'Not Specified!'}`}</i>
          )}
        </div>
      </div>
    );
  } else return <div>Loading....</div>;
};

export default ShowMap;
//  <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>

//           {' '}
//           <b>{`Location: `}</b>
//           <i>{` ${location}`}</i>
//           <b style={{ color: 'red' }}>
//             {!props.isRandom
//               ? 'Location was not specified during creation!'
//               : ''}
//           </b>
//         </div>
