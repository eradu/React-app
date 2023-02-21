import React from 'react';
import { Link } from "react-router-dom";

import { BsCaretRight } from "react-icons/bs"

import WebSlider from './WebSlider';

function WebFirstSection() {
  return (
    <section className='slider-section'>
      <div className="container-slider">
        <div className="inner-section">
        <WebSlider/>
        <div className="images-section">
          <div className="upper-group-images-section">
            <div className="video-image">
              
              <img width="340" height="340" src="https://space.xtemos.com/demo/hitek/wp-content/uploads/sites/23/2020/01/vega-banner-bg-1.jpg" alt="" loading="lazy"  sizes="(max-width: 340px) 100vw, 340px"/>
              <div className="overlay">
                
              </div>
              <div className='video-control'><BsCaretRight/></div>
            </div>
            <div className="text-image">
              <img width="450" height="340" src="https://space.xtemos.com/demo/hitek/wp-content/uploads/sites/23/2020/01/vega-banner-bg-2.jpg" alt="" loading="lazy"  sizes="(max-width: 450px) 100vw, 450px"/>
              <div className="text-image-wrapper">
                <div className="text-image-content">
                  <h4>Wireless Headphone</h4>
                  <p className='description'>
                  The passage is attributed to an unknown typesetter in the 15th century.
                  </p>
                  <div className="text-image-button">
                  <Link to="/">
                    <span>Shop Now</span>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-image-section">
            <div className="text-image">
            <img width="810" height="420" src="https://space.xtemos.com/demo/hitek/wp-content/uploads/sites/23/2020/01/vega-banner-bg-3.jpg" alt="" loading="lazy"  sizes="(max-width: 810px) 100vw, 810px"/>
            <div className="text-image-wrapper">
                <div className="text-image-content">
                  <h4>Music Monster</h4>
                  <p className='description'>
                  Lasted answer oppose to ye months no esteem. Branched is on an ecstatic directly.
                  </p>
                  <div className="text-image-button">
                  <Link to="/">
                    <span>Shop Now</span>
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </section>
  )
}

export default WebFirstSection

