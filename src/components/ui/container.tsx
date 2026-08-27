import type { HTMLAttributes } from 'react';
import styles from './container.module.css';

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className = '', ...props }: ContainerProps) {
  return <div className={`${styles.container} ${className}`.trim()} {...props} />;
}
