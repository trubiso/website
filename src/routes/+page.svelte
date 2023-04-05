<script lang="ts">
	import { t } from '$lib/localization';
	import Emote from '$lib/text/Emote.svelte';
	import './style.scss';
</script>

<main>
	<h1>{$t('homeDev.title')}</h1>
	<!-- svelte-ignore a11y-distracting-elements -->
	<marquee class="big flashing flashy silly">{$t('homeDev.unstableWarning')}</marquee>
	<p>
		<b class="flashing silly">{$t('homeDev.warningPre')}</b> {$t('homeDev.warning1')}
		<span class="big">https://trubiso.tk</span>{$t('homeDev.warning2')}
		<b>{$t('homeDev.warning3')}</b>{$t('homeDev.warning4')}
	</p>
	<p>{$t('homeDev.report')}</p>
	<br />
	<p>{$t('homeDev.scare')}</p>
	<br />
	<Emote name="silly" spinning />
	<Emote name="silly" scaling />
	<Emote name="silly" spinning scaling />
	<br />
	<p class="silly">{$t('homeDev.laugh')}</p>
	<br /><br /><br /><br /><br />
	<p>todo:</p>
	<ul>
		<li>smilies page</li>
		<li>don't click page</li>
		<li>games page (might change to "projects")</li>
		<li>add an accent color for regular text</li>
		<li>navbar rearranging and hiding in options</li>
		<li>theme preview in options</li>
		<li>translation page</li>
		<li>change the questions to markdown</li>
		<li>have a regular homepage version for non-development trubiso.tk</li>
		<li>make the rewrite the default and FINALLY get rid of the old trubiso.tk</li>
		<li>profiles</li>
		<li>to-do list page</li>
		<li>sharing themes around to the world</li>
		<li>center the arabic logo</li>
		<li>bug tracker page (and hence move all of these things to it)</li>
		<li>probably so much more that i forgot</li>
	</ul>
	<p>finished pages:</p>
	<ul>
		<li><a href="/">homepage</a></li>
		<li><a href="/hsvtester">colorpicker tester (technically, just a test)</a></li>
		<li><a href="/kity">kities</a></li>
		<li><a href="/q+a">q+a</a></li>
		<li><a href="/options">options (missing previews for themes and navbar rearranging)</a></li>
	</ul>
	<p>
		<b>BEWARE</b> of the sidebar, every link but the pages specified above is broken, the website might
		feel bad if you click them :(
	</p>
	<p>but don't beware too much of the sidebar, it has cool new options as well :)</p>
	<p>also thanks for sticking around, i hope you didn't die in the pool of bugs :P</p>
</main>
