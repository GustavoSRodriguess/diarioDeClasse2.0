import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Login from '../index';

describe('Login Component', () => {
  // Setup do userEvent
  const user = userEvent.setup();
  
  // Mock do console.log
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  const setup = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  test('renders login form with correct fields and title', () => {
    setup();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('handles login form submission with valid data', async () => {
    setup();
    
    await user.type(screen.getByLabelText(/username/i), 'testuser');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    await user.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith('Form submitted:', {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

//   test('provides navigation to register page', () => {
//     setup();
//     const registerLink = screen.getByText('Não tem uma conta? Cadastre-se');
//     expect(registerLink).toBeInTheDocument();
//     expect(registerLink.getAttribute('href')).toBe('/register');
//   });

//   test('provides navigation to forgot password page', () => {
//     setup();
//     const forgotPasswordLink = screen.getByText('Esqueceu sua senha?');
//     expect(forgotPasswordLink).toBeInTheDocument();
//     expect(forgotPasswordLink.getAttribute('href')).toBe('/forgot-password');
//   });
});