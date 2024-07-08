import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
// import Button from './componets/Button/Button';
// import Input from './componets/Input/Input';
import LayoutMenu from './componets/Layout/LayoutMenu';
// import Menu from './componets/Menu/Menu';
import Cart from './componets/Cart/Cart';
import OneProduct from './componets/OneProduct/OneProduct';
import axios from 'axios';
import { PREFIX } from './componets/Helpers/Api';
import { Suspense, lazy } from 'react';
import Login from './componets/LayoutAuth/Login/Login';
import Register from './componets/LayoutAuth/Register/Register';
import LayoutAuth from './componets/LayoutAuth/LayoutAuth/LayoutAuth';
import RequireAuth from './componets/Helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Succses from './componets/Succses/Succses';

const Menu = lazy(() => import('./componets/Menu/Menu'));

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<RequireAuth>
					<LayoutMenu />
				</RequireAuth>
			),
			children: [
				{
					path: '/',
					element: (
						<Suspense fallback={<>Ух ты!!!!</>}>
							<Menu />
						</Suspense>
					),
				},
				{ path: '/cart', element: <Cart /> },
				{ path: '/succses', element: <Succses /> },
				{
					path: '/product/:id',
					element: <OneProduct />,
					errorElement: <>Ошибка</>,
					loader: async ({ params }) => {
						return defer({
							data: new Promise((resolve, reject) => {
								setTimeout(() => {
									axios
										.get(`${PREFIX}/products/${params.id}`)
										.then((data) => resolve(data))
										.catch((e) => reject(e));
								}, 2000);
							}),
						});
					},
				},
			],
		},
		{
			path: '/auth',
			element: <LayoutAuth />,
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{ path: 'register', element: <Register /> },
			],
		},
	]);

	return (
		<>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</>
	);
}

export default App;
