// import ButtonDemo from "@/components/ButtonDemo";
// import { Transaction } from "@meshsdk/core";
// import { useWallet } from "@meshsdk/react";
// import { useState } from "react";

// export default function MultiAddresses() {
//   const { wallet } = useWallet();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [success, setSuccess] = useState<boolean>(false);

//   async function demo() {
//     setLoading(true);

//     const tx = new Transaction({ initiator: wallet });

//     tx.sendLovelace(
//       "addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr",
//       "1000000"
//     );
//     tx.sendLovelace(
//       "addr_test1qpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0uafhxhu32dys6pvn6wlw8dav6cmp4pmtv7cc3yel9uu0nq93swx9",
//       "1000000"
//     );

//     const unsignedTx = await tx.build();
//     const signedTx = await wallet.signTx(unsignedTx);
//     const txHash = await wallet.submitTx(signedTx);
//     console.log(txHash);

//     setLoading(false);
//     setSuccess(true);
//   }

//   return (
//     <ButtonDemo
//       fn={() => demo()}
//       label="Send to multi addresses"
//       loading={loading}
//       success={success}
//     />
//   );
// }
