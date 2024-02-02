interface AccountOptionLabelProps {
    account: string
    balance: string | number
}

export const AccountOptionLabel = (props: AccountOptionLabelProps) => {
    const {account, balance} = props
    return (
        <div>
            <span>{account}</span>
            <br />
            <span>Balance: {balance}</span>
        </div>
    )
}
