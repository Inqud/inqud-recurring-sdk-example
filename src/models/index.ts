export enum StepNumber {
  CHECKOUT,
  PAYMENT,
  COMPLETE,
}

export enum USDTNetworkType {
  erc = 'ETHEREUM',
  trc = 'TRON',
}

export enum Status {
  NEW = 'NEW',
  REQUEST_CREATED = 'REQUEST_CREATED',
  PAYMENT_DETECTED = 'PAYMENT_DETECTED',
  EXPIRED = 'EXPIRED',
  CONFLICT = 'CONFLICT',
  SUCCESS = 'SUCCESS',
}

export enum FinalStatus {
  EXPIRED = 'EXPIRED',
  CONFLICT = 'CONFLICT',
  SUCCESS = 'SUCCESS',
}

export const FinalStatusList = [
  Status.EXPIRED,
  Status.CONFLICT,
  Status.SUCCESS,
];

export enum InternalStatus {
  default = 'default',
  unknown = 'unknown',
  success = 'success',
  failed = 'failed',
  timeout = 'timeout',
  in_progress = 'in_progress',
}

export enum CheckoutType {
  FIXED_PRICE = 'FIXED_PRICE',
  NO_PRICE = 'NO_PRICE',
}

export interface Token {
  currency: string;
  contractAddress: string;
  decimals: number;
  estimatedPayAmount?: number | undefined;
  rate?: number | undefined;
  approvalSlippagePercent?: number | undefined;
}

export interface Chain {
  blockchain: string;
  chainId: string;
  approveAddress: string;
  tokens: Token[];
}

export interface Plan {
  id: string;
  name: string;
  status: string;
  type: string;
  currency: string;
  amount: number;
  period: string;
  periodMultiplier: number;
  chains: Chain[];
}

interface Transaction {
  blockchain: string;
  currency: string;
  cryptoCurrency: string;
  amount: number;
  txCreatedAt: string;
  tx: string;
  txLink: string | null;
  createdAt: string;
  modifiedAt: string;
}

interface PaymentIntent {
  id: string;
  status: string;
  amount: number;
  transaction: Transaction;
  createdAt: string;
  modifiedAt: string;
}

interface ActiveInvoice {
  id: string;
  authorizationId: string;
  planId: string;
  clientOrderId: string | null;
  status: string;
  createdAt: string;
  modifiedAt: string;
  currency: string;
  amount: number;
  paymentIntents: PaymentIntent[];
}

interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: string;
  subStatus: string;
  clientOrderId: string | null;
  nextWriteOffAt: string | null;
  activeInvoice?: ActiveInvoice;
  createdAt: string;
}

export interface Authorization {
  id: string;
  planId: string;
  wallet: string;
  cryptoCurrency: string;
  status: string;
  subscriptionId: string;
}

export interface ConnectionData {
  subscription: Subscription;
  authorization: Authorization;
}

export enum SubscriptionStatus {
  active = 'ACTIVE',
  initiated = 'INITIATED',
  pending = 'PENDING',
  success = 'SUCCESS',
  cancelled = 'CANCELLED',
}

export enum PlanType {
  subscription = 'SUBSCRIPTION',
  onDemand = 'ON_DEMAND',
}

export enum AuthorizationStatus {
  granted = 'GRANTED',
}

export interface AuthorizationDataPayload {
  cryptoCurrency: string | undefined;
  agreementSignature?: string;
  agreementMessage?: string | undefined;
  initApprovalTx: string | undefined;
  wallet: string | undefined;
}

export interface BlockchainOptionCurrency {
  currency: string;
  contractAddress: string;
  decimals: number;
  blockchain: string;
  chainId: string;
  approveAddress: string;
  estimatedPayAmount?: number | undefined;
  rate?: number | undefined;
  approvalSlippagePercent?: number | undefined;
}

export interface BlockchainOption {
  network: string;
  chainId: string;
  currencies: BlockchainOptionCurrency[];
}

export interface BlockchainOptions {
  [key: string]: BlockchainOption;
}

export enum RecurringState {
  notConnected,
  connected,
  noAuthSubscription,
  authNoSubscription,
  active,
  pending,
  cancelled,
  failed,
}

export const periodMap: any = {
  minutely: 'minutes',
  hourly: 'hours',
  daily: 'days',
  weekly: 'weeks',
  monthly: 'months',
  yearly: 'years',
};

export const hexadecimalToDecimal = (
  hexadecimal: string | undefined
): number | string | undefined => {
  if (!hexadecimal || typeof hexadecimal !== 'string') {
    return hexadecimal;
  }

  if (hexadecimal.startsWith('0x')) {
    hexadecimal = hexadecimal.slice(2);
  }
  return parseInt(hexadecimal, 16);
};

export type BalanceData =
  | {
      decimals: number;
      formatted: string;
      symbol: string;
      value: bigint;
    }
  | undefined;
