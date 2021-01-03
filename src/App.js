import React from "react"
import axios from "axios"
import "./App.css"
// https://github.com/pprathameshmore/QuoteGarden

class App extends React.Component {
  state = {
    quotes: [],
  }

  query = (author, count) => {
    axios
      .get("https://quote-garden.herokuapp.com/api/v3/quotes/random", {
        params: {
          author: author,
          count: count,
        },
      })
      .then(response => {
        this.setState({ quotes: response.data.data })
      })
  }

  componentDidMount() {
    this.query("", 1)
  }

  refresh = () => {
    this.query("", 1)
  }

  byAuthor = author => {
    this.query(author, 3)
  }

  render() {
    return (
      <div className="App">
        <div className="random-row">
          <div className="random" onClick={this.refresh}>
            <span>Random</span> <i className="material-icons">autorenew</i>
          </div>
        </div>
        {this.state.quotes.length > 1 ? (
          <h1 className="author">{this.state.quotes[0].quoteAuthor}</h1>
        ) : null}
        {this.state.quotes.map(quote => (
          <div className="quote" key={quote._id}>
            {this.state.quotes.length > 1 ? (
              <p className="quote-genre">{quote.quoteGenre}</p>
            ) : null}
            <p className="quote-text">“{quote.quoteText}”</p>
            {this.state.quotes.length === 1 ? (
              <div
                className="quote-details"
                onClick={() => this.byAuthor(this.state.quotes[0].quoteAuthor)}
              >
                <p className="quote-author">{this.state.quotes[0].quoteAuthor}</p>
                <p className="quote-genre">{this.state.quotes[0].quoteGenre}</p>
                <i className="material-icons">arrow_right_alt</i>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    )
  }
}

export default App
