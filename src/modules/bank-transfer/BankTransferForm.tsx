import {Button, Col, Row, message} from 'antd'
import {ChangeEvent} from 'react'
import {LockOutlined} from '@ant-design/icons'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, ControllerRenderProps, SubmitHandler, useForm} from 'react-hook-form'

import styles from './BankTransferForm.module.css'

import {Input, InputNumber, Select} from '../../ui'
import {AccountOptionLabel} from './components'
import {payerAccounts} from './mocks'
import {schema} from './validation'
import {BankTransferService} from './services'
import {debounce} from '../../utils'

type FormInputs = {
    amount: number
    payerAccount: string
    purpose: string
    payee: string
    payeeAccount: string
    balance?: number
}

type FieldType<T extends keyof FormInputs> = ControllerRenderProps<FormInputs, T>

interface Props {}

export const BankTransferForm: React.FC<Props> = () => {
    const {handleSubmit, register, setValue, clearErrors, setError, reset, control} = useForm<FormInputs>({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })
    const [messageApi, contextHolder] = message.useMessage()

    register('balance')

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data)
        messageApi.open({type: 'success', content: 'Payment successfully sent'})
        reset()
    }

    const inputClassNames = {
        container: styles.inputContainer
    }
    const options = payerAccounts.map(account => ({
        label: <AccountOptionLabel account={account.iban} balance={account.balance} />,
        value: account.id,
        children: account.iban
    }))

    const handleChangePayerAccount = (value: string, field: FieldType<'payerAccount'>) => {
        field.onChange(value)
        setValue('balance', payerAccounts.find(account => account.id === value)?.balance)
    }

    const validateIban = debounce(async iban => {
        try {
            // Used mocked response because of CORS issue on endpoint
            const data = await BankTransferService.validateIbanMock(iban)
            if (data.valid) {
                clearErrors('payeeAccount')
            }
        } catch (error) {
            setError('payeeAccount', {message: 'Invalid account'})
        }
    }, 1000)

    const handleChangePayeeAccount = async (event: ChangeEvent<HTMLInputElement>, field: FieldType<'payeeAccount'>) => {
        field.onChange(event)
        const iban = event.target.value
        if (!iban) {
            return
        }
        validateIban(iban)
    }

    return (
        <div className={styles.container}>
            {contextHolder}
            <h1>Payment</h1>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={2}>
                    <Col md={11} className={styles.column}>
                        <h2>Payer Info</h2>
                        <Controller
                            name='payerAccount'
                            control={control}
                            render={({field, fieldState}) => (
                                <Select
                                    {...field}
                                    onChange={value => handleChangePayerAccount(value, field)}
                                    label='Payer Account'
                                    required
                                    classes={inputClassNames}
                                    options={options}
                                    optionLabelProp='children'
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name='amount'
                            control={control}
                            render={({field, fieldState}) => (
                                <InputNumber
                                    {...field}
                                    label='Amount'
                                    required
                                    classes={inputClassNames}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            name='purpose'
                            control={control}
                            render={({field, fieldState}) => (
                                <Input
                                    {...field}
                                    label='Purpose'
                                    required
                                    classes={inputClassNames}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </Col>
                    <Col md={11} offset={2} className={styles.column}>
                        <h2>Payee Info</h2>
                        <Controller
                            name='payee'
                            control={control}
                            render={({field, fieldState}) => (
                                <Input
                                    {...field}
                                    label='Payee'
                                    required
                                    classes={inputClassNames}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name='payeeAccount'
                            control={control}
                            render={({field, fieldState}) => (
                                <Input
                                    {...field}
                                    label='Payee Account'
                                    required
                                    onChange={event => handleChangePayeeAccount(event, field)}
                                    onBlur={event => handleChangePayeeAccount(event, field)}
                                    classes={inputClassNames}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </Col>
                </Row>
                <Row justify='end' className={styles.actionsContainer}>
                    <Button htmlType='submit' type='primary' className={styles.submitButton} icon={<LockOutlined />}>
                        Proceed
                    </Button>
                </Row>
            </form>
        </div>
    )
}
