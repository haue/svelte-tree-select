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
  let isClearActive = false

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
    dpShow = data.length === 0 ? false : !dpShow
  }
  const handleDpClick = e => {
    const svg = e.target.closest('svg')
    if (svg) {
      const item = svg.closest('.z-sts-item')
      if (!item) return
      if (item.classList.contains('z-sts-item-collopse')) {
        item.classList.remove('z-sts-item-collopse')
      } else {
        item.classList.add('z-sts-item-collopse')
      }
      return
    }
    const itemText = e.target.closest('.z-sts-item-text')
    if (itemText) {
      dpShow = !dpShow
      const value = itemText.dataset.value
      _text = itemText.innerText
      _value = value
      dispatch('change', {
        value: _value,
      })
    }
  }

  function handleBlur() {
    dpShow = false
  }

  function handleArrowMouseEnter(e) {
    if (!_value) return
    isClearActive = true
    e.currentTarget
      .getElementsByTagName('use')[0]
      .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#z-clear')
  }
  function handleArrowMouseLeave(e) {
    if (!_value) return
    isClearActive = false
    e.currentTarget
      .getElementsByTagName('use')[0]
      .setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#z-arrow')
  }
  function handlerInputArrowClick(e) {
    if (isClearActive) {
      _value = null
      _text = ''
      e.stopPropagation()
      isClearActive = false
      e.currentTarget
        .getElementsByTagName('use')[0]
        .setAttributeNS(
          'http://www.w3.org/1999/xlink',
          'xlink:href',
          '#z-arrow'
        )
      dispatch('change', {
        value: _value,
      })
    }
  }
</script>

<div style="display:none">
  <svg>
    <symbol id="z-dp-arrow" viewbox="0 0 1024 1024">
      <path
        d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5
        10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
      />
    </symbol>
    <symbol id="z-arrow" viewbox="0 0 1024 1024">
      <path
        d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9
      262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6
      486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"
      />
      />
    </symbol>
    <symbol id="z-clear" viewbox="0 0 1024 1024">
      <path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"
      />
    </symbol>
  </svg>
</div>

<div class="sts" tabindex="0" on:blur={handleBlur}>
  <div
    class="z-sts-select"
    on:mouseenter={handleArrowMouseEnter}
    on:mouseleave={handleArrowMouseLeave}
    on:click={handleInputClick}
  >
    <div class="z-sts-select-input {_value ? '' : 'noselect'}">{_text}</div>
    <div class="z-sts-select-input-dp" on:click={handlerInputArrowClick}>
      <svg viewBox="64 64 896 896" focusable="false" fill="currentColor">
        <use xlink:href="#z-arrow" />
      </svg>
    </div>
  </div>
  <div
    class="z-sts-dp {dpShow ? '' : 'hide'}"
    on:click={handleDpClick}
    unselectable="on"
    onselectstart="return false;"
  >
    <ItemRec {data} />
  </div>
</div>

<style>
  .sts {
    width: 100%;
    text-align: left;
    position: relative;
    box-sizing: border-box;
  }
  .sts:focus {
    outline: none !important;
    box-shadow: 0 0 4px #40a9ff;
  }
  .z-sts-select {
    width: 100%;
    height: 2em;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    display: flex;
    padding: 0.2em 0.5em;
    box-sizing: border-box;
  }
  .z-sts-select:hover {
    border: 1px solid #40a9ff;
  }
  .z-sts-select-input {
    flex-grow: 1;
  }
  .z-sts-select-input-dp {
    width: 1em;
    color: #d9d9d9;
    transform: translateY(0.3em);
  }
  .z-sts-dp {
    width: 100%;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
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
