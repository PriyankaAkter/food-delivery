// "use server";

// import { ProductType } from "@/app/types/type";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

// export const checkoutSession = async (products: any[]) => {
//   const line_items = products.map((product) => {
//     return {
//       price: product?.priceId,
//       quantity: product?.quantity,
//     };
//   });
//   try {
//     const session = await stripe.checkout.sessions.create({
//       success_url: `${process.env.NEXTAUTH_URL}/stripe/success?id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXTAUTH_URL}/stripe/cancel?id={CHECKOUT_SESSION_ID}`,
//       billing_address_collection: "auto",
//       shipping_address_collection: {
//         allowed_countries: ["US", "CA", "BD"],
//       },
//       line_items,
//       payment_method_types: ["card"],
//       mode: "payment",
//       invoice_creation: {
//         enabled: true,
//       },
//     });
//     return JSON.stringify(session);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const createPrice = async (amount: number) => {
//   try {
//     const price = await stripe.prices.create({
//       unit_amount: amount * 100,
//       currency: "usd",
//       product: "prod_OUSeo31kuM20Ir",
//     });
//     return price.id;
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// };
