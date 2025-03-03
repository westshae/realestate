// // Import fetch and SocksProxyAgent
// import fetch from 'node-fetch';
// import { SocksProxyAgent } from 'socks-proxy-agent';
// import { exec } from 'child_process';

// // Configure your Tor SOCKS proxy address (default: 9050)
// const torProxy = 'socks5://127.0.0.1:9050';
// let agent = new SocksProxyAgent(torProxy);

// /**
//  * Perform a fetch request via Tor.
//  * If the response indicates a block, rotate the Tor circuit and retry.
//  */
// export async function getFetchWithTor(url: string, options = {}) {
//   return await fetch(url, options);
  
//   try {
//     // Include the SOCKS proxy agent in your fetch options
//     const response = await fetch(url, { agent, ...options });
    
//     // Check for a block (for example, a 403 status code)
//     if (response.status === 403) {
//       console.log('Request blocked! Rotating Tor circuit...');
//       await rotateTorCircuit();
//       // Retry the fetch after rotation
//       return await getFetchWithTor(url, options);
//     }
//     return response;
//   } catch (error) {
//     console.error('Fetch error:', error);
//     // On network errors, try rotating the circuit and then retry
//     await rotateTorCircuit();
//     return await getFetchWithTor(url, options);
//   }
// }

// export async function postFetchWithTor(url: string, body: any, options = {}) {
//   try {
//     // Include the SOCKS proxy agent and method in your fetch options
//     const response = await fetch(url, {
//       method: 'POST',
//       agent,
//       body: JSON.stringify(body),
//       headers: { 'Content-Type': 'application/json' },
//       ...options
//     });
    
//     // Check for a block (for example, a 403 status code)
//     if (response.status === 403) {
//       console.log('Request blocked! Rotating Tor circuit...');
//       await rotateTorCircuit();
//       // Retry the fetch after rotation
//       return await postFetchWithTor(url, body, options);
//     }
    
//     // Parse the response body
//     let responseBody;
//     try {
//       responseBody = await response.json();
//     } catch (e) {
//       responseBody = null;
//     }
//     return { response, responseBody };
//   } catch (error) {
//     console.error('Fetch error:', error);
//     // On network errors, try rotating the circuit and then retry
//     await rotateTorCircuit();
//     return await postFetchWithTor(url, body, options);
//   }
// }

// /**
//  * Rotate the Tor circuit by sending the NEWNYM signal via the control port.
//  * Make sure Tor's control port is enabled (usually on 9051) and configured.
//  */
// function rotateTorCircuit() {
//   return new Promise((resolve, reject) => {
//     // This command stops the Tor process and then starts it again
//     const cmd = 'sudo killall tor && tor &';
//     exec(cmd, (error, stdout, stderr) => {
//       if (error) {
//         console.error('Error rotating circuit:', error);
//         return reject(error);
//       }
//       console.log('Tor process restarted:', stdout.trim());
//       // Wait a few seconds (e.g. 5 seconds) for Tor to build a new circuit
//       setTimeout(resolve, 5000);
//     });
//   });
// }

// // Example usage inside your Next.js API route:
// // export default async function handler(req: any, res: any) {
// //   try {
// //     const response = await fetchWithTor('https://example.com/data');
// //     const data = await response.json();
// //     res.status(200).json(data);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Unable to fetch data via Tor' });
// //   }
// // }
