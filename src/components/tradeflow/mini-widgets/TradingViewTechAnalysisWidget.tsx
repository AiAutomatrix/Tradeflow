
'use client';

import React, { useMemo } from 'react';
import type { FC } from 'react';

interface TradingViewTechAnalysisWidgetProps {
  symbol: string;
}

const TradingViewTechAnalysisWidget: React.FC<TradingViewTechAnalysisWidgetProps> = ({ symbol }) => {
  const widgetConfig = useMemo(() => ({
    interval: "30m",
    width: "100%",
    isTransparent: false, // Keep false if you want TradingView's dark theme to manage bg
    height: "100%",
    symbol: symbol, 
    showIntervalTabs: false,
    displayMode: "multiple",
    locale: "en",
    colorTheme: "dark"
  }), [symbol]); 

  const srcDocContent = useMemo(() => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TradingView Technical Analysis</title>
      <style>
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #222222; /* Or transparent if isTransparent:true in widgetConfig */
          box-sizing: border-box;
        }
        *, *::before, *::after { box-sizing: inherit; }
        .tradingview-widget-container {
          width: 100%;
          height: 100%;
        }
        .tradingview-widget-container__widget {
            width: 100% !important; 
            height: 100% !important;
        }
      </style>
    </head>
    <body>
      <div class="tradingview-widget-container">
        <div class="tradingview-widget-container__widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
          ${JSON.stringify(widgetConfig)}
        </script>
      </div>
    </body>
    </html>
  `, [widgetConfig]);

  return (
    // This component is designed to be a direct child of a TabsContent that is already flex-grow.
    // The iframe itself will fill the space given by TabsContent.
    <iframe
      key={symbol} 
      srcDoc={srcDocContent}
      title="TradingView Technical Analysis Widget"
      className="w-full h-full" // Ensures iframe fills its parent (TabsContent)
      style={{ border: 'none' }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  );
};

export default TradingViewTechAnalysisWidget;
