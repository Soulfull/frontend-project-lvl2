# Makefile

install:
	npm ci

publish:
	npm publish --dry-run

eslint:
	npx eslint .

test:
	npm test