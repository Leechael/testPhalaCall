import { Request, Response, route } from './httpSupport'

const agent = async (devdockAPI: string, userQuery: string) => {
    const url = "https://api.devdock.ai/bot/52127ec4-6707-4d60-aed4-77ada389d4a9/api"

   const res=await  fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':devdockAPI 
        },
        body: JSON.stringify({
          "message": userQuery,
          "history": [],
          "stream": false
        })
      })
      return await res.json()

}

async function GET(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    const devDockAPI = req.secret?.devDockAPI as string;
    
    const query = req.queries.chatQuery[0] as string;
    

    const response = await agent(devDockAPI, query);

    return new Response((response.bot.text as string))
}

async function POST(req: Request): Promise<Response> {
    const secret = req.queries?.key ?? '';
    const devDockAPI = req.secret?.devDockAPI as string;
    const query = req.queries.chatQuery[0] as string;

    const response = await agent(devDockAPI, query);

    return new Response((response.bot.text as string))
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
