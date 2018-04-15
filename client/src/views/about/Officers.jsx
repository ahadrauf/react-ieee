import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import memberImage from '../../assets/members.jpg';
const officerData = require('./OfficerList.json');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function tryAndDefault(team, str) {
  try {
    console.log()
    return require('../../assets/officers/' + team + '/' + str);
  } catch(err) {
    return require('../../assets/officers/' + 'missing.png');
  }
}

class About extends Component {
  currentCommittee;
  constructor() {
    super();
    this.currentCommittee = 3;
    this.committeeDict = {
      "3": "Exec",
      "1": "Activities",
      "2": "Hope",
      "4": "Indrel",
      "6": "Prodev",
      "7": "Techops",
      "8": "Website",
      "9": "Micromouse",
      "0": "Photography"
    }
  }

  changeView(committee) {
    if (this.currentCommittee == committee) {
      return;
    }

    var liList = document.getElementsByClassName('committee-list')[0].getElementsByTagName("li");

    for (var i in liList) {
      var li = liList[i];
      if (li.attributes === undefined) {
        continue;
      } else {
        var currVal = parseInt(li.attributes[0].value);
        if (currVal == this.currentCommittee) {
          li.getElementsByTagName('div')[0].style['display'] = 'none';
        }
      }
    }

    for (var i in liList) {
      var li = liList[i];
      if (li.attributes === undefined) {
        continue;
      } else {
        var currVal = parseInt(li.attributes[0].value);
        if (currVal == committee) {
          this.currentCommittee = committee;
          li.getElementsByTagName('div')[0].style['display'] = 'block';
          this.updateFaces();
        }
      }
    }
  }

  updateFaces() {
    let key = "" + this.currentCommittee;

    let grid = document.getElementById("face-grid");

    if (key in this.committeeDict && this.committeeDict[key] in officerData) {
      let people = officerData[this.committeeDict[key]];


      while (grid.children.length > 0) {
        grid.children[0].remove();
      }

      for (let i = 0; i < people.length; i++) {
        let key = Object.keys(people[i])[0];
        let val = Object.values(people[i])[0];
        let name = val.replaceAll(" ", "_");
        let imgPath = name.toLowerCase() + ".jpg";

        let div = document.createElement("div");
        div.classList = "officer-container cboxElement";
        let tileImg = document.createElement("div");
        tileImg.classList = "tile";
        let img = document.createElement("img");

        img.setAttribute('src', tryAndDefault(this.committeeDict[this.currentCommittee], imgPath));
        tileImg.appendChild(img);
        div.appendChild(tileImg);


        let tileName = document.createElement("div");
        tileName.classList = "tile salutation"

        let nameSpan = document.createElement("span")
        nameSpan.innerHTML = val;
        let rankSpan = document.createElement("span");
        rankSpan.innerHTML = key;

        let tileNameDiv = document.createElement("div");
        tileNameDiv.classList = "left-align";
        tileNameDiv.appendChild(nameSpan);
        tileNameDiv.appendChild(rankSpan);
        tileName.appendChild(tileNameDiv);
        div.appendChild(tileName);

        grid.appendChild(div);
      }
    }
  }

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
        <div className="content">
          <div className="left">
            <div id="face-grid"
              style={{ display: "block" }}>
              <div className="officer-container cboxElement">
                <div className="tile"><img src={tryAndDefault("Exec", "neeli_tummala.jpg")} /></div>
                <div className="tile salutation">
                  <div className="left-align"><span>Neeli Tummala</span><span className="rank">Chair</span></div>
                </div>
              </div>
              <div className="officer-container cboxElement">
                <div className="tile"><img src={tryAndDefault("Exec", "andrew_chan.jpg")} /></div>
                <div className="tile salutation">
                  <div className="left-align"><span>Andrew Chan</span><span className="rank">External V.P.</span></div>
                </div>
              </div>
              <div className="officer-container cboxElement">
                <div className="tile"><img src={tryAndDefault("Exec", "alex_kumamoto.jpg")} /></div>
                <div className="tile salutation">
                  <div className="right-align"><span>Alex Kumamoto</span><span className="rank">Internal V.P.</span></div>
                </div>
              </div>
              <div className="officer-container cboxElement">
                <div className="tile"><img src={tryAndDefault("Exec", "benjamin_li.jpg")} /></div>
                <div className="tile salutation">
                  <div className="right-align"><span>Benjamin Li</span><span className="rank">Treasurer</span></div>
                </div>
              </div>
              <div className="officer-container cboxElement">
                <div className="tile"><img src={tryAndDefault("Exec", "kevin_ma.jpg")} /></div>
                <div className="tile salutation">
                  <div className="left-align"><span>Kevin Ma</span><span className="rank">Secretary</span></div>
                </div>
              </div>
              <div className="officer-container cboxElement">
                <div className="tile"><img src={tryAndDefault("Exec", "rob_thalanki.jpg")} /></div>
                <div className="tile salutation">
                  <div className="left-align"><span>Rob Thalanki</span><span className="rank">Treasury Intern</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <span className="heading blue">Leadership</span>
            <br />
            <br />
            <ul className="committee-list ui-accordion ui-widget ui-helper-reset" role="tablist">
            <li data-committee_id="3">
              <span onClick={(e) => this.changeView(3, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-accordion-header-active ui-state-active ui-corner-top ui-accordion-icons" id="execs" role="tab" aria-controls="ui-accordion-1-panel-0" aria-selected="true" tabIndex="0"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>
              Executives
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" id="ui-accordion-1-panel-0" aria-labelledby="execs" role="tabpanel" style={{display: "block"}} aria-expanded="true" aria-hidden="false">
              <p>
              The Executive officers oversee club affairs, initiate and maintain relations with external and internal parties, manage finances, and lead large events.
              </p>
              </div>
            </li>
            <li data-committee_id="1">
              <span onClick={(e) => this.changeView(1, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-1" aria-controls="ui-accordion-1-panel-1" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Activities
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-1" aria-labelledby="ui-accordion-1-header-1" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              The Activities committee provides social support for the EECS community by planning and organizing social events.
              </p>
              </div>
            </li>
            <li data-committee_id="2">
              <span onClick={(e) => this.changeView(2, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-2" aria-controls="ui-accordion-1-panel-2" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              H.O.P.E.
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-2" aria-labelledby="ui-accordion-1-header-2" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              HOPE serves as the backbone for developing and facilitating our IEEE Hands on Practical Electronics DeCal, a fun and interactive course to introduce electrical engineering fundamentals to non-EECS students. HOPE is one of our most popular student services, garnering strong support from both the EECS department and IEEE National.
              </p>
              </div>
            </li>
            <li data-committee_id="4">
              <span onClick={(e) => this.changeView(4, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-3" aria-controls="ui-accordion-1-panel-3" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Industrial Relations
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-3" aria-labelledby="ui-accordion-1-header-3" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              The Industrial Relations committee is responsible for communicating and interfacing with external organizations and companies. Officers personally interact and cooperate with company representatives and help host infosessions, tech-talks, the biannual Startup Fair, and other industry events that are beneficial to the EECS student body.
              </p>
              </div>
            </li>
            <li data-committee_id="9">
              <span onClick={(e) => this.changeView(9, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-5" aria-controls="ui-accordion-1-panel-5" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Micromouse
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-5" aria-labelledby="ui-accordion-1-header-5" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              Micromouse serves as the backbone for developing our decal around creating an autonomous mouse used to navigate a maze.
              </p>
              </div>
            </li>
            <li data-committee_id="6">
              <span onClick={(e) => this.changeView(6, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-6" aria-controls="ui-accordion-1-panel-6" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Professional Development
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-6" aria-labelledby="ui-accordion-1-header-6" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              The Professional Development committee coordinates with innovators from academia and cooperates with other organizations to bring professional awarness to the EECS community. They host internship and research workshops, undergraduate-graduate student mixers, and national IEEE-sponsored events (SPAC &amp; SPAV).
              </p>
              </div>
            </li>
            <li data-committee_id="7">
              <span onClick={(e) => this.changeView(7, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-7" aria-controls="ui-accordion-1-panel-7" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Technical Operations
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-7" aria-labelledby="ui-accordion-1-header-7" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              Our student branch hosts several computers and servers inside our very own lab, which also houses an open lab bench for soldering, making PCB's, and any other electrical engineering related task. The Tech-Ops committee resolves all technical issues in the IEEE lab and maintains the full availability of these services for the EECS community.
              </p>
              </div>
            </li>
            <li data-committee_id="0">
              <span onClick={(e) => this.changeView(0, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-9" aria-controls="ui-accordion-1-panel-9" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Photography
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-9" aria-labelledby="ui-accordion-1-header-9" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              The Photography committee is in charge of taking photos at events and editing leadership portraits.
              </p>
              </div>
            </li>
            <li data-committee_id="8">
              <span onClick={(e) => this.changeView(8, e)} className="committee-name clickable ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-accordion-icons" role="tab" id="ui-accordion-1-header-8" aria-controls="ui-accordion-1-panel-8" aria-selected="false" tabIndex="-1"><span className="ui-accordion-header-icon ui-icon ui-icon-triangle-1-e"></span>
              Website
              </span>
              <div className="committee-description ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="ui-accordion-1-panel-8" aria-labelledby="ui-accordion-1-header-8" role="tabpanel" aria-expanded="false" aria-hidden="true" style={{display: "none"}}>
              <p>
              What do you think we do?
              </p>
              </div>
            </li>

            </ul>

          </div>
        </div>
      </div>
    );
  }
}

export default About;
