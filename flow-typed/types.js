// @flow

// Here's where you put type defs that need to appear in more than one file! You
// can just put what you need to use in here

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};
