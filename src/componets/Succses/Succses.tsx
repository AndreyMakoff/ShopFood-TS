import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import style from './Succses.module.css';

function Succses() {
	const navigate = useNavigate();
	return (
		<div className={style['container']}>
			<img src="./img-pizza.png" alt="pizza" className={style['img-pizza']} />
			<span className={style['text-out']}>Ваш заказ успешно оформлен!</span>
			<Button appearence="big" onClick={() => navigate('/')}>
				Сделать новый
			</Button>
		</div>
	);
}

export default Succses;
