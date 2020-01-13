module.exports = {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	setupFiles: ['<rootDir>src/config.ts'],
	transform: {
		'.(ts|tsx)': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			compiler: 'ttypescript',
		},
	},
};
