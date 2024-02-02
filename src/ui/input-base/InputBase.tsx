import {PropsWithChildren} from 'react'
import classNames from 'classnames'
import styles from './InputBase.module.css'

export type ClassesUnion = 'container' | 'label'

export interface InputBaseProps {
    name: string
    label: string
    classes?: Partial<Record<ClassesUnion, string>>
    error?: string
    required?: boolean
}

export const InputBase = (props: PropsWithChildren<InputBaseProps>) => {
    const {name, label, classes, required, error, children} = props
    return (
        <div className={classNames(styles.container, classes?.container)}>
            <label htmlFor={name} className={classNames(styles.label, classes?.label)}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            {children}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    )
}
