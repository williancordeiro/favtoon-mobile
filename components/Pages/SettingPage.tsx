import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeContext } from '../context/ThemeContext'
import Title from '../templates/Title'
import { GlobalStyle } from '../Style/GlobalStyle'

export default function SettingPage() {
  const { colors, theme, setTheme } = useThemeContext()
  const globalStyles = GlobalStyle(colors)

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.title}>
        <Title style={{ color: colors.primary }}>Settings</Title>
      </View>

      <View style={styles.main}>
        <Text style={{ fontSize: 18, color: colors.text, marginBottom: 16 }}>Application Theme:</Text>
        <View style={{ flexDirection: 'row', gap: 24 }}>
          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setTheme('light')}
            activeOpacity={0.7}
          >
            <View style={[
              styles.radioCircle,
              { borderColor: colors.primary }
            ]}>
              {theme === 'light' && <View style={[
                styles.radioDot,
                { backgroundColor: colors.primary }
              ]} />}
            </View>
            <Text style={{ color: colors.text, marginLeft: 8 }}>Claro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioContainer}
            onPress={() => setTheme('dark')}
            activeOpacity={0.7}
          >
            <View style={[
              styles.radioCircle,
              { borderColor: colors.primary }
            ]}>
              {theme === 'dark' && <View style={[
                styles.radioDot,
                { backgroundColor: colors.primary }
              ]} />}
            </View>
            <Text style={{ color: colors.text, marginLeft: 8 }}>Escuro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  title: {
    alignItems: 'center',
    paddingVertical: '5%',
  },
  main: {
    alignItems: 'flex-start',
    paddingHorizontal: 24,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
})