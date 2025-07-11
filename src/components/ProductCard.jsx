import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

function ProductCard({ item }) {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${item.category}/${item.id}`);
  };

  return (
    <div className="productButton p-2" onClick={handleCardClick}>
      <img src={item.thumbnail} alt={item.title} />

      <h3 style={{ color: 'red', fontSize: 'max(18px,1.8vw)' }}>
        {item.title}
      </h3>

      <p>${item.price}</p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button
          className="plusMinusBtns"
          onClick={e => {
            e.stopPropagation();
            dispatch(removeFromCart(item));
          }}
        >
          –
        </button>

        <div
          className="plusMinusBtns"
          onClick={e => e.stopPropagation()}
          style={{ backgroundColor: '#fff' }}
        >
          {item.quantity}
        </div>

        <button
          className="plusMinusBtns"
          onClick={e => {
            e.stopPropagation();
            dispatch(addToCart(item));
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
