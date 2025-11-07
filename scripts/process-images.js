const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 确保public/demo目录存在
const publicDemoDir = path.join(__dirname, '..', 'public', 'demo');
if (!fs.existsSync(publicDemoDir)) {
  fs.mkdirSync(publicDemoDir, { recursive: true });
}

// 图片处理函数
async function processImage(inputPath, outputPath, width = 1000) {
  try {
    await sharp(inputPath)
      .resize({ width: width })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
    
  } catch (error) {
    
  }
}

// 处理所有图片
async function processAllImages() {
  const demoDir = path.join(__dirname, '..', 'demo');
  const files = fs.readdirSync(demoDir);
  
  for (const file of files) {
    const inputPath = path.join(demoDir, file);
    const ext = path.extname(file).toLowerCase();
    
    // 只处理图片文件
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      const outputPath = path.join(publicDemoDir, `${path.basename(file, ext)}.jpg`);
      await processImage(inputPath, outputPath);
    }
  }
  
  
}

processAllImages();