# Inqud Recurring API Example

This repository demonstrates the implementation of recurring cryptocurrency payments using the [Inqud Recurring](https://inqud.com/recurring-payments) with React and TypeScript.

Try it out in a [sandbox environment](https://stackblitz.com/github/Inqud/inqud-recurring-sdk-example).

## Useful Links

- [Inqud App](https://app.inqud.com/) - Create and manage your recurring plans
- [Inqud Recurring Documentation](https://docs.inqud.com/crypto-recurring/overview) - Detailed API documentation

## Overview

This example showcases how to integrate cryptocurrency subscription payments into your React application, including:

- Wallet connection
- Network and currency selection
- Payment processing
- Subscription management
- Transaction status handling

## Features

- 🔐 Secure wallet connection via WalletConnect
- 💱 Multiple cryptocurrency support
- 🔄 Two types of recurring payment flows
- 📊 Transaction status tracking
- 💰 Balance checking
- 💳 Spending limit controls

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Plan ID from Inqud Recurring Project
- Project ID from WalletConnect Cloud (for mobile wallet connections)

## Required IDs

- **Plan ID**: Get this from your Inqud Recurring Project. This identifies your specific payment plan.
- **WalletConnect Project ID**: Create one at [cloud.walletconnect.com](https://cloud.walletconnect.com/). This enables mobile wallet connections via QR code.

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd inqud-recurring-example
```

2. Install dependencies:
```bash
npm install
```

3. Configure your environment (see Configuration section below)

4. Start the development server:
```bash
npm run dev
```

## Configuration

Update the following configuration in `src/pages/RecurringMainPage.tsx`:

```tsx
// src/pages/RecurringMainPage.tsx

const RecurringPageWithContext: React.FC<{}> = () => {
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const clientOrderId = query.get('orderId');

  return (
    <RecurringDataProvider
      planId={id}                              // Replace with your Inqud Plan ID if not using URL parameters
      clientOrderId={clientOrderId}            // Optional: Your internal order ID
      projectId="YOUR_WALLETCONNECT_PROJECT_ID" // Replace with your WalletConnect Project ID
      baseUrl="https://api.inqud.com/"         // Replace if using a different API URL
    >
      <RecurringMainPage />
    </RecurringDataProvider>
  );
};
```

### Configuration Parameters:

1. `planId`: Your Inqud Plan ID from the Inqud Recurring Project
   - Either hardcode it directly or pass via URL as shown in the example
   - Example hardcoded: `planId="PLAN-12345"`
   - Example URL: `https://your-app.com/plans/PLAN-12345`

2. `projectId`: Your WalletConnect Project ID
   - Get it from [cloud.walletconnect.com](https://cloud.reown.com/)
   - Example: `projectId="c12345678900000000000000000"`

3. `baseUrl`: Inqud API base URL
   - Default: `"https://api.inqud.com/"`
   - Change only if instructed by Inqud support

4. `clientOrderId`: (Optional) Your internal order reference
   - Can be passed via URL parameter or generated internally
   - Example URL: `https://your-app.com/plans/PLAN-12345?orderId=order_123`

## Recurring Payment Flows

The payment flow is determined by the type of Plan you create in the Inqud application. There are two available plan types:

### 1. ON_DEMAND Plan
This plan type creates a flexible payment flow:
- Designed for flexible, as-needed payments
- User authorizes spending limit
- Merchant can charge within the authorized limit
- No fixed schedule
- Ideal for:
  - Pay-as-you-go services
  - Variable amount subscriptions
  - Usage-based billing

### 2. SUBSCRIPTION Plan
This plan type creates a traditional subscription flow:
- Traditional subscription model
- Fixed amount charged on a regular schedule
- User approves recurring payments
- Automated billing at set intervals
- Perfect for:
  - Monthly subscriptions
  - Regular service fees
  - Fixed-price memberships

The flow type and its behavior are automatically determined based on the Plan type you've configured in your Inqud account. The component will adapt its interface and functionality accordingly.

## Project Structure

```
src/
├── models/        # TypeScript interfaces and enums
├── pages/         # Main page components
│   ├── ConnectWalletPage.tsx
│   ├── PaymentPage.tsx
│   ├── SuccessPage.tsx
│   └── ...
├── ui/           # Reusable UI components
└── utils/        # Helper functions
```

## Implementation Guide

### 1. Setup RecurringDataProvider

Wrap your application with the RecurringDataProvider:

```tsx
<RecurringDataProvider
  planId="your-inqud-plan-id"          // From Inqud Recurring Project
  clientOrderId={clientOrderId}         // Optional: Your internal order ID
  projectId="your-walletconnect-id"     // From cloud.walletconnect.com
  baseUrl="https://api.inqud.com/"
>
  <YourComponent />
</RecurringDataProvider>
```

### 2. Use the Hook

Access the Inqud functionality using the `useRecurringData` hook:

```tsx
const {
  state,
  loading,
  plan,
  currency,
  selectedNetwork,
  handlePayClick,
  // ... other values and functions
} = useRecurringData();
```

### 3. Handle Different States

The API provides various states to handle the payment flow:

- `notConnected`: Show wallet connection UI
- `connected`: Display payment options
- `pending`: Show payment processing
- `success`: Display success message
- `failed`: Show error state
- `cancelled`: Handle cancelled payments

## API States

| State | Description |
|-------|-------------|
| `notConnected` | Initial state, wallet not connected |
| `connected` | Wallet connected, ready for payment |
| `noAuthSubscription` | Connected but no subscription |
| `authNoSubscription` | Authorized but no active subscription |
| `active` | Subscription is active |
| `pending` | Payment is being processed |
| `cancelled` | Subscription was cancelled |
| `failed` | Payment or subscription failed |

## Components

### ConnectWalletPage
- Handles wallet connection via WalletConnect
- Network selection
- Currency selection

### PaymentPage
- Displays payment details
- Handles spending limits
- Shows wallet balance
- Processes payments

### StatusPages
- `SuccessPage`: Displays successful payments
- `PendingPage`: Shows payment processing
- `FailedPage`: Handles failed transactions
- `CancelledPage`: Shows cancelled subscriptions

## Error Handling

The example includes comprehensive error handling:
- Network validation
- Balance checking
- Transaction status monitoring
- Error boundary for React errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For support with:
- Inqud API: Visit [Inqud Documentation](https://docs.inqud.com)
- WalletConnect: Visit [WalletConnect Documentation](https://docs.walletconnect.com/)
