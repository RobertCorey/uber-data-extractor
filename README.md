# Uber Data Extractor - Chrome Extension

A Chrome Extension version of the Uber Data Extractor bookmarklet, found at: https://github.com/ummjackson/uber-data-extractor

This extension is required due to Uber enforcing a Content Security Policy (CSP) on their website, breaking the bookmarklet functionality as it is unable to inject the necessary scripts.

## How To Use

To manually install in Chrome:

1. Download the unpackaged app in zip format, and extract the directory to your machine: https://github.com/ummjackson/uber-data-extractor/archive/chrome-extension.zip

2. Visit the Chrome "Extensions" page and check the Developers Mode box

3. Click "Load unpackaged extension..." and select the directory your just extracted to

You should see a map icon appear in the top right corner of your Chrome browser. To use the extension, simply visit https://riders.uber.com/trips and then click the map icon once. Exercise a little patience as this might take a while. Once the pages are scraped, a CSV file will automatically be downloaded by your browser. 