import { render, screen } from '@testing-library/react';
import RepositoriesSummary from './RepositoriesSummary';

test('displays the primary language of the repository', () => {
	const language = 'Javascript';
	const repository = {
		stargazers_count: 218643,
		open_issues: 1599,
		forks: 46120,
		language,
	};
	render(<RepositoriesSummary repository={repository} />);
	const languageText = screen.getByText(language);
	expect(languageText).toBeInTheDocument();
});
