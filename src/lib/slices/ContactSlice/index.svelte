<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { ContactFormSchema } from '$lib/schemas/contact-form-schema';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import HCaptcha from 'svelte-hcaptcha';
	import { browser } from '$app/environment';
  
	export let slice;
	export let context: { form: SuperValidated<ContactFormSchema> };
  
	const { form, errors, enhance, message } = superForm(context.form, {
	  resetForm: false,
	  clearOnSubmit: 'none'
	});
  
	let captchaToken = '';
  
	function onCaptchaVerify(token: string) {
	  captchaToken = token;
	  $form.captcha = token;
	}
  </script>
  
  <form method="POST" use:enhance>
	<div>
	  <label for="name">Name</label>
	  <Input id="name" name="name" bind:value={$form.name} />
	  {#if $errors.name}<span class="error">{$errors.name}</span>{/if}
	</div>
  
	<div>
	  <label for="email">Email</label>
	  <Input id="email" name="email" type="email" bind:value={$form.email} />
	  {#if $errors.email}<span class="error">{$errors.email}</span>{/if}
	</div>
  
	<div>
	  <label>Preferred Contact Method</label>
	  <RadioGroup bind:value={$form.contactMethod}>
		<div class="flex items-center space-x-2">
		  <RadioGroupItem value="email" id="r-email" />
		  <Label for="r-email">Email</Label>
		</div>
		<div class="flex items-center space-x-2">
		  <RadioGroupItem value="phone" id="r-phone" />
		  <Label for="r-phone">Phone</Label>
		</div>
		<div class="flex items-center space-x-2">
		  <RadioGroupItem value="inPerson" id="r-inPerson" />
		  <Label for="r-inPerson">In Person</Label>
		</div>
	  </RadioGroup>
	  {#if $errors.contactMethod}<span class="error">{$errors.contactMethod}</span>{/if}
	</div>
  
	{#if $form.contactMethod === 'phone'}
	  <div>
		<label for="phone">Phone Number</label>
		<Input id="phone" name="phone" type="tel" bind:value={$form.phone} />
		{#if $errors.phone}<span class="error">{$errors.phone}</span>{/if}
	  </div>
	{/if}
  
	{#if $form.contactMethod === 'phone' || $form.contactMethod === 'inPerson'}
	  <div>
		<label for="preferredDate">Preferred Date</label>
		<Input id="preferredDate" name="preferredDate" type="date" bind:value={$form.preferredDate} />
		{#if $errors.preferredDate}<span class="error">{$errors.preferredDate}</span>{/if}
	  </div>
  
	  <div>
		<label for="preferredTime">Preferred Time</label>
		<Input id="preferredTime" name="preferredTime" type="time" bind:value={$form.preferredTime} />
		{#if $errors.preferredTime}<span class="error">{$errors.preferredTime}</span>{/if}
	  </div>
	{/if}
  
	<div>
	  <label for="message">Message</label>
	  <Textarea id="message" name="message" bind:value={$form.message} />
	  {#if $errors.message}<span class="error">{$errors.message}</span>{/if}
	</div>
  
	{#if browser}
	  <div>
		<HCaptcha
		  sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
		  on:verify={({ detail }) => onCaptchaVerify(detail)}
		/>
		{#if $errors.captcha}<span class="error">{$errors.captcha}</span>{/if}
	  </div>
	{/if}
  
	{#if $message}
	  <p class="text-green-600">{$message}</p>
	{/if}
  
	<Button type="submit">Send Message</Button>
  </form>
  
  <style>
	.error {
	  color: red;
	  font-size: 0.8em;
	}
  </style>