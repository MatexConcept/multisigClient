import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useContractInstance from "../hooks/useContractInstance";
import { Contract } from "ethers";
import ABI from "../ABI/multisig.json";
import useSignerOrProvider from "../hooks/useSignerOrProvider";

const TransactionContext = createContext({
  allTransactions: [],
});
export const TransactionContextProvider = ({ children }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const readOnlyMultisigContract = useContractInstance();
  const { readOnlyProvider } = useSignerOrProvider();

  // const formatEnum = (value) => {
  //   const status = Number(value);
  //   switch (status) {
  //     case 1:
  //       return "Created";
  //     case 2:
  //       return "Pending";
  //     case 3:
  //       return "Accepted";
  //     default:
  //       return "Pending";
  //   }
  // };

  const getAllTransactions = useCallback(async () => {
    if (!readOnlyMultisigContract) return;

    try {
      const data = await readOnlyMultisigContract.getAllTransactions();
      const tx = data.map((allTransactions) => ({
        id: Number(allTransactions.id),
        amount: Number(allTransactions.amount),
        receiverAddress: allTransactions.receiver,
        signersCount: Number(allTransactions.signersCount),
        isExecuted: allTransactions.isExecuted,
        txCreator: allTransactions.txCreator,
      }));

      setAllTransactions(tx);
    } catch (error) {
      console.log("Error fetching transactions", error);
    }
  }, [readOnlyMultisigContract]);

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  const trasactionsUpdateHandler = useCallback(
    (id, amount, receiverAddress, signersCount, isExecuted, txCreator) => {
      setAllTransactions((prevState) => [
        ...prevState,
        {
          id: Number(id),
          amount: Number(amount),
          receiverAddress,
          signersCount: Number(signersCount),
          isExecuted,
          txCreator,
        },
      ]);
    },
    []
  );

  useEffect(() => {
    if (!readOnlyProvider) return;

    const contract = new Contract(
      import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
      ABI,
      readOnlyProvider
    );

    const eventHandler = (
      id,
      amount,
      receiverAddress,
      signersCount,
      isExecuted,
      txCreator
    ) => {
      trasactionsUpdateHandler(
        id,
        Number(amount),
        receiverAddress,
        Number(signersCount) || 0,
        isExecuted,
        txCreator
      );
    };

    contract.on("TransactionInitiated", eventHandler);

    return () => {
      contract.off("TransactionInitiated", eventHandler);
    };
  }, [trasactionsUpdateHandler, readOnlyProvider]);

  const approveTxHandler = useCallback((index, signersCount, isExecuted) => {
    console.log("Event received:", { index, signersCount, isExecuted });

    setAllTransactions((prevState) => {
      const updatedTx = [...prevState];

      if (updatedTx[Number(index)]) {
        updatedTx[Number(index)] = {
          ...updatedTx[Number(index)],
          signersCount: parseInt(signersCount, 10),
          isExecuted: isExecuted,
        };
      }

      return updatedTx;
    });
  }, []);

  useEffect(() => {
    const contract = new Contract(
      import.meta.env.VITE_MULTISIG_CONTRACT_ADDRESS,
      ABI,
      readOnlyProvider
    );

    const handleTransactionApproved = (txIndex, signersCount, isExecuted) => {
      console.log("TransactionApproved event:", {
        txIndex,
        signersCount,
        isExecuted,
      }); // Debug log
      approveTxHandler(txIndex.toNumber(), signersCount.toNumber(), isExecuted); // Ensure `txIndex` and `signersCount` are converted to numbers
    };

    const handleTransactionExecuted = (txIndex, signersCount, isExecuted) => {
      console.log("TransactionExecuted event:", {
        txIndex,
        signersCount,
        isExecuted,
      }); // Debug log
      approveTxHandler(txIndex.toNumber(), signersCount.toNumber(), isExecuted); // Ensure `txIndex` and `signersCount` are converted to numbers
    };

    contract.on("TransactionApproved", handleTransactionApproved);
    contract.on("TransactionExecuted", handleTransactionExecuted);

    return () => {
      console.log("Removing contract event listeners"); // Debug cleanup
      contract.off("TransactionApproved", handleTransactionApproved);
      contract.off("TransactionExecuted", handleTransactionExecuted);
    };
  }, [approveTxHandler, readOnlyProvider]);

  //   setProposals((prevState) => {
  //     const updatedProposals = [...prevState];
  //     updatedProposals[Number(index)] = {
  //       ...updatedProposals[Number(index)],
  //       voteCount: Number(voteCount),
  //       status: formatEnum(status),
  //     };
  //     return updatedProposals;
  //   });
  // }, []);

  // useEffect(() => {
  //   const contract = new Contract(
  //     import.meta.env.VITE_PROPOSAL_CONTRACT_ADDRESS,
  //     ABI,
  //     readOnlyProvider
  //   );

  //   contract.on("ProposalActive", (proposalIndex, voteCount) => {
  //     voteOnProposalHandler(proposalIndex.toNumber(), voteCount, 2); // Update to "Pending"
  //   });

  //   contract.on("ProposalApproved", (proposalIndex, voteCount) => {
  //     voteOnProposalHandler(proposalIndex.toNumber(), voteCount, 3);
  //   });

  //   return () => {
  //     contract.off("ProposalActive");
  //     contract.off("ProposalApproved");
  //   };
  // }, [voteOnProposalHandler, readOnlyProvider]);

  //   const voteOnProposalUpdateHandler = useCallback((index, voteCount, status) => {
  //     setProposals((prevState) => {
  //       const updatedProposals = [...prevState];
  //       updatedProposals[Number(index)] = {
  //         ...updatedProposals[Number(index)],
  //         voteCount: Number(voteCount),
  //         status: formatEnum(status),
  //       };
  //       return updatedProposals;
  //     });
  //   }, []);

  //   useEffect(() => {
  //     const contract = new Contract(
  //       import.meta.env.VITE_PROPOSAL_CONTRACT_ADDRESS,
  //       ABI,
  //       readOnlyProvider
  //     );

  //     contract.on(" ProposalVoted", (proposalIndex, voteCount) => {
  //         voteOnProposalUpdateHandler(proposalIndex.toNumber(), voteCount, 2); // Update to "Pending"
  //     });

  //     contract.on(" ProposalVoted", (proposalIndex, voteCount) => {
  //         voteOnProposalUpdateHandler(proposalIndex.toNumber(), voteCount, 3);
  //     });

  //     return () => {
  //       contract.off(" ProposalVoted");
  //       contract.off(" ProposalVoted");
  //     };
  //   }, [voteOnProposalUpdateHandler, readOnlyProvider]);

  return (
    <TransactionContext.Provider value={{ allTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMultiSig = () => {
  const context = useContext(TransactionContext);
  return context;
};
