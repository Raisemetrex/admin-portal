
export function trimAccountId(accountId) {
  return `${accountId.slice(0,4)}...${accountId.slice(-4)}`
}

// export trimAccountId;
