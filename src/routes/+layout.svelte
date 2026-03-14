<script lang="ts">
	import "$lib/styles/app.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<title>Memento Mori</title>
	<link rel="icon" href={favicon} />
	<meta name="description" content="Remember you must die." />
</svelte:head>

{@render children()}
