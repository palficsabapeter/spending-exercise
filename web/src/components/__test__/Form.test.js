import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form from '../Form';

test('should reset form after submitting', () => {
    render(<Form />);
    const submitBtn = screen.getByRole('button');
    const desc = screen.getByRole('textbox');
    const amount = screen.getByRole('spinbutton');

    userEvent.type(desc, 'test');
    userEvent.type(amount, '1000');
    expect(desc.value).toMatch('test');
    expect(amount.value).toMatch('1000');

    fireEvent.click(submitBtn);
    expect(desc.value).toMatch('');
    expect(amount.value).toMatch('');
});

test('should display error if description is missing', () => {
    render(<Form />);
    const submitBtn = screen.getByRole('button');
    const desc = screen.getByRole('textbox');
    const amount = screen.getByRole('spinbutton');

    userEvent.type(amount, '1000');
    expect(desc.value).toMatch('');
    expect(amount.value).toMatch('1000');

    fireEvent.click(submitBtn);
    expect(desc.value).toMatch('');
    expect(amount.value).toMatch('1000');

    const error = screen.getByText('Description cannot be empty');
    expect(error).toBeInTheDocument();
});

test('should display error if amount is zero', () => {
    render(<Form />);
    const submitBtn = screen.getByRole('button');
    const desc = screen.getByRole('textbox');
    const amount = screen.getByRole('spinbutton');

    userEvent.type(desc, 'test');
    expect(desc.value).toMatch('test');
    expect(amount.value).toMatch('0');

    fireEvent.click(submitBtn);
    expect(desc.value).toMatch('test');
    expect(amount.value).toMatch('0');

    const error = screen.getByText('Amount cannot be zero or negative');
    expect(error).toBeInTheDocument();
});
