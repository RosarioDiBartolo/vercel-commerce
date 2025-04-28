import { RegionCountryDTO, StoreProductVariant, StoreRegion } from "@medusajs/types";
import { isEmpty } from "lib/utils";
import { Money } from "./types";

type ComputeAmountParams = {
  amount: number;
  region: StoreRegion;
  includeTaxes?: boolean;
};
/**
 * Takes an amount, a region, and returns the amount as a decimal including or excluding taxes
 */
export const computeAmount = ({ amount,   }: ComputeAmountParams) => {
  const toDecimal = convertToDecimal(amount,  );

  const taxRate = 0 ;

  const amountWithTaxes = toDecimal * (1 + taxRate);

  return amountWithTaxes;
};

/**
 * Takes a product variant, and returns the amount as a decimal including or excluding taxes and the currency code
 */
export const calculateVariantAmount = (variant: StoreProductVariant): Money => {
  const currencyCode = variant.calculated_price?.currency_code ?? 'USD';
  const amount = convertToDecimal(variant.calculated_price?.calculated_amount || 0, currencyCode).toString();
  return {
    amount,
    currencyCode
  };
};

// Some currencies do not use decimal subunits (like cents)
const noDivisionCurrencies = ['krw', 'jpy', 'vnd'];

/**
 * Converts a raw amount to a decimal amount, considering if the currency uses cents
 */
export const convertToDecimal = (amount: number, currencyCode = 'USD') => {
  const divisor = noDivisionCurrencies.includes(currencyCode.toLowerCase()) ? 1 : 100;
  return Math.floor(amount) / divisor;
};

const getTaxRate = (region?: RegionCountryDTO) => {
  return region && !isEmpty(region) ? region?.tax_rate / 100 : 0;
};
