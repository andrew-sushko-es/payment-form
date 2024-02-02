import {Select as AntSelect, SelectProps as AntSelectProps} from 'antd'
import type {BaseSelectRef} from 'rc-select'
import {forwardRef} from 'react'
import classNames from 'classnames'
import styles from './Select.module.css'
import {ClassesUnion, InputBase, InputBaseProps} from '../input-base'

type SelectClassesUnion = ClassesUnion | 'select'

type SelectOption = {
    label: React.ReactNode
    value: string | number | null
    children: string
}

interface SelectProps extends InputBaseProps {
    value: string | number | null
    options: SelectOption[]
    optionLabelProp?: keyof SelectOption
    classes?: Partial<Record<SelectClassesUnion, string>>
    onChange?: AntSelectProps<any, SelectOption>['onChange']
    onBlur?: AntSelectProps<any, SelectOption>['onBlur']
}

export const Select = forwardRef<BaseSelectRef, SelectProps>((props, ref) => {
    const {name, label, classes, options, optionLabelProp, error, required, value, onChange, onBlur} = props
    return (
        <InputBase name={name} label={label} classes={classes} error={error} required={required}>
            <AntSelect
                ref={ref}
                value={value}
                className={classNames(styles.select, classes?.select)}
                optionLabelProp={optionLabelProp}
                options={options}
                status={error && 'error'}
                onChange={onChange}
                onBlur={onBlur}
            />
        </InputBase>
    )
})
