import "./PayPalButton.css";

import { FunctionComponent, useState } from "react";
import * as React from "react";

export interface PayPalButtonProps {
  itemName: string;
  hostedButtonId: string;
  priceOptions?: PayPalSelectOption[];
  priceOptionName?: string;
  username: string;
}

export interface PayPalSelectOption {
  price: number;
  value: string;
}

function getOptionText(p: PayPalSelectOption): string {
  return `${p.value} ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(p.price)} USD`;
}

function renderSelectOption(p: PayPalSelectOption): React.ReactNode {
  return <option value={p.value}>{getOptionText(p)}</option>;
}

export const PayPalButton: FunctionComponent<PayPalButtonProps> = ({
  itemName,
  hostedButtonId,
  priceOptionName,
  priceOptions,
  username
}) => {
  const [selectedPriceOption, setSelectedPriceOption] = useState<string>(
    (priceOptions && priceOptions[0] && priceOptions[0].value) || ""
  );

  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_top"
      className="cc-paypal-button"
    >
      <span className="cc-paypal-button__title">{itemName}</span>
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value={hostedButtonId} />
      <input
        type="hidden"
        name="item_name"
        value={`${itemName} (${selectedPriceOption}) / ${username}`}
      />
      {priceOptions && (
        <>
          <input type="hidden" name="on0" value={priceOptionName} />
          Select a {priceOptionName}
          <select
            name="os0"
            onChange={e => setSelectedPriceOption(e.target.value)}
            value={selectedPriceOption}
          >
            {priceOptions.map(renderSelectOption)}
          </select>
        </>
      )}
      <input type="hidden" name="currency_code" value="USD" />
      <input
        type="image"
        src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
        name="submit"
        alt="PayPal - The safer, easier way to pay online!"
      />
    </form>
  );
};

export const createSelectOption = (
  value: string,
  price: number
): PayPalSelectOption => {
  return { price, value };
};
