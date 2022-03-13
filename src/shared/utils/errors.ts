export function transformRpcError(rpcError: any, knownErrors: Error[]) {
  const message = rpcError.data?.message;

  if (typeof message !== 'string') {
    return rpcError;
  }

  return knownErrors.find((err) => message.includes(err.message)) ?? rpcError;
}

export function getErrorMessage(err: any) {
  return err.data?.message || err.message;
}
