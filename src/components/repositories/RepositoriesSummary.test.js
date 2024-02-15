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
	for (const key in repository) {
		const value = repository[key];
		const element = screen.getByText(new RegExp(value));
		expect(element).toBeInTheDocument();
	}
});
