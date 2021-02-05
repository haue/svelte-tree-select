<script>
  export let name
  import TreeSelect from './index.svelte'

  const data = [
    { text: 'a', value: '1', children: [{ text: 'aa', value: '01' }] },
    {
      text: 'b',
      value: '2',
      children: [
        { text: 'bb', value: '02', children: [{ text: 'bbb', value: '002' }] },
        { text: 'b1', value: '06', children: [] },
      ],
    },
    { text: 'c', value: '3' },
  ]
  function handleChange(e) {
    console.log(e.detail.value)
  }
</script>

<main>
  <div style="width:400px;height:600px;padding:1em;">
    <TreeSelect {data} on:change={handleChange} />
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
