import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('displays the copyright text', () => {
    render(<Footer />);
  
    // Check if the copyright text is present
    const copyrightText = screen.getByText(`© ${new Date().getFullYear()} VENUE | All rights reserved`);
    expect(copyrightText).toBeInTheDocument();
  });

  test('displays the site creator information and social media links', () => {
    render(<Footer />);
  
    // Check if the site creator name is present
    const siteCreatorName = screen.getByText('This site was created by: Andrew J Salas');
    expect(siteCreatorName).toBeInTheDocument();

    // Check if the GitHub link is present
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/andrewjsalas');

    // Check if the LinkedIn link is present
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/andrewjsalas');
  });
});
