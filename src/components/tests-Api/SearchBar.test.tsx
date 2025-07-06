import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // ✅ vitest globals
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
    it('renders search input and triggers onSearch when form is submitted', () => {
        const onSearch = vi.fn(); // ✅ mock function from vitest

        render(<SearchBar onSearch={onSearch} isLoading={false} />);

        const input = screen.getByPlaceholderText(/search for books/i);
        fireEvent.change(input, { target: { value: 'Harry Potter' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onSearch).toHaveBeenCalledWith('Harry Potter'); // ✅ matcher from vitest
    });
});
