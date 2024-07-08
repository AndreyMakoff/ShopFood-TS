import { useDispatch, useSelector } from 'react-redux';
import Headling from '../Headling/Headling';
import { AppDispatch, RootState } from '../../store/store';
import CartItem from '../CartItem/Cartitem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../Helpers/Api';
import { Product } from '../interface/product.interface';
import style from './Cart.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cartslice';

const DELIVIRY_FEE = 169;

function Cart() {
	const items = useSelector((s: RootState) => s.cart.items);
	const jwt = useSelector((s: RootState) => s.user.jwt);
	const navigate = useNavigate();
	const [cartProducts, setCartProducts] = useState<Product[]>();
	const dispatch = useDispatch<AppDispatch>();

	const total = items
		.map((i) => {
			const product = cartProducts?.find((p) => p.id === i.id);
			if (!product) {
				return 0;
			}
			return i.count * product.price;
		})
		.reduce((acc, i) => (acc += i), 0);

	const getItem = async (id: number) => {
		const { data } = await axios.get(`${PREFIX}/products/${id}`);
		return data;
	};

	const checkpout = async () => {
		await axios.post(
			`${PREFIX}/order`,
			{
				products: items,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
		dispatch(cartActions.clean());
		navigate('/succses');
	};

	const loadAllItems = async () => {
		const res = await Promise.all(items.map((i) => getItem(i.id)));
		setCartProducts(res);
	};
	useEffect(() => {
		loadAllItems();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	return (
		<div>
			<Headling>Корзина</Headling>

			{items.map((i) => {
				const product = cartProducts?.find((p) => p.id === i.id);
				if (!product) {
					return;
				}
				return <CartItem count={i.count} {...product} key={product.id} />;
			})}
			<div className={style['delivery']}>
				<div className={style['total-price']}>
					<span>Итог</span>
					<div>{total} ₽</div>
				</div>
				<hr />
				<div className={style['total-price']}>
					<span>Доставка</span>
					<div>{DELIVIRY_FEE} ₽</div>
				</div>
				<hr />
				<div className={style['total-price']}>
					<span>Всего ({items.length})</span>
					<div>{DELIVIRY_FEE + total} ₽</div>
				</div>
				<hr />
				<div className={style['button-checkout']}>
					<Button onClick={checkpout}>Оформить</Button>
				</div>
			</div>
		</div>
	);
}

export default Cart;
