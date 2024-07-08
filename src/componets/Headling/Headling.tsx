import cn from 'classnames';
import style from './Headling.module.css';
import { HeadlingProps } from './Headling.props';

function Headling({ children, className, ...props }: HeadlingProps) {
	return (
		<h1 className={cn(className, style['h1'])} {...props}>
			{children}
		</h1>
	);
}

export default Headling;
