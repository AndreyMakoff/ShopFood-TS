import styles from './Button.module.css';
import { ButtonsProps } from './Buttons.props';
import cn from 'classnames';

function Button({
	children,
	className,
	appearence = 'small',
	...props
}: ButtonsProps) {
	return (
		<button
			className={cn(styles['button'], className, styles['accent'], {
				[styles['small']]: appearence === 'small',
				[styles['big']]: appearence === 'big',
			})}
			{...props}
		>
			{children}
		</button>
	);
}
export default Button;
