import { render, screen } from '@testing-library/react'

import App from './App'

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /FocusFlow/i,
        level: 1
      })
    ).toBeInTheDocument();

    // L'ancien texte de boilerplate n'est plus présent dans la nouvelle UI
    // expect(
    //   screen.getByText(
    //     /This is a boilerplate build with Vite, React 18, TypeScript, Vitest, Testing Library, TailwindCSS 3, Eslint and Prettier./i
    //   )
    // ).toBeInTheDocument();

    // L'ancien lien 'Start building for free' n'existe plus dans la nouvelle UI
    // expect(
    //   screen.getByRole('link', {
    //     name: /start building for free/i
    //   })
    // ).toBeInTheDocument();

    // L'ancien logo ou image n'existe plus dans la nouvelle UI
    // expect(screen.getByRole('img')).toBeInTheDocument();

    expect(container.firstChild).toBeInTheDocument()
  })
})
