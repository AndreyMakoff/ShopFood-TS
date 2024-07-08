import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../Headling/Headling';
import { PREFIX } from '../Helpers/Api';

import Search from '../Search/Seach';
import style from './Menu.module.css';
import { Product } from '../interface/product.interface';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	// useEffect(() => {
	// 	getMenu();
	// }, []);

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2000);
			});

			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name,
				},
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			console.error(e);
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);

			return;
		}
	};

	return (
		<div>
			<div className={style['head']}>
				<Headling>Меню</Headling>
				<Search
					placeholder="Введите блюдо или состав"
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <div>Загружается</div>}
				{!isLoading && products.length === 0 && <>Ничего не найдено</>}
			</div>
		</div>
	);
}

export default Menu;
