<script>
  export let data = []
</script>

<style>
  .item-collopse svg {
    transform: rotate(-90deg);
  }
  .z-item-text {
    cursor: pointer;
  }
  .item-collopse .children-container {
    display: none;
  }
</style>

<div style="display:none">
  <svg>
    <symbol id="dp-arrow" viewbox="0 0 1024 1024">
      <path
        d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5
        10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
    </symbol>
  </svg>
</div>
{#each data as item}
  <div class="item item-collopse">
    <div>
      {#if item.children && item.children.length > 0}
        <svg width=".8em" height=".8em" style="cursor:pointer">
          <use xlink:href="#dp-arrow" />
        </svg>
      {:else}
        <svg width=".8em" height=".8em" />
      {/if}
      <span class="z-item-text" data-value={item.value}>{item.text}</span>
    </div>
    {#if item.children && item.children.length > 0}
      <div style="padding-left: 1em;" class="children-container">
        <svelte:self {...{ data: item.children }} />
      </div>
    {/if}
  </div>
{/each}
