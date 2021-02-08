<script>
  export let data = []
</script>

{#each data as item}
  <div class="z-sts-item z-sts-item-collopse">
    <div class="z-sts-line">
      {#if item.children && item.children.length > 0}
        <svg class="w-3 h-3 cursor-pointer">
          <use xlink:href="#z-dp-arrow" />
        </svg>
      {:else}
        <div class="w-3 h-3 inline-block" />
      {/if}
      <span class="z-sts-item-text" data-value={item.value}>{item.text}</span>
    </div>
    {#if item.children && item.children.length > 0}
      <div class="pl-4 children-container">
        <svelte:self {...{ data: item.children }} />
      </div>
    {/if}
  </div>
{/each}

<style>
  svg {
    display: inline-block;
  }
  .z-sts-item-collopse svg {
    transform: rotate(-90deg);
  }
  .z-sts-item-text {
    cursor: pointer;
  }
  .z-sts-item-collopse .children-container {
    display: none;
  }
  .z-sts-line {
    display: flex;
    align-items: center;
  }
  .z-sts-line > .z-sts-item-text {
    flex-grow: 1;
  }
  .z-sts-line > .z-sts-item-text:hover {
    background-color: #e5e7eb;
  }
</style>
