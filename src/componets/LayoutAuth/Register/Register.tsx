// import style from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Headling from '../../Headling/Headling';
import style from './Register.module.css';
import { FormEvent, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { PREFIX } from '../../Helpers/Api';
// import { LoginResponse } from '../../interface/auth.interface';
import { useDispatch, useSelector } from 'react-redux';
import { register, userActions } from '../../../store/slice';
import { AppDispatch, RootState } from '../../../store/store';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
};

function Register() {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const { jwt, registerErrorMassege } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		// setError(null);
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		// await sendLogin(email.value, password.value, name.value);
		dispatch(
			register({
				email: email.value,
				password: password.value,
				name: name.value,
			})
		);
	};

	// const sendLogin = async (email: string, password: string, name: string) => {
	// 	dispatch(register({ email, password, name }));

	// try {
	// 	const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
	// 		email,
	// 		password,
	// 	});
	// 	console.log(data);
	// 	// Убираем локалсторадже благодаря авторизации задания s: RootState
	// 	// localStorage.setItem('jwt', data.access_token);
	// 	dispatch(userActions.addJwt(data.access_token));
	// 	navigate('/');
	// } catch (e) {
	// 	if (e instanceof AxiosError) {
	// 		setError(e.response?.data.message);
	// 	}
	// }
	// };

	return (
		<div className={style['conteiner-login']}>
			<Headling>Регистрация</Headling>
			{registerErrorMassege && (
				<div className={style['error-login']}>{registerErrorMassege}</div>
			)}
			<form onSubmit={submit}>
				<div className={style['box-form']}>
					<label className={style['form-label']} htmlFor="email">
						Ваш email
					</label>
					<input
						className={style['form-input']}
						id="email"
						placeholder="Email"
						name="email"
					/>
				</div>
				<div className={style['box-form']}>
					<label className={style['form-label']} htmlFor="password">
						Ваш пароль
					</label>
					<input
						className={style['form-input']}
						id="password"
						type="password"
						placeholder="Пароль"
						name="password"
					/>
				</div>
				<div className={style['box-form']}>
					<label className={style['form-label']} htmlFor="name">
						Ваше имя
					</label>
					<input
						className={style['form-input']}
						id="name"
						placeholder="Имя"
						name="name"
					/>
				</div>
				<Button appearence="big" className={style['button-enter']}>
					Зарегистроваться
				</Button>
				<div className={style['links']}>
					<div>Есть аккаунт?</div>
					<Link to={'/auth/login'}>Войти</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;
