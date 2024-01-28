<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Slider } from "$lib/components/ui/slider";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { fromASS } from "../utils/serde";
  import { onMount } from "svelte";
  let framerate = [30];

  let subtitle_content: string | null = null;

  let reader: FileReader | null = null;

  function readFile(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];

      reader?.readAsText(selectedFile);
    }
  }

  function Process() {
    if (subtitle_content !== null) {
      const subtitle = fromASS(subtitle_content, framerate[0]);
    }
  }

  onMount(() => {
    reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        subtitle_content = e.target.result as string;
      }
    };
  });
</script>

<div class="flex flex-col gap-3 py-10 sm:px-10 md:px-20 lg:px-32">
  <h1 class="font-bold md:text-2xl lg:text-3xl">Ass Subtitle to AviUtl Exo</h1>

  <Label>Upload ass file</Label>
  <Input on:change={readFile} accept=".ass" type="file" class="max-w-xs" />

  <Label>Specify the framerate</Label>
  <div class="flex flex-row gap-3">
    <Input type="number" placeholder="framerate" class="w-20" bind:value={framerate[0]} />
    <Slider min={1} max={120} class="max-w-sm" bind:value={framerate}></Slider>
  </div>
  <Label>Resolution</Label>
  <div class="flex flex-row gap-3">
    <Input type="number" placeholder="Width" class="w-32" value={1280} />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-x my-auto">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </svg>
    <Input type="number" placeholder="Height" class="w-32" value={720} />
  </div>
  <Button
    on:click={() => {
      console.log(subtitle_content?.split("\n"));
    }}
    class="w-64">Convert</Button
  >
  {#if subtitle_content !== null}
    <div>
      <Label>Subtitle Comtent</Label>
      <pre>{subtitle_content}</pre>
    </div>
  {/if}
</div>
