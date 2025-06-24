import { StyleSheet } from "react-native"

export const lightTheme = {
    primary: '#007AFF',
    title: '#FFFFFF',
    text: '#000000',
    background: '#FFFFFF',
    success: '#0CCB1F',
    danger: 'red',
    opacity: '#b5b5b5',
    tabBarInactiveTintColor: '#22222',
    tabBarActiveTintColor: '#FFFFFF'
}

export const darkTheme = {
    primary: '#022852',
    title: '#FFFFFF',
    text: '#FFFFFF',
    background: '#111111',
    success: '#094d10',
    danger: 'darkred',
    opacity: '#919191',
    tabBarInactiveTintColor: '##333333',
    tabBarActiveTintColor: '#FFFFFF',
}

export const GlobalStyle = (color: typeof lightTheme) => StyleSheet.create({
    header: {
        backgroundColor: color.primary,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    container: {
        fontFamily: 'Roboto',
        backgroundColor: color.background,
        height: '100%',
    },
    title: {
        color: color.primary,
        fontWeight: 'bold',
    },
    input: {
        borderColor: color.primary,
        color: color.text,
    },
    btn: {
        backgroundColor: color.primary
    }
})