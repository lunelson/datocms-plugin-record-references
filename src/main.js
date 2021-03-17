import App from './App.svelte';
let app;

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
	app = new App({
		target: document.body,
		props: {plugin}
	});
});

export default app;
