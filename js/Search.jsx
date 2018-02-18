import React, { Component } from 'react';
import ShowCard from './ShowCard';
import preload from '../data.json';

class Search extends Component {
  // with `transform-class-properties`, we can drop the whole constuctor!!
  // constructor(props) {
  //   // This is annoying, but is required
  //   super(props);

  //   this.state = {
  //     searchTerm: 'debugging!!'
  //   };

  //   // This looks weird, but it ensures that `bind()` is only called ONCE, in
  //   // the constructor, and ensures that `this` is in the correct context
  //   // (`Search`).
  //   this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  // }
  state = {
    // default state. will affect what is show on first render!
    searchTerm: ''
  };
  // arrow functions do not create new contexts when they are created!!
  // So `this` still refers to the parent context
  handleSearchTermChange = event => {
    // DO NOT MODIFY STATE DIRECTLY
    // Use `setState()`
    this.setState({ searchTerm: event.target.value });
  };
  // Must have render method, and must return markup
  render() {
    return (
      <div className="search">
        <header>
          <h1>{this.state.searchTerm}</h1>
          {/* This inut is not currently used, so it's an 'untracked input' */}
          {/* Now we're using it, but what is `this`? We need to make sure `this` is the component `Search`, so we need to bind the context. */}
          <input
            onChange={this.handleSearchTermChange}
            value={this.state.searchTerm}
            type="text"
            placeholder="Search"
          />
        </header>
        <div>
          {preload.shows
            .filter(
              // Here we're returning only those shows which match the search term!
              // We're returning those which fulfill `true` below.
              // Implicit return in arrow-functions, don't need a return statement

              // Note: this is not the most readable thing right here, so this
              // would probably be better as a module!
              show =>
                `${show.title} ${show.description}`
                  .toLowerCase()
                  .indexOf(this.state.searchTerm.toLowerCase()) >= 0
              // arrow functions do not create new context, so do not need to use `bind()` or pass in `this`, can just use `this`!
            )
            .map(show => <ShowCard key={show.imdbID} show={show} />)}
        </div>
      </div>
    );
    // Shorthand "spread"
    // <div className="search">{preload.shows.map(show => <ShowCard {...show} />)}</div>
    // This is short for title={show.title} year={show.year}, etc.
    // Spread just "spreads" the object attributes to the upper level
  }
}

export default Search;
