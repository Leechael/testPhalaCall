import { Request, Response, route } from './httpSupport'
import { rewardAddres, rewardABI } from "./rewardContract";
import { http, createWalletClient, createPublicClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { baseSepolia } from 'viem/chains'

const publicClient = createPublicClient({
  // @ts-ignore
  chain: baseSepolia,
  transport: http()
})

const agent = async (devDockAPI: string, bot_id: string, userQuery: string) => {
  const url = `https://api.devdock.ai/bot/${bot_id}/api`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': devDockAPI
    },
    body: JSON.stringify({
      "message": userQuery,
      "history": [],
      "stream": false
    })
  })
  return await res.json()

}
const assignReward = async (privateKey:string,userAddress: string, score: number) => {
  const account = privateKeyToAccount(privateKey as `0x{string}`)
  const walletClient = createWalletClient({
    account,
    // @ts-ignore
    chain: baseSepolia,
    transport: http(),
  })


  const { request } = await publicClient.simulateContract({
    address: rewardAddres,
    abi: rewardABI,
    functionName: 'updateBalance',
    args: [userAddress, score],
    account
  })
  await walletClient.writeContract(request)

}


async function GET(req: Request): Promise<Response> {
  const method = req.queries.method[0] as string;
  if (method == "query") {
    const devDockAPI = req.secret?.devDockAPI as string;
    const bot_id = req.secret?.bot_id as string;
    const query = req.queries.chatQuery[0] as string;

    const response = await agent(devDockAPI, bot_id, query);

    return new Response((response.bot.text as string))
  }
  else if (method == "assign") {
    const privateKey = req.secret?.privateKey as string;
    const userAddress = req.queries.userAddress[0] as string;
    const amountToAdd = Number(req.queries.amountToAdd[0]);
    await assignReward(privateKey,userAddress, amountToAdd)

    return new Response("Balance Updated Successfully")

  }
  else {
    return new Response("Invalid Method")
  }
}

async function POST(req: Request): Promise<Response> {
  const method = req.queries.method[0] as string;
  if (method == "query") {
    const devDockAPI = req.secret?.devDockAPI as string;
    const bot_id = req.secret?.bot_id as string;
    const query = req.queries.chatQuery[0] as string;

    const response = await agent(devDockAPI, bot_id, query);

    return new Response((response.bot.text as string))
  }
  else if (method == "assign") {
    const privateKey = req.secret?.privateKey as string;
    const userAddress = req.queries.userAddress[0] as string;
    const amountToAdd = Number(req.queries.amountToAdd[0]);
    await assignReward(privateKey,userAddress, amountToAdd)

    return new Response("Balance Updated Successfully")

  }
  else {
    return new Response("Invalid Method")
  }

}

export default async function main(request: string) {
  return await route({ GET, POST }, request)
}
