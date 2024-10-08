<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Contact Kalvex - Innovate with Integrity</title>
  <meta name="description" content="Reach out to Kalvex and discover how we can help your business thrive with Compliance Automation, QA, and DevOps." />
</svelte:head>

<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center text-blue-600">Let's Talk!</h1>
  
  <p class="text-lg text-center mb-8">
    We’re here to help you unlock the power of automation and governance in regulated industries. Reach out for a conversation—whether you're curious about compliance, need DevOps solutions, or want to discuss how Kalvex can drive innovation at your company.
  </p>

  <Card class="w-full max-w-md mx-auto mb-12">
    <CardHeader>
      <CardTitle class="text-2xl text-blue-600">Contact Information</CardTitle>
      <CardDescription class="text-gray-700">We’d love to hear from you!</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <p class="text-gray-800"><strong>Email:</strong> contact [at] kalvex dot dev</p>
    </CardContent>
    <CardFooter class="flex justify-center">
      <a href="https://cal.com/kalvex-jaimie/30min" target="_blank">
        <Button class="bg-blue-600 text-white px-6 py-2 rounded-lg">Schedule a Consultation</Button>
      </a>
    </CardFooter>
  </Card>

  <div class="text-center">
    <h2 class="text-2xl font-semibold text-blue-600">Follow Us on LinkedIn</h2>
    <p class="text-lg text-gray-700 mb-6">
      Stay up to date with the latest insights and updates from Kalvex.
    </p>
    <a href="https://www.linkedin.com/company/kalvex" target="_blank" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">
      Visit our LinkedIn
    </a>
  </div>

  <div class="mt-12 text-center">
    <p class="text-lg text-gray-800">Our office hours are Monday to Friday, 9am to 5pm EST.</p>
    <p class="text-lg text-gray-800">We typically respond to all inquiries within 24 hours.</p>
  </div>
</div>
