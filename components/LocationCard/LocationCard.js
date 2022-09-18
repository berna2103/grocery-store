import React from 'react'

export default function LocationCard({store}) {
  return (
    <div className={`col-lg-4 col-md-4 col-sm-6 mt-2`}>
    <div
      key={store.sys.id}
      className={`card text-center bg-light shadow`}
    >
      {/* <img src="..." className={`card-img-top`} alt="card "/> */}
      <div key={store.id} className={`card-body`}>
        <img
          className={`card-img-top`}
          src={store.fields.locationImage.fields.file.url}
          alt={store.fields.locationImage.fields.title}
        ></img>
        <p className={`card-titl pt-2 text-danger lead`}>
          {store.fields.storeName}
        </p>
        <a
          href={`/locations/${store.sys.id}`}
          className="stretched-link"
        ></a>
        <hr></hr>
        <p className={`card-text mt-2`}>
          {store.fields.phoneNumber}
        </p>
        <p className={`card-text text-muted`}>
          {store.fields.address.street}
        </p>
        <p className={`card-text text-muted`}>
          <span>{store.fields.address.city} </span>
          <span>{store.fields.address.state},</span>
          <span> {store.fields.address.zipcode}</span>
        </p>
      </div>
    </div>
  </div>
  )
}
