(function(global){
  'use strict';

  function safeNumber(value, fallback){
    var resolvedFallback = fallback === undefined ? 0 : fallback;
    var numeric = Number(value);
    if(!Number.isFinite(numeric)) return resolvedFallback;
    return numeric;
  }

  function safeDivide(numerator, denominator, fallback){
    var resolvedFallback = fallback === undefined ? 0 : fallback;
    var safeDenominator = safeNumber(denominator, 0);
    if(safeDenominator === 0) return resolvedFallback;
    var result = safeNumber(numerator, 0) / safeDenominator;
    return Number.isFinite(result) ? result : resolvedFallback;
  }

  function safePercent(value, fallback){
    var resolvedFallback = fallback === undefined ? 0 : fallback;
    return safeNumber(value, resolvedFallback);
  }

  function clampNumber(value, min, max, fallback){
    var resolvedFallback = fallback === undefined ? 0 : fallback;
    var numeric = safeNumber(value, resolvedFallback);
    var safeMin = safeNumber(min, numeric);
    var safeMax = safeNumber(max, numeric);
    if(safeMin > safeMax){
      var originalMin = safeMin;
      safeMin = safeMax;
      safeMax = originalMin;
    }
    return Math.max(safeMin, Math.min(safeMax, numeric));
  }

  function formatCurrencySafe(value, fallback){
    var resolvedFallback = fallback === undefined ? '$0' : fallback;
    var numeric = safeNumber(value, null);
    if(numeric === null) return resolvedFallback;
    return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(numeric);
  }

  function formatPercentSafe(value, fallback){
    var resolvedFallback = fallback === undefined ? '0%' : fallback;
    var numeric = safePercent(value, null);
    if(numeric === null) return resolvedFallback;
    return new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(numeric) + '%';
  }

  global.safeNumber = safeNumber;
  global.safeDivide = safeDivide;
  global.safePercent = safePercent;
  global.clampNumber = clampNumber;
  global.formatCurrencySafe = formatCurrencySafe;
  global.formatPercentSafe = formatPercentSafe;
})(typeof window !== 'undefined' ? window : globalThis);
