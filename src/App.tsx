import {ConfigProvider} from 'antd'
import './App.css'
import {BankTransferForm} from './modules/bank-transfer'
import {theme} from './ui'

function App() {
    return (
        <ConfigProvider theme={theme}>
            <BankTransferForm />
        </ConfigProvider>
    )
}

export default App
