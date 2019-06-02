import { utils } from 'icetea-web3';

const switchEncoding = utils.switchEncoding;
const tryParseJson = utils.tryParseJson


export const formatData = (data , hash) => {
    return data = formatContractData(data, hash)
}

function formatContractData (data, contract) {
    if (data.op === 0) {
      const modes = ['JS Raw', 'JS Decorated', 'WASM']
      const comment = `// Deploy ${contract}\n// Params: ${(data.params || []).join(', ') || 'none'}
  // Source mode: '${modes[data.mode]}'\n// Source code:\n`
      const source = (data.mode === 100) ? '/* WASM Binary */'
        : switchEncoding(data.src, 'base64', 'utf8')
      return comment + source
    } else if (data.op === 1) {
      const method = data.name
      const params = (data.params || []).map(p => {
        let pp = tryParseJson(p)
        if (typeof pp === 'string') {
          pp = `"${pp}"`
        }
        return JSON.stringify(pp)
      }).join(', ')
      const line = `${method}(${params});`
      const comment = `// Call method '${method}' of\n// ${contract}`
  
      return [comment, line].join('\n')
    }
  
    return 'N/A' // JSON.stringify(data, null, 2);
  }
  