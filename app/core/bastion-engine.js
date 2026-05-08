(function(global){
  'use strict';

  var guards = {
    safeNumber: global.safeNumber || function(value,fallback){
      var resolvedFallback = fallback === undefined ? 0 : fallback;
      var numeric = Number(value);
      return Number.isFinite(numeric) ? numeric : resolvedFallback;
    },
    safeDivide: global.safeDivide || function(numerator,denominator,fallback){
      var resolvedFallback = fallback === undefined ? 0 : fallback;
      var safeDenominator = guards.safeNumber(denominator,0);
      if(safeDenominator === 0) return resolvedFallback;
      var result = guards.safeNumber(numerator,0) / safeDenominator;
      return Number.isFinite(result) ? result : resolvedFallback;
    },
    clampNumber: global.clampNumber || function(value,min,max,fallback){
      var numeric = guards.safeNumber(value,fallback === undefined ? 0 : fallback);
      return Math.max(min,Math.min(max,numeric));
    }
  };

  function normalizeAnnualRate(value,fallback){
    var resolvedFallback = fallback === undefined ? 0 : fallback;
    var rate = guards.safeNumber(value,resolvedFallback);
    if(!Number.isFinite(rate)) return resolvedFallback;
    if(Math.abs(rate) > 1) return rate / 100;
    return rate;
  }

  function monthlyToAnnual(value){
    return guards.safeNumber(value,0) * 12;
  }

  function annualToMonthly(value){
    return guards.safeDivide(value,12,0);
  }

  function calculateSavingsRate(income,savings){
    var rate = guards.safeDivide(Math.max(0,guards.safeNumber(savings,0)),Math.max(0,guards.safeNumber(income,0)),0);
    return guards.clampNumber(rate,0,1,0);
  }

  function calculateMonthlyGap(income,expenses){
    return annualToMonthly(guards.safeNumber(income,0) - guards.safeNumber(expenses,0));
  }

  function calculateNetWorth(assets,debts){
    return guards.safeNumber(assets,0) - guards.safeNumber(debts,0);
  }

  function calculateDebtToAssetRatio(debt,assets){
    return guards.safeDivide(Math.max(0,guards.safeNumber(debt,0)),Math.max(0,guards.safeNumber(assets,0)),0);
  }

  function calculateWithdrawalRate(annualWithdrawal,portfolio){
    return guards.safeDivide(Math.max(0,guards.safeNumber(annualWithdrawal,0)),Math.max(0,guards.safeNumber(portfolio,0)),0);
  }

  function calculateScenarioDelta(baseValue,scenarioValue){
    return guards.safeNumber(scenarioValue,0) - guards.safeNumber(baseValue,0);
  }

  function firstRunoutAge(path){
    if(!path || !path.labels || !path.values) return null;
    for(var i=0;i<path.values.length;i++){
      if(guards.safeNumber(path.values[i],0) <= 0) return path.labels[i];
    }
    return null;
  }

  global.BastionEngine = {
    normalizeAnnualRate: normalizeAnnualRate,
    monthlyToAnnual: monthlyToAnnual,
    annualToMonthly: annualToMonthly,
    calculateSavingsRate: calculateSavingsRate,
    calculateMonthlyGap: calculateMonthlyGap,
    calculateNetWorth: calculateNetWorth,
    calculateDebtToAssetRatio: calculateDebtToAssetRatio,
    calculateWithdrawalRate: calculateWithdrawalRate,
    calculateScenarioDelta: calculateScenarioDelta,
    firstRunoutAge: firstRunoutAge
  };
})(typeof window !== 'undefined' ? window : globalThis);
