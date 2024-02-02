import * as yup from 'yup'

const messages = {
    required: 'Field is required'
}

export const schema = yup
    .object({
        amount: yup
            .number()
            .positive()
            .min(0.01)
            .required(messages.required)
            .when('balance', (balance: number[], schema) => {
                const balanceValue = balance?.[0]
                if (balanceValue) {
                    return schema.max(balanceValue)
                }
                return schema
            }),
        payerAccount: yup.string().required(messages.required),
        purpose: yup.string().min(3).max(135).required(messages.required),
        payee: yup.string().max(70).required(messages.required),
        payeeAccount: yup.string().required(messages.required)
    })
    .required()
