import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      this.setState(state => ({
        books: this.state.books.filter(b => book.id !== b.id).concat([{...book, shelf}])
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
          books={this.state.books}
          changeShelf={this.updateShelf}
          />
        )}>
        </Route>
        <Route path="/search" render={({history}) => (
          <SearchBooks
            books={this.state.books}
            changeShelf={(book, shelf) => {
              this.updateShelf(book, shelf);
              history.push('/');
            }}
          />
        )}>
        </Route>
      </div>
    )
  }
}

export default BooksApp;
