# React Notes

## Important things

Your components should be 100% DETERMINISTIC. Anything that might change should ALWAYS be passed as a prop to the component.

Your render method is going to be called over and over and over, for every component! So it should be fast, fast, fast! You can perform 'expensive' calculations elsewhere, not in the render path.

propTypes are a runtime error, to make sure you're passing the right prop types to your component

Note: if we wanted to pass a spread object instead of an object:
In Search.jsx:

```jsx
const Search = () => (
  // Shorthand "spread"
  <div className="search">{preload.shows.map(show => <ShowCard {...show} />)}</div>
  // This is short for title={show.title} year={show.year}, etc.
  // Spread just "spreads" the object attributes to the upper level
);
```

In ShowCard.jsx:
```jsx
const ShowCard = props => (
  <div className="show-card">
    <img
      src={`/public/img/posters/${props.poster}`}
      alt={`${props.title} Show Poster`}
    />
    <div>
      <h3>{props.title}</h3>
      <h4>({props.year})</h4>
      <p>{props.description}</p>
    </div>
  </div>
);

ShowCard.propTypes = {
  poster: string.isRequired,
  title: string.isRequired,
  year: string.isRequired,
  description: string.isRequired
};
```

We're getting this error though!
```
Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `Search`. See https://fb.me/react-warning-keys for more information.
```

This is important to not have to reload more than often, so React knows when something changes! This is really important when you have deeply nested components. The key has to be **something** unique about the object. This ALSO works when rearranging. React can rearrange without re-rendering!!

Tagged template literals! Template literals that are then run through this tag function.

## State

Because of one-way data flow, `props` is immutable.
React components can track their own state, but only a component can change its own state.
A parent and child can touch each others' state
So far, we've been using stateless functional components, because there is no mechanism to give them state. We need to turn them into ES6 class components

```js
class Search extends Component {
  render() {
  }
}
```

* DO NOT MODIFY STATE DIRECTLY
* Use `setState()`
* Need to bind context to make sure `this` refers to our component when it is called.
  * Do NOT do it this way: `this.handleSearchTermChange.bind(this)` because render gets called a LOT, and `.bind()` creates a new function every time render is called, and `.bind()` is an expensive operation.
  * Instead, call it in the constructor: `this.handleSearchTermChange = this.handleSearchTermChange.bind(this);`
    * This looks weird, but it ensures that `bind()` is only called ONCE, in the constructor, and ensures that `this` is in the correct context (`Search`)

* `transform-class-properties` is currently in Stage 2 (3?) with TC39. Use it with a grain of salt
  * [Babel plugin](https://babeljs.io/docs/plugins/transform-class-properties/)
  * [Stage 2 proposal](https://github.com/tc39/proposal-class-public-fields)
  * [Stage 3 proposal](https://github.com/tc39/proposal-class-fields)
* **Arrow functions do not create new contexts when they are created!!**
* State is new and confusing for me, may need to rewatch videos 28 & 29

* How do we get a searchTerm from the Landing page TO the default state of the next Search page?
  1. Create a common 'ancestor'/'parent' component that can pass the term as a prop to both Landing and Search
  2. Use Redux (which we'll do later). BUT redux is a huge component to add to any project which adds a ton of complexity!! So use it lightly!!

## To Watch/Read

* ES6 - The Right Parts
* Advanced Asynchronous Programming
* rx.js

## Testing

* Jest supports snapshot testing! This makes it great for testing React
* Unfortunately, Jest runs in Node, so we can't do JSX or ES6 modules
* BUT, we can set NODE_ENV=test, and then have Babel pick up on that environment variable, and transpile the commonjs modules. (But why does this mean JSX will work?)
* Jest snapshots are just JSON! So this means you can also use snapshots to test APIs, or anything that returns JSON
* YOU SHOULD COMMIT SNAPSHOTS
* Read up on 'mocking' for sign-in!
* I assume that `yarn test` passes `NODE_ENV=test` by default?
* `Enzyme.shallow()` is a wrapper on `renderer.create()` that will stub out all of the children components, but we need to tell Jest how to snapshot Enzyme components
  * What Enzyme does is makes a snapshot where the child element is saved as just the component with the props passed in, and does not actually render the child component.
* `Enzyme.render()` uses JSDOM, which will actually render the virtual DOM, but is super slow!
* `Enzyme.static()` uses cheerio (sp?) which is great for web-scraping, but is super slow!

## Flow

* Typing in JS (without using TypeScript)!
* It makes development slower, but it's one of the best ways to make a scalable architecture for your project.

* Because types are not valid JS, we need to transpile with Babel! Fortunately this is included in the React preset.
* These specific browser types are included in Flow already! Check the flow docs at flowtype.org

* Flow even does a ton of type inference for you! You just have to set types where it can't infer types.
* Currently styled-components has bugs with Flow, so need to ignore styled-components, but then let Flow know that it's still there.
