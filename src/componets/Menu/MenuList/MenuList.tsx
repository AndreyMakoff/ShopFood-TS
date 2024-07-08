import ProductCard from '../../ProductCard/ProductCard';
import { MenuListProps } from './MenuListProps';
import style from './MenuList.module.css';

function MenuList({ products }: MenuListProps) {
	return (
		<div className={style['list']}>
			{products.map((p) => {
				return (
					<ProductCard
						key={p.id}
						id={p.id}
						description={p.ingredients.join(', ')}
						rating={p.rating}
						name={p.name}
						price={p.price}
						image={p.image}
					/>
				);
			})}
		</div>
	);
}

export default MenuList;
