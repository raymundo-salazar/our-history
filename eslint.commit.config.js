import baseConfig from "./eslint.config.js"

export default [
	{ ignores: ["dist", "node_modules", "print", "**/_*", "**/_*/**"] },
	...baseConfig,
	{
		rules: {
			"no-restricted-syntax": [
				"error",
				{
					selector:
						"CallExpression[callee.object.name='console'][callee.property.name='log']",
					message:
						"Unexpected console.log usage. Please remove all console.log statements.",
				},
			],
		},
	},
]
