import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    handleShelf: PropTypes.func.isRequired
  }

  render () {
    const {books, shelf, handleShelf} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  handleShelf={handleShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;