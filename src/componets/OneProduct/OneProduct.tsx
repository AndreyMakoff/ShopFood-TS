import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../interface/product.interface';
import { Suspense } from 'react';

function OneProduct() {
	// const { id } = useParams();
	// const data = useLoaderData() as Product;

	const data = useLoaderData() as { data: Product };
	return (
		<>
			<Suspense fallback={'Ух ты!!!!'}>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => <div>Product- {data.name}</div>}
				</Await>
			</Suspense>
		</>
	);
}

export default OneProduct;
