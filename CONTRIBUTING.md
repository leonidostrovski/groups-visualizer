# Contributing

Issues and pull requests are welcome.
If you find a bug or want to improve the project, please open an issue or submit a PR on GitHub.

## Reporting Issues

- Check existing issues before opening a new one.
- Include your Home Assistant version, browser, and a description of the problem.
- Screenshots or console errors are very helpful.

## Submitting Pull Requests

1. Fork the repository.
2. Create a feature branch: `git checkout -b my-feature`
3. Make your changes in `src/`.
4. Build the dist: `npm run build`
5. Commit both `src/` and `dist/` changes.
6. Open a pull request with a clear description of what changed and why.

## Development Setup

```bash
npm install
npm run build
```

Copy `dist/groups-visualizer.js` to your HA instance under `/config/www/` and reference it as a Lovelace resource.

## Code Style

- Keep changes focused and minimal.
- Follow the existing patterns in each file.
- No external dependencies beyond the existing ones (dagre, d3, lit).
