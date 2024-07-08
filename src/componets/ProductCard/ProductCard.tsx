import { ProductCardProps } from './ProductCardProps';
import style from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cartslice';
import { MouseEvent } from 'react';

function ProductCard(props: ProductCardProps) {
	const dispatch = useDispatch<AppDispatch>();

	const addToCart = (e: MouseEvent) => {
		e.preventDefault();
		dispatch(cartActions.add(props.id));
	};
	return (
		<div className={style['card-container']}>
			<Link to={`/product/${props.id}`} className={style['link']}>
				<div
					className={style['header-background']}
					style={{ backgroundImage: `url(${props.image})` }}
				>
					<div className={style['card-header']}>
						<div className={style['price']}>
							{props.price}
							<span className={style['span-rub']}> ₽</span>
						</div>
						<button className={style['button-circle']} onClick={addToCart}>
							<img
								src="/cart-icon-circle.svg"
								alt="icon"
								className={style['cart-icon-circle']}
							/>
						</button>
					</div>
				</div>

				<div className={style['rating-box']}>
					<div className={style['rating']}>{props.rating}</div>
					<img
						src="/star-rating.svg"
						alt="icon"
						className={style['star-rating']}
					/>
				</div>
				<div className={style['card-footer']}>
					<span className={style['title']}>{props.name}</span>
					<span className={style['description']}>{props.description}</span>
				</div>
			</Link>
		</div>
	);
}

export default ProductCard;
