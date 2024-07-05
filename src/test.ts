import main from './index'
import 'dotenv/config'

async function execute(inputObj: any) {
    const inputJson = JSON.stringify(inputObj)
    console.log('INPUT:', inputJson)
    return await main(inputJson)
}

const apiKey=process.env.DEVDOCK_API

const sampleInput = {
    "untrustedData": {
        "fid": 2,
        "url": "https://fcpolls.com/polls/1",
        "messageHash": "0xd2b1ddc6c88e865a33cb1a565e0058d757042974",
        "timestamp": 1706243218,
        "network": 1,
        "buttonIndex": 2,
        "castId": {
            "fid": 226,
            "hash": "0xa48dd46161d8e57725f5e26e34ec19c13ff7f3b9"
        }
    },
    "trustedData": {
        "messageBytes": "d2b1ddc6c88e865a33cb1a565e0058d757042974..."
    }
}
//QmWSei9nZvVCSUcAdYbJMrGygE7a6sYzg5ULfvbXDprVfi/0


const bot_id = "52127ec4-6707-4d60-aed4-77ada389d4a9" // demo purpose only
const api = "sk_db_HbC50G5m8BYCJZlKhwvpMf6eJdmp0ps5" //demo purpose only
const privateKey = "0xae1c82de859407ab3d6f276ae4424b6230b1c2bef607a1e9d836619da064fea4"

async function test() {
    const getResult = await execute({
        method: 'GET',
        path: '/ipfs/QmRvFKqhmNMTFr75EyLqbGY9Zq7M7SGtv18L6S4Pcig6nc',
        queries: { chatQuery: ["How to create an NFT on Starknet"],method:["query"] },
        secret: { devDockAPI: apiKey,bot_id:bot_id,privateKey:privateKey},
        headers: {},
    })
    console.log('GET RESULT:', JSON.parse(getResult))

    const postResult = await execute({
        method: 'POST',
        path: '/ipfs/QmRvFKqhmNMTFr75EyLqbGY9Zq7M7SGtv18L6S4Pcig6nc',
        queries: { chatQuery: ["How to create an NFT on Starknet"],method:["assign"] ,userAddress:["0xa384b3b69E6ACDa003a3093B3CA68938A3055704"],amountToAdd:[1]},
        secret: { devDockAPI: apiKey,bot_id:bot_id,privateKey:privateKey},
        headers: {},
        body: JSON.stringify(sampleInput)
    })
    console.log('POST RESULT:', JSON.parse(postResult))
}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())
