import { config } from '../config'
import {
    Client,
    PrivateKey,
    Hbar,
    AccountCreateTransaction,
    AccountBalanceQuery,
    TransferTransaction,
} from '@hashgraph/sdk'

export const hederaSetUp = async (client: Client) => {
    // Create new keys
    let new_private_key = PrivateKey.generateED25519()
    let new_public_key = new_private_key.publicKey

    // Create A new account with 1000 tinyBar as the starting balance
    let new_account = await new AccountCreateTransaction()
        .setKey(new_public_key)
        .setInitialBalance(Hbar.fromTinybars(1000))
        .execute(client)

    // Get account receipt (includes ID, SC, Tokens)
    const getReceipt = await new_account.getReceipt(client)

    // Get account_id
    let new_account_id = getReceipt.accountId!
    console.log(`The new Account ID is : ${new_account_id}`)

    // Get account balance
    const accountBalance = await new AccountBalanceQuery()
        .setAccountId(new_account_id)
        .execute(client)
    console.log(
        `The New Account Balance is : ${accountBalance.hbars.toTinybars()} tinybar.`
    )

    // Create the transfer transactions
    const sendHbar = await new TransferTransaction()
        .addHbarTransfer(config.HEDARA.account_id, Hbar.fromTinybars(-1000)) // Sending account
        .addHbarTransfer(new_account_id, Hbar.fromTinybars(1000)) // Receiving account
        .execute(client)

    let txReceipt = await sendHbar.getReceipt(client)
    console.log(
        `Transfer from my account to the new one was ${txReceipt.status}`
    )

    // Cost query
    let queryCost = await new AccountBalanceQuery()
        .setAccountId(new_account_id)
        .getCost(client)
    console.log(`The transaction cost is ${queryCost}`)

    // Query balance
    let getNewBal = await new AccountBalanceQuery()
        .setAccountId(new_account_id)
        .execute(client)
    console.log(
        `New balance after transfer is ${getNewBal.hbars.toTinybars()} tinybar.`
    )
}
