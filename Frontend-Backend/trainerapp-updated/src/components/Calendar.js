import React, { Component } from "react";
import Header from "./HomePageFile/Header";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import CalendarHeader from "./CalendarFile/CalendarHeader";

const localizer = BigCalendar.momentLocalizer(moment);
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

export default class Calendar extends Component {
  state = { trainings: [] };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          trainings: responseData
        });
      });
  };

  render() {
    return (
      <div className="container-fluid">
        {/* NavBar */}
        <Header />

        {/* Header */}
        <CalendarHeader />

        {/* Body */}
        <div className="container">
          <BigCalendar
            style={{ height: 500, width: 1000 }}
            events={this.state.trainings}
            views={allViews}
            step={60}
            showMultiDayTimes
            startAccessor={events => {
              return moment(events.date).toDate();
            }}
            endAccessor={events => {
              return moment(events.date)
                .add(events.duration, "minutes")
                .toDate();
            }}
            titleAccessor={events => {
              return events.activity;
            }}
            localizer={localizer}
          />
        </div>
      </div>
    );
  }
}
