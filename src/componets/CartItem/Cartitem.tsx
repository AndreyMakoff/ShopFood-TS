import { useDispatch } from 'react-redux';
import style from './CartItemes.module.css';
import { CartItemProps } from './CartItemsProps';
import { AppDispatch } from '../../store/store';
import { cartActions } from '../../store/cartslice';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const remove = () => {
		dispatch(cartActions.delete(props.id));
	};

	const increase = () => {
		dispatch(cartActions.add(props.id));
	};

	const descrease = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={style['one-cart']}>
			<img
				className={style['img-cart']}
				style={{ backgroundImage: `url(${props.image})` }}
			/>
			<div className={style['cart-description']}>
				<span className={style['cart-title']}>{props.name}</span>
				<span className={style['cart-price']}>{props.price}$</span>
			</div>
			<div className={style['cart-control']}>
				<button className={style['delete']} onClick={descrease}>
					-
				</button>
				<span className={style['count']}>{props.count}</span>
				<button className={style['add']} onClick={increase}>
					+
				</button>
			</div>
			<button className={style['button-delete']} onClick={remove}>
				<img
					src="./../delete.svg"
					alt="удалить все"
					className={style['button-img']}
				/>
			</button>
		</div>
	);
}

export default CartItem;
