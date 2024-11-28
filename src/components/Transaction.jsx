import {
  AlertDialog,
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";

import useApproveTransaction from "../hooks/useApproveTransaction";

const Transaction = ({ transaction = {}, index }) => {
  const handleApprovalTx = useApproveTransaction();

  const { id, amount, receiverAddress, signersCount, isExecuted, txCreator } =
    transaction;

  const handleApproveTx = (value) => {
    const index = Number(value);
    handleApprovalTx(index);
  };

  return (
    // <Box className="w-full p-[40px] gap-14" >
    //     <Card variant="surface">
    //         <Flex direction="column" gap={6}>
    //             <Text as="div" size="2" weight="bold">
    //                 Tx: {id}
    //             </Text>
    //             <Text as="div" size="2" weight="bold">
    //                 Amount: {amount} ETH
    //             </Text>
    //             <Text as="div"  color="gray" size="2" >
    //                 Receiver Address: {receiverAddress}
    //             </Text>
    //             <Text as="div" size="2" weight="bold">
    //                 Signers Count: {signersCount}
    //             </Text>
    //             <Text as="div" size="2" weight="bold">
    //                 Executed: {isExecuted.toString()}
    //             </Text>
    //             <Text as="div" color="gray" size="2">
    //                 Creator: {txCreator}
    //             </Text>
    //         </Flex>
    //         <div className="w-full flex justify-start mt-4 items-center gap-4">

    //           <AlertDialog.Root>
    //               <AlertDialog.Trigger>
    //                   <Button color="#0077b6">Approve Transaction</Button>
    //               </AlertDialog.Trigger>
    //               <AlertDialog.Content maxWidth="450px">
    //                   <AlertDialog.Title>Approve</AlertDialog.Title>
    //                   <AlertDialog.Description size="2">
    //                      confirm you want to approve this transaction
    //                   </AlertDialog.Description>

    //                   <Flex gap="3" mt="4" justify="end">
    //                       <AlertDialog.Cancel>
    //                           <Button variant="soft" color="gray">
    //                               Cancel
    //                           </Button>
    //                       </AlertDialog.Cancel>
    //                       <AlertDialog.Action>
    //                           <Button variant="solid" color="green" onClick={() => handleApproveTx(index)} >
    //                               Approve
    //                           </Button>
    //                       </AlertDialog.Action>
    //                   </Flex>
    //               </AlertDialog.Content>
    //           </AlertDialog.Root>
    //       </div>
    //     </Card>
    // </Box>
    <>
      <div class="card">
        <div class="card2">
        <div className="content">
        <h3 className="text-[#0077b6]"> Tx: <span className="text-[#ffff]">{id}</span></h3>
          <h3 className="text-[#0077b6]"> Amount: <span className="text-[#ffff]">{amount} ETH</span></h3>
          <h3 className="text-[#0077b6]"> Receiver Address:  <span className="text-[#ffff]"> {receiverAddress}</span></h3>
          <h3 className="text-[#0077b6]">
            {" "}
            Signers Count: {signersCount} 
          </h3>
          <h3> Creator: {txCreator}</h3>
          <AlertDialog.Root>
    <AlertDialog.Trigger>
        <Button color="#0077b6">Approve Transaction</Button>
     </AlertDialog.Trigger>
  <AlertDialog.Content maxWidth="450px">
      <AlertDialog.Title>Approve</AlertDialog.Title>
      <AlertDialog.Description size="2">
         confirm you want to approve this transaction
      </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
           <AlertDialog.Cancel>
               <Button variant="soft" color="gray">
                   Cancel
               </Button>
           </AlertDialog.Cancel>
           <AlertDialog.Action>
               <Button variant="solid" color="green" onClick={() => handleApproveTx(index)} >
                  Approve
              </Button>
          </AlertDialog.Action>
      </Flex>
  </AlertDialog.Content>
</AlertDialog.Root>
        </div>
     


</div>
        </div>
      
    </>
  );
};

export default Transaction;
