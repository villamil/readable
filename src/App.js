import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DownwardArrow from 'material-ui/svg-icons/navigation/arrow-downward';


class App extends Component {
  state = {

  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="Readable" titleStyle={{ marginLeft: "380px" }} showMenuIconButton={false} />
        <SelectField
          floatingLabelText="Category"
          value={this.state.value}
          onChange={this.handleChange}
          style={{marginLeft: "985px"}}
        >
          <MenuItem value={1} primaryText="React" />
          <MenuItem value={2} primaryText="Redux" />
          <MenuItem value={3} primaryText="Udacity" />
        </SelectField>
        <Table fixedHeader={false} style={{ width: "auto", tableLayout: "auto", marginLeft: "400px" }}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow>
              <TableHeaderColumn style={{ width: "500px" }}>Topic</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Author</TableHeaderColumn>
              <TableHeaderColumn><button>Votes</button></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            <TableRow>
              <TableRowColumn style={{ width: "500px" }}>Udacity is the best place to learn React</TableRowColumn>
              <TableRowColumn>React</TableRowColumn>
              <TableRowColumn>Luis Villamil</TableRowColumn>
              <TableRowColumn>6</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </MuiThemeProvider>
    );
  }
}

export default App;
