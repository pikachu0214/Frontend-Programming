import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        return <div>
            <div className="card text-left">
              <div className="card-header">Featured</div>
              <div className="card-body">
                <h5 className="card-title">Special Promotion</h5>
                <p className="card-text">
                  <strong>Join today for free membership consultation.</strong>
                </p>
              </div>
              <div className="card-footer text-muted"><strong>Free 1 day training</strong></div>
            </div>
          </div>;
    }
}

