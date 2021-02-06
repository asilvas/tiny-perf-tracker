module.exports = function(api) {
	api.cache(true);

  const noModules = String(process.env.BABEL_NO_MODULES) === 'true';

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					loose: true,
					// Don't transform modules when using esbuild
					modules: noModules ? false : 'auto',
					targets: {
						browsers: ['last 2 versions']
					}
				}
			]
		],
		include: ['**/src/**/*.js', '**/test/**/*.js']
	};
};
