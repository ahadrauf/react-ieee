import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import memberImage from '../../assets/members.jpg';

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="hero"
        style={{ backgroundImage: "url(" + memberImage + ")" }}>
        </div>
        <div className="submenu">
        <ul>
        <Link to={"/about"}><li className="">About</li></Link>
        <Link to={"/about/leadership"}><li className="">Officers</li></Link>
        <Link to={"/about/contact"}><li className="">Contact</li></Link>
        </ul>
        </div>
        <div class='content'>
          <div class='left'>
            <span class='heading blue'>
            Contact Us
            <br /> 
            <br />
            </span>
            <p> Feel free to contact us through any of the platforms listed below. </p>
            <br />
            <p> Email: ieeeucb@gmail.com </p>
            <br />
            <p> Facebook Page: <a class="blue" href="https://www.facebook.com/ieeeucb/">https://www.facebook.com/ieeeucb/</a> </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;