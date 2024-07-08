import { Outlet } from 'react-router-dom';
import style from './LayoutAuth.module.css';

function LayoutAuth() {
	return (
		<div className={style['container-auth']}>
			<div className={style['leftpath']}>
				<img src="./../group.svg" alt="logo" className={style['group-icon']} />
			</div>
			<div className={style['content']}>
				<Outlet />
			</div>
		</div>
	);
}

export default LayoutAuth;
