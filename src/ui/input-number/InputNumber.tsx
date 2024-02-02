import {FocusEventHandler, forwardRef} from 'react'
import {InputNumber as AntInputNumber} from 'antd'
import classNames from 'classnames'
import styles from './InputNumber.module.css'
import {ClassesUnion, InputBase, InputBaseProps} from '../input-base'

type InputClassesUnion = ClassesUnion | 'input'

interface InputProps extends InputBaseProps {
    defaultValue?: number
    value?: number
    classes?: Partial<Record<InputClassesUnion, string>>
    onChange?: (value: number | null) => void
    onBlur?: FocusEventHandler<HTMLInputElement>
}

export const InputNumber = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {name, label, defaultValue, value, classes, error, required, onChange, onBlur} = props
    return (
        <InputBase name={name} label={label} classes={classes} error={error} required={required}>
            <AntInputNumber
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
