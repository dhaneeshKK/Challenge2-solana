import {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL,
	Transaction,
	SystemProgram,
	sendAndConfirmRawTransaction,
	sendAndConfirmTransaction,
} from "@solana/web3.js";

const from = Keypair.generate();

console.log(from);
