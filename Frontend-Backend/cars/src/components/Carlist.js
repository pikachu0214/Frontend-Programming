import React, { Component } from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';




class Carlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      open: false,

    };
  }
  componentDidMount() {
   this.listCars();
  }
 

  handleClose = () => {
    this.setState({ showSnack: false });
  };

  listCars = () => {
      fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(responseData => {
        this.setState({ cars: responseData._embedded.cars })
      })
  }

  // Delete a car
  deleteCar = (link) => {
      //alert(link); this will alert the 
    fetch(link, {method: 'DELETE'})
    .then(response => {
        this.listCars();
        this.setState({showSnack: true})
    })
  }

  render() {
        const columns = [{
    Header: 'Brand',
    accessor: 'brand' // String-based value accessors!
  }, {
    Header: 'Model',
    accessor: 'model'
  }, {
    Header: 'Color',
    accessor: 'color'
  }, {
    Header: 'fuel',
    accessor: 'fuel'
  }, {
    Header: 'Year',
    accessor: 'year'
  }, {
    Header: 'Price (£)',
    accessor: 'price'
  }, {
    Header: '',
    accessor: '_links.self.href',
    Cell: ({value}) => (<Tooltip title="Delete" placement="right-end"><IconButton aria-label="Delete" onClick={() => this.deleteCar(value)}> <DeleteIcon /> </IconButton></Tooltip>)
  }]
    return <div>
        <ReactTable   defaultPageSize={15} filterable={true}
 data={this.state.cars} columns={columns} />
    <Snackbar message={'Car deleted'} autoHideDuration={3000} open={this.state.showSnack} onClose={this.handleClose} />
      </div>;
  }
}

export default Carlist;
