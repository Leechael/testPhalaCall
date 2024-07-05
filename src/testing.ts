
async function fetchWithStream(url: string,ipfs:string,key:string,query:string) {
  try {
    const response = await fetch(`${url}/${ipfs}/0?key=${key}&chatQuery=${query}`, {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream' 
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('ReadableStream is not supported.');
    }

    const decoder = new TextDecoder('utf-8');
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      result += decoder.decode(value, { stream: true });
    }

    console.log('Streamed response:', result);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
const url = 'https://agents.phala.network/ipfs';
const ipfs = 'Qma2WjqWqW8wYG2tEQ9YFUgyVrMDA9VzvkkdeFny7Smn3R'
const key ="686df81d326fa5f2"
const query="When did the humans landed on the moon?"

fetchWithStream(url,ipfs,key,query);
