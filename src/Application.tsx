import * as React from "react";
import { FunctionComponent, useState } from "react";
import {
  PayPalButton,
  createSelectOption,
  PayPalButtonProps
} from "./PayPalButton";

const BUTTONS: { [button: string]: Omit<PayPalButtonProps, "username"> } = {
  MYO_PILLOWING: {
    itemName: "MYO Pillowing Slot",
    hostedButtonId: "59UL4FAAUNDYC",
    priceOptions: [
      createSelectOption("Common", 25),
      createSelectOption("Uncommon", 30),
      createSelectOption("Rare", 40),
      createSelectOption("Very Rare", 50),
      createSelectOption("Special", 200)
    ],
    priceOptionName: "Rarity"
  },
  EDIT_KIT: {
    itemName: "Pillowing Edit Kit",
    hostedButtonId: ""
  },
  UPGRADE_KIT: {
    itemName: "Pillowing Upgrade Kit",
    hostedButtonId: "",
    priceOptionName: "Rarity",
    priceOptions: [
      createSelectOption("Common to Uncommon", 5),
      createSelectOption("Uncommon to Rare", 10),
      createSelectOption("Rare to Very Rare", 10),
      createSelectOption("Very Rare to Special", 150)
    ]
  }
};

export const Application: FunctionComponent = () => {
  const [username, setUsername] = useState("");
  return (
    <>
      <input
        type="text"
        onChange={(e): void => setUsername(e.target.value)}
        value={username}
      />
      {Object.entries(BUTTONS).map(([key, props]) => (
        <PayPalButton key={key} {...props} username={username} />
      ))}
    </>
  );
};
