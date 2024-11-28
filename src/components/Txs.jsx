import { Text } from "@radix-ui/themes";
import { useMultiSig } from "../context/MultiSigContext";
import Transaction from './Transaction';

const Tx = () => {
    const { allTransactions } = useMultiSig();

    return (
        <div className="w-full flex flex-col gap-4 ml-8 pt-[80px]">
            <Text as="h1" className="text-3xl font-semibold text-[#0077b6]">All Transactions</Text>
            <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-4">
                {allTransactions.length === 0 ? (
                    <Text as="h1" className="text-2xl font-medium text-stone-200">
                        No Transactions have been Initiated
                    </Text>
                ) : (
                    allTransactions.map((transaction, index) => (
                        <Transaction key={index} transaction={transaction} index={index} />
                    ))
                )}
            </section>
        </div>
    );
};

export default Tx;
