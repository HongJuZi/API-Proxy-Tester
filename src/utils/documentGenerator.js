// 文档生成模块
class DocumentGenerator {
  // 生成文档
  generateDocument(config, type, apiName, apiDescription, apiAuthor, responseData = null) {
    let content = ''
    
    if (type === 'markdown') {
      content = `# ${apiName}\n\n`
      content += `## 接口描述\n${apiDescription}\n\n`
      content += `## 请求信息\n`
      content += `- **方法**: ${config.method}\n`
      content += `- **URL**: ${config.url}\n`
      content += `- **作者**: ${apiAuthor}\n\n`
      
      if (Object.keys(config.headers).length > 0) {
        content += `## 请求头\n`
        content += `| 名称 | 值 |\n`
        content += `|------|-----|\n`
        Object.entries(config.headers).forEach(([key, value]) => {
          content += `| ${key} | ${value} |\n`
        })
        content += `\n`
      }
      
      if (Object.keys(config.params).length > 0) {
        content += `## 请求参数\n`
        content += `| 参数名 | 参数值 |\n`
        content += `|--------|--------|\n`
        Object.entries(config.params).forEach(([key, value]) => {
          content += `| ${key} | ${value} |\n`
        })
        content += `\n`
      }
      
      if (config.data) {
        content += `## 请求体\n`
        content += '```json\n'
        content += JSON.stringify(config.data, null, 2)
        content += '\n```\n'
      }
      
      // 添加响应信息
      if (responseData) {
        content += `## 响应信息\n`
        content += `- **状态码**: ${responseData.code || 'N/A'}\n`
        if (responseData.time !== undefined) {
          content += `- **响应时间**: ${responseData.time}ms\n`
        }
        if (responseData.size !== undefined) {
          content += `- **响应大小**: ${responseData.size}\n`
        }
        content += '\n'
        
        if (responseData.content) {
          content += `## 响应体\n`
          content += '```json\n'
          // 尝试解析响应内容为JSON
          let formattedContent = responseData.content
          try {
            if (typeof responseData.content === 'string') {
              formattedContent = JSON.stringify(JSON.parse(responseData.content), null, 2)
            } else {
              formattedContent = JSON.stringify(responseData.content, null, 2)
            }
          } catch (e) {
            // 如果不是有效的JSON，直接使用原始内容
            formattedContent = responseData.content
          }
          content += formattedContent
          content += '\n```\n'
        }
      }
    } else if (type === 'html') {
      content = `<style>
        .doc-preview {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          word-wrap: break-word;
        }
        .doc-preview h1 { font-size: 24px; margin: 10px 0; }
        .doc-preview h2 { font-size: 20px; margin: 8px 0; }
        .doc-preview ul { padding-left: 20px; }
        .doc-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
        }
        .doc-preview th, .doc-preview td {
          border: 1px solid #ddd;
          padding: 5px;
          text-align: left;
          word-wrap: break-word;
          max-width: 300px;
        }
        .doc-preview th { background-color: #f9f9f9; }
        .doc-preview pre {
          background: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
          overflow: auto;
          word-wrap: break-word;
          white-space: pre-wrap;
        }
      </style>`;
      content += `<div class="doc-preview">`
      content += `<h1>${apiName}</h1>`
      content += `<h2>接口描述</h2>`
      content += `<p>${apiDescription}</p>`
      content += `<h2>请求信息</h2>`
      content += `<ul>`
      content += `<li><strong>方法</strong>: ${config.method}</li>`
      content += `<li><strong>URL</strong>: ${config.url}</li>`
      content += `<li><strong>作者</strong>: ${apiAuthor}</li>`
      content += `</ul>`
      
      if (Object.keys(config.headers).length > 0) {
        content += `<h2>请求头</h2>`
        content += `<table>`
        content += `<thead><tr><th>名称</th><th>值</th></tr></thead>`
        content += `<tbody>`
        Object.entries(config.headers).forEach(([key, value]) => {
          content += `<tr><td>${key}</td><td>${value}</td></tr>`
        })
        content += `</tbody></table>`
      }
      
      if (Object.keys(config.params).length > 0) {
        content += `<h2>请求参数</h2>`
        content += `<table>`
        content += `<thead><tr><th>参数名</th><th>参数值</th></tr></thead>`
        content += `<tbody>`
        Object.entries(config.params).forEach(([key, value]) => {
          content += `<tr><td>${key}</td><td>${value}</td></tr>`
        })
        content += `</tbody></table>`
      }
      
      if (config.data) {
        content += `<h2>请求体</h2>`
        content += `<pre>`
        content += JSON.stringify(config.data, null, 2)
        content += `</pre>`
      }
      
      // 添加响应信息
      if (responseData) {
        content += `<h2>响应信息</h2>`
        content += `<ul>`
        content += `<li><strong>状态码</strong>: ${responseData.code || 'N/A'}</li>`
        if (responseData.time !== undefined) {
          content += `<li><strong>响应时间</strong>: ${responseData.time}ms</li>`
        }
        if (responseData.size !== undefined) {
          content += `<li><strong>响应大小</strong>: ${responseData.size}</li>`
        }
        content += `</ul>`
        
        if (responseData.content) {
          content += `<h2>响应体</h2>`
          content += `<pre>`
          // 尝试解析响应内容为JSON
          let formattedContent = responseData.content
          try {
            if (typeof responseData.content === 'string') {
              formattedContent = JSON.stringify(JSON.parse(responseData.content), null, 2)
            } else {
              formattedContent = JSON.stringify(responseData.content, null, 2)
            }
          } catch (e) {
            // 如果不是有效的JSON，直接使用原始内容
            formattedContent = responseData.content
          }
          content += formattedContent
          content += `</pre>`
        }
      }
      
      content += `</div>`
    }
    
    return content
  }
  
  // Markdown转HTML（简单实现）
  markdownToHtml(markdown) {
    return markdown
      .replace(/#{1,3}\s+([^\n]+)/g, (match, p1) => {
        const level = match.match(/^#+/)?.[0].length || 1
        return `<h${Math.min(level, 3)}>${p1}</h${Math.min(level, 3)}>`
      })
      .replace(/\n-\s+([^\n]+)/g, '<ul><li>$1</li></ul>')
      .replace(/<\/ul>\s*<ul>/g, '')
      .replace(/\n\n([^\n]+)\n\n/g, '<p>$1</p>')
      .replace(/```json\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>')
      .replace(/\|([^\|]+)\|([^\|]+)\|\n\|[\-\|]+\|\n((?:\|[^\|]+\|[^\|]+\|\n)+)/g, (match, header1, header2, rows) => {
        let table = '<table border="1" cellpadding="5" cellspacing="0" width="100%" style="border-collapse: collapse;">'
        table += `<thead><tr><th>${header1}</th><th>${header2}</th></tr></thead>`
        table += '<tbody>'
        rows.split('\n').forEach(row => {
          if (row.trim()) {
            const [, cell1, cell2] = row.match(/\|([^\|]+)\|([^\|]+)\|/)
            table += `<tr><td>${cell1}</td><td>${cell2}</td></tr>`
          }
        })
        table += '</tbody></table>'
        return table
      })
  }
}

// 创建并导出DocumentGenerator实例
const documentGenerator = new DocumentGenerator()
export default documentGenerator
