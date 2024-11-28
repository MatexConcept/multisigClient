import { useCallback } from "react";
import useContractInstance from "./useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { toast } from "react-toastify";
import { baseSepolia } from "@reown/appkit/networks";
import { ErrorDecoder } from "ethers-decode-error";

const useCreateTx = () => {
  const contract = useContractInstance(true);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (amount, walletAddress) => {
      if (!amount || !walletAddress) {
        toast.error("Amount and WalletAddress are required");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(baseSepolia.id)) {
        toast.error("You're not connected to baseSepolia");
        return;
      }

      try {
        const estimatedGas = await contract.initiateTransaction.estimateGas(
          amount,
          walletAddress
        
        );

        const tx = await contract.initiateTransaction(amount, walletAddress, {
          gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
        });

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          toast.success("Transaction Initiated successfully");
          return;
        }

        toast.error("Failed to  Initiate Transaction ");
        return;
      } catch (err) {
        const errorDecoder = ErrorDecoder.create();
        const { reason } = await errorDecoder.decode(err);
        toast.error(reason);
      }
    },
    [contract, address, chainId]
  );
};

export default useCreateTx;