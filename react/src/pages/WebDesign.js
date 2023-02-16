import React from 'react';

import WebBlog from '../components/WebBlog';
import WebCallToAction from '../components/WebCallToAction';
import WebFeaturedProd from '../components/WebFeaturedProd';
import WebFirstSection from '../components/WebFirstSection';
import WebFooter from '../components/WebFooter';
import WebNavbar from '../components/WebNavbar';
import WebNewsletter from '../components/WebNewsletter';
import WebPromo from '../components/WebPromo';
import WebServices from '../components/WebServices';

import WebStickyNavbar from '../components/WebStickyNavbar';
import WebTopProd from '../components/WebTopProd';

import '../scss/index.scss'

const WebDesign = () => {
  return (
    <div className='web-container'>
      <WebNavbar/>
      <WebFirstSection/>
      <WebServices/>
      <WebFeaturedProd/>
      <WebCallToAction/>
      <WebTopProd/>
      <WebBlog/>
      <WebNewsletter/>
      <WebPromo/>
      <WebFooter/>
      <WebStickyNavbar/>
    </div>
  )
}

export default WebDesign

