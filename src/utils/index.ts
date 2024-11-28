import { has, reduce, ceil, map } from 'lodash';
import { Chain, BlockchainOptions } from '../models';

export const noop = () => undefined;

export const formatNumber = (x: number | undefined, d = 5) => {
  if (x === undefined || x === null) return '';
  var parts = ceil(x, d)?.toString()?.split('.');
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts?.join('.');
};

export const shortenWithDotsBetween = (
  str: string | undefined = '',
  maxLength: number
) => {
  if (str?.length <= maxLength) return str;
  const firstPart = str?.slice(0, maxLength / 2);
  const secondPart = str?.slice(-maxLength / 2);
  return `${firstPart}...${secondPart}`;
};

export const getOptionsFromChains = (
  data: Chain[] | undefined
): BlockchainOptions => {
  return reduce(
    data,
    (acc: BlockchainOptions, item: Chain) => {
      if (has(acc, item.blockchain)) {
        return acc;
      }

      return {
        ...acc,
        [item.blockchain]: {
          network: item.blockchain,
          chainId: item.chainId,
          currencies: map(item.tokens, (token) => ({ ...token, ...item })),
        },
      };
    },
    {}
  );
};

export const timerValue = 60;
export const maxDurationCount = 36;
