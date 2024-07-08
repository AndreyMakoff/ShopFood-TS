import { InputHTMLAttributes } from 'react';

export interface SerachProps extends InputHTMLAttributes<HTMLInputElement> {
	isValid?: boolean;
}
