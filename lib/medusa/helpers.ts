import { StoreProductVariant, StoreRegion } from "@medusajs/types";
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
 
  const taxRate = 0 ;

  const amountWithTaxes = amount * (1 + taxRate);

  return amountWithTaxes;
};

/**
 * Takes a product variant, and returns the amount as a decimal including or excluding taxes and the currency code
 */
export const calculateVariantAmount = (variant: StoreProductVariant): Money => {
  const currencyCode = variant.calculated_price?.currency_code ?? 'USD';
  const amount =( variant.calculated_price?.calculated_amount || 0).toString();
  return {
    amount,
    currencyCode
  };
};

 
 
