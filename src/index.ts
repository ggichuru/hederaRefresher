import { Client } from '@hashgraph/sdk'
import { config } from './config'
import { hederaSetUp } from './hedara_up'

// Create a connection to Hedera
const client = Client.forTestnet()
client.setOperator(config.HEDARA.account_id, config.HEDARA.private_key)

hederaSetUp(client)
