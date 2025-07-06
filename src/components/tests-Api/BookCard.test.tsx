import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BookCard } from '../BookCard';
import { Book } from '../../types/book';

describe('BookCard', () => {
    const mockBook: Book = {
        key: 'OL12345W',
        title: 'The Great Gatsby',
        author_name: ['F. Scott Fitzgerald'],
        first_publish_year: 1925,
        cover_i: 123456,
        subject: ['Classic', 'American Literature', 'Novel'],
        publisher: ['Scribner'],
        number_of_pages_median: 180,
    };

    it('renders book title, author, year, and cover image', () => {
        render(<BookCard book={mockBook} onClick={() => {}} />);

        expect(screen.getByText('The Great Gatsby')).toBeInTheDocument();
        expect(screen.getByText('F. Scott Fitzgerald')).toBeInTheDocument();
        expect(screen.getByText('1925')).toBeInTheDocument();
        expect(screen.getByAltText(/Cover of The Great Gatsby/i)).toBeInTheDocument();

        // Tags
        expect(screen.getByText('Classic')).toBeInTheDocument();
        expect(screen.getByText('American Literature')).toBeInTheDocument();
        expect(screen.getByText('Novel')).toBeInTheDocument();
    });

    it('renders fallback badge for subjects when more than 3', () => {
        const extendedSubjects = ['A', 'B', 'C', 'D'];
        render(<BookCard book={{ ...mockBook, subject: extendedSubjects }} onClick={() => {}} />);

        expect(screen.getByText('+1 more')).toBeInTheDocument();
    });

    it('calls onClick when card is clicked', () => {
        const handleClick = vi.fn();
        render(<BookCard book={mockBook} onClick={handleClick} />);

        // Click on the book title (acts as a child inside the clickable Card)
        fireEvent.click(screen.getByText('The Great Gatsby'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
