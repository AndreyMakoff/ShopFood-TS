import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import style from './LayoutMenu.module.css';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getprofile, userActions } from '../../store/slice';
import { useEffect } from 'react';

function LayoutMenu() {
	const navigate = useNavigate();
	const distpatch = useDispatch<AppDispatch>();

	useEffect(() => {
		distpatch(getprofile());
	}, [distpatch]);

	const logout = () => {
		distpatch(userActions.logOut());
		// localStorage.removeItem('jwt');
		navigate('/auth/login');
	};
	const profile = useSelector((s: RootState) => s.user.profile);

	const items = useSelector((s: RootState) => s.cart.items);

	return (
		<div className={style['container']}>
			<div className={style['menu-box']}>
				<img src="./avatar.svg" className={style['avatar']} alt="oops" />
				<div className={style['initials']}>
					<h3 className={style['avatar-name']}>{profile?.name}</h3>
					<span className={style['avatar-email']}>{profile?.email}</span>
				</div>
				<NavLink
					to={'/'}
					className={({ isActive }) =>
						cn(style['box-menu'], { [style.active]: isActive })
					}
				>
					<img
						src="./icon-menu.svg"
						className={style['box-menu-icon']}
						alt="oops"
					/>
					<span className={style['box-menu-text']}>Меню</span>
				</NavLink>
				<NavLink
					to={'/cart'}
					className={({ isActive }) =>
						cn(style['box-menu'], { [style.active]: isActive })
					}
				>
					<img
						src="./icon-cart.svg"
						className={style['box-menu-icon']}
						alt="oops"
					/>
					<span className={style['box-menu-text']}>Корзина</span>
					<div className={style['box-menu-circle']}>
						<span className={style['box-menu-count']}>
							{items.reduce((acc, item) => (acc += item.count), 0)}
						</span>
					</div>
				</NavLink>
				<button className={style['button-power']}>
					<img
						src="./icon-powerBig.svg"
						alt="oops"
						className={style['button-power-icon']}
					/>
					<span className={style['button-power-text']} onClick={logout}>
						Выйти
					</span>
				</button>
			</div>
			<div className={style['content']}>
				<Outlet />
			</div>
		</div>
	);
}

export default LayoutMenu;
