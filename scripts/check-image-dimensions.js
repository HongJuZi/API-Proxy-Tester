const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 检查图片尺寸函数
async function checkImageDimensions() {
  const publicDemoDir = path.join(__dirname, '..', 'public', 'demo');
  const files = fs.readdirSync(publicDemoDir);
  
  for (const file of files) {
    const filePath = path.join(publicDemoDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // 只处理图片文件
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      try {
        await sharp(filePath).metadata();
      } catch (error) {
      }
    }
  }
}

checkImageDimensions();