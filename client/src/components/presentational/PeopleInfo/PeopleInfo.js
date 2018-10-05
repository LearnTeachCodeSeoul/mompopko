import React from "react";
import Person from "../Person/Person";
import PeopleInfoStyle from "../../../styles/presentational/PeopleInfoStyle";

class PeopleInfo extends React.Component {
  render() {
    const person = this.props.person;
    const subImgURLs = person.subImgURLs.map((url, index) => {
      return <img src={url} key={index} />;
    });

    return (
      <PeopleInfoStyle>
        <div className="image-slider">{subImgURLs}</div>
        <div className="profile-box-container">
          <ul className="profile-box">
            <li>
              <h5>Occupation</h5>
              <span>{person.occupation}</span>
            </li>
            <li>
              <h5>Affiliated Business</h5>
              <span>{person.business}</span>
            </li>
            <li>
              <h5>Location</h5>
              <span>{person.location}</span>
            </li>
            <li>
              <h5>Category</h5>
              <span>{person.category}</span>
            </li>
            <li>
              <h5>Started</h5>
              <span>{person.started}</span>
            </li>
            <li>
              <h5>URL</h5>
              <ul>
                <li />
                <li />
                <li />
                <li />
              </ul>
            </li>
            <li>
              <h5>Address</h5>
              <div>{person.address}</div>
            </li>
          </ul>
        </div>
      </PeopleInfoStyle>
    );
  }
}

export default PeopleInfo;
