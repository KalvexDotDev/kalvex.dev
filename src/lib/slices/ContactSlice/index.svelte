<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
  
	export let slice;
  
	let showEmail = false;
	let email = 'Click to reveal';
  
	function revealEmail() {
	  email = slice.primary.email;
	  showEmail = true;
	}
  </script>
  
  <Card class="w-full max-w-md mx-auto">
	<CardHeader>
	  <CardTitle>{slice.primary.title}</CardTitle>
	  <CardDescription>{slice.primary.description}</CardDescription>
	</CardHeader>
	<CardContent>
	  <p>Email: {email}</p>
	</CardContent>
	<CardFooter>
	  <Button 
		on:click={revealEmail} 
		disabled={showEmail}
		class="w-full"
	  >
		{showEmail ? 'Email Revealed' : 'Reveal Email'}
	  </Button>
	</CardFooter>
  </Card>