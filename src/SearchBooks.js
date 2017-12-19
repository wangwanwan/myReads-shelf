import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import sortBy from 'sort-by';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    foundBooks: []
  }

  updateQuery = (value) => {
    console.log('111updateQuery=' + value);
    // this.setState({query: value});
    if(value) {
      this.searchBooks(value);
    } else {
      this.setState({foundBooks: []});
    }
  }

  searchBooks = (query) => {
    BooksAPI.search(query).then((books) => {
      if (books.lenght === 0) {
        this.setState({foundBooks: []});
      } else {
        books = books.map(searchBook => {
          this.props.books.map(book => {
            if (book.id === searchBook.id) {
              searchBook.shelf = book.shelf;
            }
          });
          return searchBook;
        });
        this.setState({foundBooks: books});
      }
    })
  }

  render () {
    const {books, changeShelf} = this.props;
    const {foundBooks} = this.state;
    foundBooks.sort(sortBy('title'));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {foundBooks.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  handleShelf={changeShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;
