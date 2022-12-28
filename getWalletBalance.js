import {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";

export const getWalletBalance = async (pubKey) => {
	try {
		// Connect to the Devnet
		const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
		//console.log("Connection object is:", connection);

		// Make a wallet (keypair) from privateKey and get its balance
		//const myWallet = await Keypair.fromSecretKey(privateKey);
		const walletBalance = await connection.getBalance(new PublicKey(pubKey));
		console.log(
			`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
		);
	} catch (err) {
		console.log(err);
	}
};
