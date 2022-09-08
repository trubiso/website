<script lang="ts">
	import MiscOptions from './MiscOptions.svelte';
import LangPicker from './pickers/LangPicker.svelte';
	import ThemePicker from './pickers/ThemePicker.svelte';
import ThemeMaker from './thememaker/ThemeMaker.svelte';
</script>

<main>
	<h1>optionse !</h1>
	<p>heer yu can customiz how da paeg luks 4 yu !</p>

	<h2>languig</h2>
	<LangPicker />
	<p><i>if da languig yu speek is not heer, yu can hed to da transletion paeg n translet da paeg to yur languig !</i></p>

	<h2>theem</h2>
	<h3>pik wan of da premaed theemz...</h3>
	<ThemePicker />
	<h3>or mek wan urslef !</h3>
	<ThemeMaker />

	<h2>miscelanius</h2>
	<MiscOptions />

</main>
