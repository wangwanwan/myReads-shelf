import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';
import sortBy from 'sort-by';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render () {
    const {books, changeShelf} = this.props;
    books.sort(sortBy('title'));
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            shelf='Currently Reading'
            books={books.filter(book => book.shelf === 'currentlyReading')}
            handleShelf={changeShelf}
          />
          <BookShelf
            shelf='Want to Read'
            books={books.filter(book => book.shelf === 'wantToRead')}
            handleShelf={changeShelf}
          />
          <BookShelf
            shelf='Read'
            books={books.filter(book => book.shelf === 'read')}
            handleShelf={changeShelf}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

    )
  }
}

export default ListBooks;
