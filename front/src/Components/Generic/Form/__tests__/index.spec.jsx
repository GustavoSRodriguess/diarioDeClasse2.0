import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ReusableForm from '../index';

// Mock do useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/login'
  })
}));

describe('ReusableForm Component', () => {
  const mockOnSubmit = jest.fn();
  
  // Props padrão para o componente genérico
  const defaultProps = {
    onSubmit: mockOnSubmit,
    title: "Test Form",
    fields: [
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Password', type: 'password', required: true }
    ]
  };

  const setup = (props = {}) => {
    const finalProps = { ...defaultProps, ...props };
    return render(
      <BrowserRouter>
        <ReusableForm {...finalProps} />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  // Testa se o componente renderiza corretamente com diferentes props
  test('renders with custom title and fields', () => {
    const customProps = {
      title: "Custom Form",
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true }
      ]
    };
    setup(customProps);
    expect(screen.getByText('Custom Form')).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  // Testa validação de campos obrigatórios
  test('shows validation errors for empty required fields', async () => {
    setup();
    fireEvent.click(screen.getByText('Submit'));
    
    expect(await screen.findByText('Email is required')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  // Testa validação de email
//   test('validates email format', async () => {
//     setup();
//     const emailInput = screen.getByLabelText(/email/i);
//     userEvent.type(emailInput, 'invalid-email');
    
//     fireEvent.click(screen.getByText('Submit'));
//     expect(await screen.findByText('Please enter a valid email')).toBeInTheDocument();
//   });

  // Testa campos customizados
  test('renders custom input when provided', () => {
    const customFields = [{
      name: 'custom',
      label: 'Custom Input',
      customInput: ({ value, onChange }) => (
        <select data-testid="custom-select" value={value} onChange={onChange}>
          <option value="">Select...</option>
        </select>
      )
    }];
    
    setup({ fields: customFields });
    expect(screen.getByTestId('custom-select')).toBeInTheDocument();
  });

  // Testa links condicionais
  test('shows conditional links on login path', () => {
    setup();
    expect(screen.getByText('Não tem uma conta? Cadastre-se')).toBeInTheDocument();
    expect(screen.getByText('Esqueceu sua senha?')).toBeInTheDocument();
  });
});