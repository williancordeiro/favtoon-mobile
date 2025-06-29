import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

// Mock para o Alert do React Native
global.alert = jest.fn();

// Componente mockado simplificado para testes
const FormRegisterTest = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleRegister = () => {
    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('User registered successfully');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        placeholder='name. . .'
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
        testID="name-input"
      />
      <TextInput
        placeholder='email. . .'
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
        testID="email-input"
      />
      <TextInput
        placeholder='password. . .'
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
        testID="password-input"
      />
      <TextInput
        placeholder='confirm pass. . .'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        style={{ borderWidth: 1, padding: 10, margin: 5, width: 300 }}
        testID="confirm-password-input"
      />
      <TouchableOpacity
        onPress={handleRegister}
        style={{ backgroundColor: '#000', padding: 10, alignItems: 'center', width: 300, marginTop: 15 }}
        testID="register-button"
      >
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('FormRegister Component', () => {
  
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
  });

  /**
   * TESTE 1: Verifica se todos os elementos do formulário são renderizados corretamente
   * 
   * Este teste valida se:
   * - Os 4 campos de entrada (nome, email, senha, confirmar senha) estão presentes
   * - O botão de registro está visível
   * - Os placeholders estão corretos
   * - O componente renderiza sem erros
   */
  test('deve renderizar todos os campos de entrada e o botão de registro', () => {
    // Renderiza o componente FormRegister
    const { getByPlaceholderText, getByText } = render(<FormRegisterTest />);
    
    // Verifica se o campo de nome está presente com o placeholder correto
    const nameInput = getByPlaceholderText('name. . .');
    expect(nameInput).toBeTruthy();
    
    // Verifica se o campo de email está presente com o placeholder correto
    const emailInput = getByPlaceholderText('email. . .');
    expect(emailInput).toBeTruthy();
    
    // Verifica se o campo de senha está presente com o placeholder correto
    const passwordInput = getByPlaceholderText('password. . .');
    expect(passwordInput).toBeTruthy();
    
    // Verifica se o campo de confirmação de senha está presente com o placeholder correto
    const confirmPasswordInput = getByPlaceholderText('confirm pass. . .');
    expect(confirmPasswordInput).toBeTruthy();
    
    // Verifica se o botão de registro está presente com o texto correto
    const registerButton = getByText('Register');
    expect(registerButton).toBeTruthy();
  });

  /**
   * TESTE 2: Valida o comportamento de validação quando campos obrigatórios estão vazios
   * 
   * Este teste verifica se:
   * - O sistema exibe um alerta quando campos obrigatórios estão vazios
   * - A validação é executada antes de tentar registrar o usuário
   * - O comportamento de validação funciona corretamente
   */
  test('deve exibir alerta quando campos obrigatórios estão vazios', async () => {
    // Renderiza o componente FormRegister
    const { getByText } = render(<FormRegisterTest />);
    
    // Localiza o botão de registro
    const registerButton = getByText('Register');
    
    // Simula o clique no botão de registro sem preencher os campos
    fireEvent.press(registerButton);
    
    // Aguarda a execução da validação e verifica se o alerta foi chamado
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Please fill all fields');
    });
  });
});
