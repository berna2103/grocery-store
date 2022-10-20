import React, { useState } from "react";

export default function Dropdown(props) {
  const [latitude, setLatitude] = useState();
  const [longitud, setLongitud] = useState();

  const list = props.list;

  const getGeolocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitud(position.coords.longitude);
    });
  };

  return (
    <div className="dropdown mt-3">
      <button
        className="btn btn-outline-danger dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Select store
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {list.map((item) =>
          item.locations.map((location) => (
            <li key={location.sys.id}>
              <a onClick={getGeolocation} className={`dropdown-item`}>{location.fields.storeName}</a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
