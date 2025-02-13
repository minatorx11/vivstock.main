```vue
<template>
  <div class="bg-transparent rounded-lg pt-6 px-6">
    <div class="w-full h-[300px] relative -left-[25px] -top-[40px]">
      <div id="tradingview-widget-container" class="w-full h-full">
        <div class="tradingview-widget-container__widget w-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const container = document.getElementById('tradingview-widget-container')
  if (!container) return

  // Create and load TradingView widget script
  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js'
  script.type = 'text/javascript'
  script.async = true
  script.innerHTML = `
    {
      "symbols": [
        [
          "Apple",
          "AAPL|1D"
        ],
        [
          "NASDAQ:TSLA|1D"
        ],
        [
          "NASDAQ:NVDA|1D"
        ],
        [
          "NASDAQ:META|1D"
        ],
        [
          "NASDAQ:AVGO|1D"
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "colorTheme": "dark",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "no",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": true,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "line",
      "backgroundColor": "rgba(19, 23, 34, 0)",
      "lineWidth": 3,
      "lineType": 2
    }`

  container.appendChild(script)
})
</script>
```