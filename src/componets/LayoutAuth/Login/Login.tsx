import { Link, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';
import Headling from '../../Headling/Headling';
import style from './Login.module.css';
import { FormEvent, useEffect } from 'react';
// import axios, { AxiosError } from 'axios';
// import { PREFIX } from '../../Helpers/Api';
// import { LoginResponse } from '../../interface/auth.interface';
import { useDispatch, useSelector } from 'react-redux';
import { login, userActions } from '../../../store/slice';
import { AppDispatch, RootState } from '../../../store/store';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

function Login() {
	// const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const { jwt, loginErrorMassege } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		// setError(null);
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));

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
	};

	return (
		<div className={style['conteiner-login']}>
			<Headling>Вход</Headling>
			{loginErrorMassege && (
				<div className={style['error-login']}>{loginErrorMassege}</div>
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
				<Button appearence="big" className={style['button-enter']}>
					Вход
				</Button>
				<div className={style['links']}>
					<div>Нет аккаунта?</div>
					<Link to={'/auth/register'}>Зарегистроваться</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;
