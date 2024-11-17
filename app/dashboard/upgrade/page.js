"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useMutation } from "convex/react";
import { Check } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const UpgradePlans = () => {
  const userUpgradePlan = useMutation(api.user.userUpgradePlan);
  const { user } = useUser();
  const onPaymentSuccess =async () => {
     const result = await userUpgradePlan({
       userEmail:user?.primaryEmailAddress?.emailAddress
     })
     console.log(result);
     toast.success("Plan Upgraded Successfully");
  }
  return (
    <div>
      <h2 className="text-3xl font-medium">Plans</h2>
      <p>Upgrade your plan</p>
      {/* ----------------------------Plans Cards------------------------------ */}
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          {/* ------------------------------------1nd Plan------------------------------------ */}

          <div className="rounded-2xl border p-6 shadow-sm ring-1 ring-gray-900/10  sm:order-last sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Free
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {" "}
                  0${" "}
                </strong>

                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <Check />
                <span className="text-gray-700"> 5 PDF Upload </span>
              </li>

              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700"> Unlimited Notes Taking </span>
              </li>

              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700"> Email support </span>
              </li>

              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700"> Help center access </span>
              </li>
            </ul>

            <a
              href="#"
              className="mt-8 block rounded-full border border-indigo-600  
              px-12 py-3 text-center text-sm font-medium text-gray-600 hover:bg-slate-100
              hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
            >
              Current Plan
            </a>
          </div>
          {/* ------------------------------------2nd Plan------------------------------------ */}
          <div className="rounded-2xl border  p-6 shadow-sm ring-1 ring-gray-900/10 sm:order-last sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Pro
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                  {" "}
                  9.99${" "}
                </strong>

                <span className="text-sm font-medium text-gray-700">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700">Unlimited PDF Upload </span>
              </li>

              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700"> Unlimited Notes Taking </span>
              </li>

              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700"> Email support </span>
              </li>

              <li className="flex items-center gap-1">
                <Check />

                <span className="text-gray-700"> Help center access </span>
              </li>
            </ul>

            {/* <a
              href="#"
              className="mt-8 block rounded-full border border-indigo-600  
              px-12 py-3 text-center text-sm font-medium text-gray-600 hover:bg-slate-100
              hover:ring-1 hover:ring-indigo-700 focus:outline-none focus:ring active:text-indigo-500"
            >
              Get Started
            </a> */}
            <div className="mt-5">
              <PayPalButtons
                onApprove={(data, actions) => {
                  onPaymentSuccess(data, actions);
                }}
                onCancel={() => {
                  console.log("payment cancelled");
                }}
                createOrder={(data, actions) => {
                  return actions?.order?.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "9.99",
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePlans;
