import { Link } from 'react-router-dom';
import './quote-item.scss';

const QuoteItem = (props) => {
  return (
    <li className="item">
      <figure>
        <blockquote>
          <p>"{props.text}"</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className="btn">
        View More...
      </Link>
    </li>
  );
};

export default QuoteItem;
