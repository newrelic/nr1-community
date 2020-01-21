import React from 'react';
import PropTypes from 'prop-types';

export default class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }

  render() {
    return (
      <div className="secondary-nav-container">
        <h6 className="secondary-nav-container-header">On this page</h6>
        <ul className="secondary-nav">
          <li className="secondary-nav-item active">
            <a href="#">Examples</a>
            <ul className="secondary-nav-level-2">
              <li className="secondary-nav-item secondary-nav-level-2-item">
                <a href="#">Basic</a>
              </li>
              <li className="secondary-nav-item secondary-nav-level-2-item">
                <a href="#">More advanced example</a>
              </li>
              <li className="secondary-nav-item secondary-nav-level-2-item">
                <a href="#">With all of the props available</a>
              </li>
            </ul>
          </li>
          <li className="secondary-nav-item">
            <a href="#">Description</a>
          </li>
          <li className="secondary-nav-item">
            <a href="#">Installation</a>
          </li>
          <li className="secondary-nav-item">
            <a href="#">Usage</a>
          </li>
          <li className="secondary-nav-item">
            <a href="#">Properties</a>
          </li>
        </ul>
      </div>
    );
  }
}
