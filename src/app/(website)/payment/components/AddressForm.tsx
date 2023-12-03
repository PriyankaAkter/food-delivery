import { AddressElement } from "@stripe/react-stripe-js";
import React from "react";

const AddressForm = () => {
  return (
    <form>
      <h6 className="mb-4">Address</h6>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
          }
        }}
      />
    </form>
  );
};

export default AddressForm;
