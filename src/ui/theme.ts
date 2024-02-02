import {ThemeConfig} from 'antd'
const colors = {
    accentColor: '#38ba60',
    errorColor: '#FF5A65'
}
export const theme: ThemeConfig = {
    components: {
        Button: {
            colorPrimary: colors.accentColor,
            colorPrimaryHover: colors.accentColor
        },
        Input: {
            colorPrimaryHover: colors.accentColor,
            colorErrorBorder: colors.errorColor
        },
        InputNumber: {
            colorPrimaryHover: colors.accentColor,
            colorErrorBorder: colors.errorColor
        },
        Select: {
            colorPrimaryHover: colors.accentColor
        }
    }
}
