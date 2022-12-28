// Import Solana web3 functionalities
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

const DEMO_FROM_SECRET_KEY = new Uint8Array([
	139, 37, 236, 59, 209, 10, 115, 241, 80, 185, 97, 228, 229, 230, 181, 87, 9,
	141, 185, 170, 8, 61, 201, 88, 77, 36, 175, 159, 5, 17, 179, 140, 234, 51,
	189, 23, 59, 161, 1, 116, 195, 91, 255, 183, 63, 5, 62, 104, 218, 247, 192,
	128, 132, 95, 130, 214, 141, 170, 15, 160, 95, 50, 96, 8,
]);

const DEMO_TO_SECRET_KEY = new Uint8Array([
	50, 137, 237, 178, 140, 113, 223, 99, 119, 171, 5, 16, 41, 48, 136, 130, 84,
	239, 173, 229, 23, 108, 80, 102, 249, 172, 47, 108, 76, 198, 15, 127, 182,
	208, 166, 237, 19, 195, 28, 87, 103, 65, 154, 144, 221, 98, 21, 113, 185, 228,
	115, 240, 183, 185, 222, 145, 166, 110, 221, 145, 18, 138, 57, 86,
]);
const from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
const to = Keypair.fromSecretKey(DEMO_TO_SECRET_KEY);

const getWalletBalance = async (pubKey) => {
	try {
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		const walletBalanceLP = await connection.getBalance(new PublicKey(pubKey));
		const walletBalanceSol = parseInt(walletBalanceLP) / LAMPORTS_PER_SOL;
		return walletBalanceSol;
	} catch (err) {
		console.log(err);
	}
};

const initialFromWalletBalance = await getWalletBalance(from.publicKey);

const transferAmount = initialFromWalletBalance / 2;
console.log(initialFromWalletBalance);
console.log(transferAmount);

const transferSol = async () => {
	const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

	// Get Keypair from Secret Key

	// Other things to try:
	// 1) Form array from userSecretKey
	// const from = Keypair.fromSecretKey(Uint8Array.from(userSecretKey));
	// 2) Make a new Keypair (starts with 0 SOL)
	// const from = Keypair.generate();

	// Generate another Keypair (account we'll be sending to)

	// Aidrop 2 SOL to Sender wallet
	///console.log("Airdopping some SOL to Sender wallet!");
	///const fromAirDropSignature = await connection.requestAirdrop(
	///	new PublicKey(from.publicKey),
	///	2 * LAMPORTS_PER_SOL
	///);

	// Latest blockhash (unique identifer of the block) of the cluster
	let latestBlockHash = await connection.getLatestBlockhash();

	// Confirm transaction using the last valid block height (refers to its time)
	// to check for transaction expiration
	///await connection.confirmTransaction({
	///	blockhash: latestBlockHash.blockhash,
	///	lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
	///	signature: fromAirDropSignature,
	///});

	///console.log("Airdrop completed for the Sender account");

	// Send money from "from" wallet and into "to" wallet
	var transaction = new Transaction().add(
		SystemProgram.transfer({
			fromPubkey: from.publicKey,
			toPubkey: to.publicKey,
			//lamports: LAMPORTS_PER_SOL / 100,
			lamports: transferAmount * 1000000000,
		})
	);

	// Sign transaction
	var signature = await sendAndConfirmTransaction(connection, transaction, [
		from,
	]);
	console.log("Signature is ", signature);
};

console.log(
	`Sender wallet balance : ${await getWalletBalance(from.publicKey)}`
);

console.log(
	`Receiver wallet balance : ${await getWalletBalance(to.publicKey)}`
);

await transferSol();

console.log(
	`Sender wallet balance : ${await getWalletBalance(from.publicKey)}`
);

console.log(
	`Receiver wallet balance : ${await getWalletBalance(to.publicKey)}`
);
