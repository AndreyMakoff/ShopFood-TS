import { forwardRef } from 'react';
import style from './Search.module.css';
import cn from 'classnames';
import { SerachProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SerachProps>(function Input(
	{ isValid = true, className, ...props },
	ref
) {
	return (
		<div className={style['box-search']}>
			<img src="/search-icon.svg" alt="icon" className={style['icon-search']} />
			<input
				ref={ref}
				className={cn(className, {
					[style['search']]: isValid,
				})}
				{...props}
			/>
		</div>
	);
});

export default Search;
