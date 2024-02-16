import { render, screen } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';

const renderComponent = () => {
	const repository = {
		full_name: 'facebook/react',
		language: 'JavaScript',
		description: 'The library for web and native user interfaces.',
		owner: {
			login: 'facebook',
			id: 69631,
			node_id: 'MDEyOk9yZ2FuaXphdGlvbjY5NjMx',
			avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
			gravatar_id: '',
			url: 'https://api.github.com/users/facebook',
			html_url: 'https://github.com/facebook',
			followers_url: 'https://api.github.com/users/facebook/followers',
			following_url:
				'https://api.github.com/users/facebook/following{/other_user}',
			gists_url: 'https://api.github.com/users/facebook/gists{/gist_id}',
			starred_url:
				'https://api.github.com/users/facebook/starred{/owner}{/repo}',
			subscriptions_url:
				'https://api.github.com/users/facebook/subscriptions',
			organizations_url: 'https://api.github.com/users/facebook/orgs',
			repos_url: 'https://api.github.com/users/facebook/repos',
			events_url:
				'https://api.github.com/users/facebook/events{/privacy}',
			received_events_url:
				'https://api.github.com/users/facebook/received_events',
			type: 'Organization',
			site_admin: false,
		},
		name: 'react',
		html_url: 'https://github.com/facebook/react',
	};
	render(
		<MemoryRouter>
			<RepositoriesListItem repository={repository} />
		</MemoryRouter>
	);
	return { repository };
};

test('shows a link to the github homepage for this repository', async () => {
	const { repository } = renderComponent();
	await screen.findByRole('img', { name: 'JavaScript' });
	const link = screen.getByRole('link', { name: /github repository/i });
	expect(link).toHaveAttribute('href', repository.html_url);
});
