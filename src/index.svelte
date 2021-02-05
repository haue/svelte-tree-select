<script>
  import ItemRec from './ItemRec.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let data = []
  export let defaultValue = null
  export let defaultText = ''
  let _text = ''
  let _value = null
  let dpShow = false

  function getChild(d, v) {
    let r = null
    if (!Array.isArray(d)) {
      throw 'not array'
    }
    d.every(x => {
      if (x.value == v) {
        r = x
        return false
      }
      if (Array.isArray(x.children)) {
        r = getChild(x.children, v)
      }
      if (r != null) return false
      return true
    })
    return r
  }

  const defaultItem = getChild(data, defaultValue)
  _value = defaultItem?.value
  _text = defaultItem?.text ?? (defaultText ? defaultText : '请选择')
  const handleInputClick = () => {
    dpShow = !dpShow
  }
  const handleDpClick = e => {
    const svg = e.target.closest('svg')
    if (svg) {
      const item = svg.closest('.item')
      if (!item) return
      if (item.classList.contains('item-collopse')) {
        item.classList.remove('item-collopse')
      } else {
        item.classList.add('item-collopse')
      }
      return
    }
    const itemText = e.target.closest('.z-item-text')
    if (itemText) {
      dpShow = !dpShow
      const value = itemText.dataset.value
      _text = itemText.innerText
      _value = value
      dispatch('change', {
        value: value,
      })
    }
  }
</script>

<style>
  .z-st {
    width: 100%;
    text-align: left;
    position: relative;
  }
  .z-st-select {
    width: 100%;
    height: 2em;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    display: flex;
    padding: 0.2em 0.5em;
    box-sizing: border-box;
  }
  .z-st-select-input {
    flex-grow: 1;
  }
  .z-st-select-input-dp {
    width: 1em;
    color: #d9d9d9;
    transform: translateY(0.2em);
  }
  .z-dp {
    width: 100%;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    padding: 0.2em 0.5em;
    box-sizing: border-box;
    position: absolute;
    top: calc(2em + 2px);
    left: 0;
    user-select: none;
    max-height: 12em;
    overflow: auto;
  }
  .hide {
    display: none;
  }
  .noselect {
    color: #d9d9d9;
  }
</style>

<div class="z-st">
  <div class="z-st-select" on:click={handleInputClick}>
    <div class="z-st-select-input {_value ? '' : 'noselect'}">{_text}</div>
    <div class="z-st-select-input-dp">
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="down"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true">
        <path
          d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9
          262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6
          486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
      </svg>
    </div>
  </div>
  <div
    class="z-dp {dpShow ? '' : 'hide'}"
    on:click={handleDpClick}
    unselectable="on"
    onselectstart="return false;">
    <ItemRec {data} />
  </div>
</div>
