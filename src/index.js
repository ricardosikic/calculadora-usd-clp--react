import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { string } from "prop-types";

class DolarFetch extends React.Component {
  constructor() {
    super();
    this.state = {
      valoresDolar: [],
      valorDolar: "",
      valorHoy: "",
      resultado: ""
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = () => {
    fetch("https://mindicador.cl/api/dolar")
      .then(resp => {
        console.log(resp.status);
        return resp.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          valoresDolar: data,
          valorHoy: data.serie[0].valor
        });
      });
  };

  handleData = e => {
    this.setState({
      valorDolar: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let dolar = this.state.valoresDolar.serie;

    for (let i = 0; i < dolar.length; i++) {
      if (i === 0) {
        const resu = this.state.valorDolar * dolar[i].valor;
        console.log(resu);
        this.setState({
          resultado:
            resu.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") +
            " pesos chilenos"
        });
      }
    }
  };

  render() {
    return (
      <Fragment>
        <div
          className="container"
          style={{
            marginTop: "50px",
            border: "0.5px lightgray solid",
            width: "400px"
          }}
        >
          <h2>Calculadora dolares a pesos</h2>
          <p>Ultimo valor dolar hoy en clp: {this.state.valorHoy}</p>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label>valor dolar</label>
            <input
              className="form-control"
              style={{ width: "200px" }}
              type="text"
              value={this.state.valorDolar}
              onChange={e => this.handleData(e)}
            />
            <button
              type="submit"
              style={{ marginTop: "10px" }}
              className="btn btn-primary"
            >
              calcular
            </button>
          </form>

          <h4>Valor en Pesos:</h4>
          {this.state.resultado}
        </div>
      </Fragment>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<DolarFetch />, rootElement);
