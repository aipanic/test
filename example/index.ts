import { createJupiterApiClient } from "../src/index";
import { Connection, Keypair, VersionedTransaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Wallet from '@project-serum/anchor/dist/esm/nodewallet';

import bs58 from "bs58";
import { transactionSenderAndConfirmationWaiter } from "./utils/transactionSender";
import { getSignature } from "./utils/getSignature";

export async function buy() {

  const time = new Date().getTime();


  const jupiterQuoteApi = createJupiterApiClient();
  const wallet = new Wallet(
    Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY || ""))
  );
  console.log("Wallet:", wallet.publicKey.toBase58());

  // https://worker.jup.ag/send-transaction
  // https://jupiter-fe.helius-rpc.com/
  // https://grateful-jerrie-fast-mainnet.helius-rpc.com/
  // https://mercuria-fronten-1cd8.mainnet.rpcpool.com/
  // https://mainnet.block-engine.jito.wtf/api/v1/transactions


  // Make sure that you are using your own RPC endpoint.
  const connectionSend = new Connection(
    "https://public.ligmanode.com"

  );
  const connectionCheck = new Connection(
    "https://public.ligmanode.com"

  );

  // get quote
  const quote = await jupiterQuoteApi.quoteGet({
    inputMint: "So11111111111111111111111111111111111111112",
    outputMint: "B8vV6An7xFF3bARB1cmU7TMfKNjjes2WvY7jWqiRc6K6",
    amount: LAMPORTS_PER_SOL / 1000.0,
    slippageBps: 50,
    onlyDirectRoutes: false,
    asLegacyTransaction: false,
  });

  if (!quote) {
    console.error("unable to quote");
    return;
  }

  // Get serialized transaction
  const swapResult = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: quote,
      userPublicKey: wallet.publicKey.toBase58(),
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: "auto",
      // prioritizationFeeLamports: {
      //   autoMultiplier: 2,
      // },
    },
  });


  console.dir(swapResult, { depth: null });

  // Serialize the transaction
  const swapTransactionBuf = Buffer.from(swapResult.swapTransaction, "base64");
  var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

  // Sign the transaction
  transaction.sign([wallet.payer]);
  const signature = getSignature(transaction);

  // We first simulate whether the transaction would be successful
  // const { value: simulatedTransactionResponse } =
  //   await connection.simulateTransaction(transaction, {
  //     replaceRecentBlockhash: true,
  //     commitment: "processed",
  //   });
  // const { err, logs } = simulatedTransactionResponse;

  // if (err) {
  //   // Simulation error, we can check the logs for more details
  //   // If you are getting an invalid account error, make sure that you have the input mint account to actually swap from.
  //   console.error("Simulation Error:");
  //   console.error({ err, logs });
  //   return;
  // }

  const serializedTransaction = Buffer.from(transaction.serialize());
  const blockhash = transaction.message.recentBlockhash;

  console.log("Sending transaction at time:", new Date().getTime() - time);

  const transactionResponse = await transactionSenderAndConfirmationWaiter({
    connectionSend,
    connectionCheck,
    serializedTransaction,
    blockhashWithExpiryBlockHeight: {
      blockhash,
      lastValidBlockHeight: swapResult.lastValidBlockHeight,
    },
  });

  console.log("Transaction transactionSenderAndConfirmationWaiter awaited");
  console.log(`Time taken: ${new Date().getTime() - time}ms`);

  // If we are not getting a response back, the transaction has not confirmed.
  if (!transactionResponse) {
    console.error("Transaction not confirmed");
    return;
  }

  if (transactionResponse.meta?.err) {
    console.error(transactionResponse.meta?.err);
  }

  console.log(`https://solscan.io/tx/${signature}`);

  console.log("Transaction response:", transactionResponse);

  console.log("Current UTC time:", new Date().toUTCString());

  console.log("Transaction confirmed in time:", new Date().getTime() - time);
}

// buy();
// Add this line at the end of your index.ts
