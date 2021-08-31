import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

var countryname = [];

class App extends React.Component {
  constructor() {
    super();
    this.changeSuggestions = this.changeSuggestions.bind(this);
    this.optionClicked = this.optionClicked.bind(this);
    this.searchCountries = this.searchCountries.bind(this);

    this.state = {
      country: [],
      filteredCountry: [],
      selectedCountry: "india",
      countryDetails: [],
    };
  }
  componentDidMount() {
    this.getApi();
  }

  async getApi() {
    try {
      var countriesList = await fetch("https://restcountries.eu/rest/v2/all");
      var countryData = await countriesList.json();

      //get the list of countries and store it in setstate
      var countryCount = countryData.length;
      //console.log(countryCount);

      for (var i = 0; i < countryCount; i++) {
        countryname[i] = countryData[i].name;
        //console.log(countryname[i]);
      }

      this.setState({
        country: countryname,
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  //function which suggest users when they type
  changeSuggestions(event) {
    //console.log(event.target.value);
    var val = event.target.value;
    var filteredCountrname = [];
    var tempCount = 0;
    //console.log(val.length);

    //based on input filter the list and make it as list

    if (event.target.value !== "") {
      for (var i = 0; i < countryname.length; i++) {
        if (
          countryname[i].substr(0, val.length).toUpperCase() ===
          val.toUpperCase()
        ) {
          filteredCountrname[tempCount] = countryname[i];
          tempCount++;
          //console.log(countryname[i]);
        }
      }
      this.setState({
        filteredCountry: filteredCountrname,
      });
    } else {
      filteredCountrname = [];
      this.setState({
        filteredCountry: filteredCountrname,
      });
    }

    //console.log(filteredCountrname);
  }

  //function to fill textbox when option is selected from drop down
  optionClicked(event) {
    var countryNames = [];
    console.log(event.target.value);
    document.getElementById("inputid").value = event.target.value;
    this.setState({
      filteredCountry: countryNames,
    });
  }

  //function which sends country name when submit btn is clicked
  searchCountries = async (event) => {
    var country = document.getElementById("inputid").value;

    if(country!=null){
    this.setState({
      countryDetails: "countryData",
    });
    console.log(country);
    var countryDetailsApi = await fetch(
      `https://restcountries.eu/rest/v2/name/${country}?fullText=true`
    );
    var countryData = await countryDetailsApi.json();

    this.setState({
      countryDetails: countryData,
    });

    //console.log(this.state.countryDetails[0]);
  }
  };

  render() {
    let comp;

    if (this.state.countryDetails.length) {
      comp = (
        <div className="container">
          <br />
          <br />
          <div className="row">
            <div className="col-4">
              <h4>Country</h4>
              <div className="row,col">{this.state.countryDetails[0].name}</div>
            </div>
            <div className="col-4">
              <h4>capital</h4>
              <div className="row,col">
                {this.state.countryDetails[0].capital}
              </div>
            </div>
            <div className="col-4">
              <h4>Native Name</h4>
              <div className="row,col">
                {this.state.countryDetails[0].nativeName}
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-4">
              <h4>Continent</h4>
              <div className="row,col">
                <br />
                {this.state.countryDetails[0].region}
              </div>
            </div>
            <div className="col-4">
              <h4>Flag</h4>
              <div className="row,col">
                <br />
                <img
                  className="flag"
                  src={this.state.countryDetails[0].flag}
                  alt="image"
                  width="50"
                  height="50"
                />
              </div>
            </div>
            <div className="col-4">
              <h4>Population</h4>
              <div className="row,col">
                <br />
                {this.state.countryDetails[0].population}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      comp = <h1></h1>;
    }
    return (
      <div className="form-group">
        <center class = "heading">
          <h2>Country Details</h2>
        </center>
        <div id="parent" className="input-group mb-3">
          <input
            id="inputid"
            placeholder="Search Countries"
            type="text"
            className="form-control"
            onChange={this.changeSuggestions}
            value={this.state.value}
          ></input>
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={() =>
                this.searchCountries(document.getElementById("inputid").value)
              }
            >
              Search
            </button>
          </div>
        </div>

        <ul className="list-group">
          {this.state.filteredCountry ?
          this.state.filteredCountry.map((optn, id) => (
            <button
              onClick={this.optionClicked}
              value={optn}
              id={id}
              type="button"
              className="list-group-item"
            >
              {optn}
            </button>
          )):<h2></h2>}
        </ul>

        {comp}
      </div>
    );
  }
}

export default App;
