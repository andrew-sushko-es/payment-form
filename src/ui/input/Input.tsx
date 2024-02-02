import {ChangeEventHandler, FocusEventHandler, forwardRef} from 'react'
import {Input as AntInput, InputRef} from 'antd'
import classNames from 'classnames'
import styles from './Input.module.css'
import {ClassesUnion, InputBase, InputBaseProps} from '../input-base'

type InputClassesUnion = ClassesUnion | 'input'

interface InputProps extends InputBaseProps {
    defaultValue?: string
    value?: string | number
    classes?: Partial<Record<InputClassesUnion, string>>
    onChange?: ChangeEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
}

export const Input = forwardRef<InputRef, InputProps>((props, ref) => {
    const {name, label, defaultValue, value, classes, error, required, onChange, onBlur} = props
    return (
        <InputBase name={name} label={label} classes={classes} error={error} required={required}>
            <AntInput
                ref={ref}
                className={classNames(styles.input, classes?.input)}
                name={name}
                defaultValue={defaultValue}
                value={value}
                status={error && 'error'}
                onChange={onChange}
                onBlur={onBlur}
            />
        </InputBase>
    )
})
