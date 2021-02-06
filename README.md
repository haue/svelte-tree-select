# svelte-tree-select

Tree selection control.

# Usage

Install the package:

```
yarn add svelte-tree-select
```

`App.svelte`

```html
<script>
  import TreeSelect from 'svelte-tree-select'
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
<TreeSelect {data} on:change={handleChange} />
```

