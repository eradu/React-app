import React from "react";
import { Link } from "react-router-dom";
import { serviceItems } from "../data/services/serviceItems";





const WebServices = () => {
  return (
    <section className="service-section">
      <div className="service">
        {serviceItems.map((item, index) => {
          return (
            <div className="service-item" key={index}>
              <Link to={item.url} className="service-link">
                <div className="service-icon">
                  
                </div>
                <div className="service-description">
                  <div className="service-title">{item.title}</div>
                  <p className="service-text">{item.text}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WebServices;
