import React from "react";
import { PricingTable, UserButton } from "@clerk/nextjs";


// ── Pricing Data ─────────────────────────────────────────────────────────────

export default function Pricing() {
  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h2 className="my-10 text-center text-3xl font-bold">Pricing Plans</h2>
      <div style={{ width: '100%', maxWidth: '1000px' }} className="items-center">
        <PricingTable newSubscriptionRedirectUrl="/Dashboard/Pricing" />
      </div>
      </div>
  );
}