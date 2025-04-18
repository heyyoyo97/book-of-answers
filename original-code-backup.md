# 原始代码备份

## index.html
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>答案之书</title>
    <style>
        /* 基础样式：重置页面默认样式 */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        
        /* 主容器：垂直居中所有内容 */
        .container {
            background-color: #f0f0f0;  /* 背景色 */
            min-height: 100%;  /* 至少占满整个视窗高度 */
            display: flex;
            justify-content: center;  /* 水平居中 */
            align-items: center;      /* 垂直居中 */
            flex-direction: column;   /* 垂直排列子元素 */
            padding: 20px;
            box-sizing: border-box;   /* 内边距计入总宽度 */
        }
        
        /* 书本容器：控制书本大小和3D效果 */
        .book {
            position: relative;
            /* 书本宽度: 650px是最大宽度，85vw是在小屏上占视窗宽度的85% */
            width: min(650px, 85vw);
            
            /* 书本高度: 用宽度乘以1.1来计算，1.1决定高宽比例
               - 1.0 = 正方形
               - 小于1 = 更宽的长方形
               - 大于1 = 更高的长方形
            */
            height: calc(min(650px, 85vw) * 0.8);
            
            perspective: 1500px;      /* 3D效果的深度 */
            transform-style: preserve-3d;  /* 保持3D效果 */
            margin-bottom: min(30px, 5vw); /* 底部间距，在小屏上自动缩小 */
        }
        
        /* 书页样式：控制每一页的外观和动画 */
        .page {
            position: absolute;
            width: 50%;              /* 每页占书本宽度的一半 */
            height: 100%;
            transform-origin: right center;  /* 从右侧中心进行翻转 */
            transition: transform 1s ease;   /* 翻页动画持续1秒 */
            background-color: #ffffff;
            /* 添加内阴影，增加立体感 */
            box-shadow: inset 0px -1px 2px rgba(50, 50, 50, 0.1), 
                       inset -1px 0px 1px rgba(150, 150, 150, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            /* 字体大小：最大1.6rem，但在小屏上不超过4vw */
            font-size: min(1.6rem, 4vw);
            color: #333;
            /* 内边距：最大16px，但在小屏上不超过3vw */
            padding: min(16px, 3vw);
            box-sizing: border-box;
        }
        
        /* 答案文字样式：控制答案的显示效果 */
        .answer-text {
            opacity: 0;              /* 初始透明 */
            filter: blur(10px);      /* 初始模糊效果 */
            /* 过渡效果：透明度和模糊度的变化 */
            transition: opacity 1s ease, filter 1s ease;
            padding: min(16px, 3vw);
            text-align: center;
            width: 100%;
            box-sizing: border-box;
            word-break: break-word;  /* 文字换行 */
            line-height: 1.6;        /* 行高 */
        }
        
        /* 按钮样式 */
        button {
            /* 内边距：水平和垂直方向自适应 */
            padding: min(16px, 3vw) min(32px, 6vw);
            font-size: min(1rem, 4vw);  /* 字体大小自适应 */
            color: #fff;
            background-color: #333;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;  /* 悬停效果 */
            margin-top: min(20px, 4vw);
            -webkit-tap-highlight-color: transparent;  /* 移动端点击无高亮 */
        }
        
        /* 按钮悬停效果 */
        button:hover {
            background-color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="book" id="book"></div>
        <button id="toggleButton" onclick="toggleFlipping()">开始</button>
    </div>

    <script>
        // 全局变量
        let flipping = false;        // 控制翻页状态
        let interval;                // 存储定时器ID
        let currentPage = 0;         // 当前页码
        let currentHue = 105;        // 当前色相值（绿色）
        let currentLightness = 95;   // 当前亮度值（初始很浅）

        // 获取下一页的颜色：随着翻页逐渐加深颜色
        function getNextPageColor() {
            currentLightness = Math.max(70, currentLightness - 2);  // 每次降低2%亮度，最低70%
            return `hsl(${currentHue}, 40%, ${currentLightness}%)`;
        }

        // 翻页函数：处理页面的创建和动画
        function flipPage() {
            const book = document.getElementById('book');
            
            // 首次翻页时初始化书本
            if (book.children.length === 0) {
                currentLightness = 95;  // 重置亮度
                
                // 创建第一页
                const firstPage = document.createElement('div');
                firstPage.className = 'page';
                const firstPageColor = getNextPageColor();
                firstPage.style.backgroundColor = firstPageColor;
                book.appendChild(firstPage);
                
                // 创建最后一页（保持翻转状态）
                const lastPage = document.createElement('div');
                lastPage.className = 'page';
                lastPage.style.backgroundColor = firstPageColor;
                lastPage.style.transform = 'rotateY(180deg)';
                book.appendChild(lastPage);
            }

            // 创建新页面
            const newPage = document.createElement('div');
            newPage.className = 'page';
            newPage.style.transform = 'rotateY(180deg)';  // 初始状态为翻转
            
            // 设置新页面颜色
            const newPageColor = getNextPageColor();
            newPage.style.backgroundColor = newPageColor;
            
            // 更新最后一页颜色（保持正反面颜色一致）
            const lastPage = book.lastElementChild;
            if (lastPage) {
                lastPage.style.backgroundColor = newPageColor;
            }
            
            // 插入新页面并执行翻转动画
            book.insertBefore(newPage, book.lastElementChild);
            setTimeout(() => {
                newPage.style.transform = 'rotateY(0deg)';
            }, 50);

            // 维护页面数量（保持最多3页）
            if (book.children.length > 3) {
                book.removeChild(book.firstElementChild);
            }
            currentPage++;
        }

        // 控制翻页开始/停止
        function toggleFlipping() {
            const button = document.getElementById('toggleButton');
            if (!flipping) {
                currentLightness = 95;  // 重置亮度
                flipping = true;
                button.innerText = '停止';
                interval = setInterval(flipPage, 500);  // 每500ms翻一页
            } else {
                flipping = false;
                button.innerText = '开始';
                clearInterval(interval);
                showAnswer();  // 显示答案
            }
        }

        // 显示答案：调用API获取并显示答案
        function showAnswer() {
            fetch('https://tools.mgtv100.com/external/v1/pear/answersBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: "你的问题" })
            })
            .then(response => response.json())
            .then(data => {
                const answer = data.data.title_zh;
                const pages = document.getElementsByClassName('page');
                if (pages.length >= 2) {
                    // 在倒数第二页显示答案
                    const answerPage = pages[pages.length - 2];
                    const answerSpan = document.createElement('span');
                    answerSpan.className = 'answer-text';
                    answerSpan.innerText = answer;
                    answerPage.innerHTML = '';
                    answerPage.appendChild(answerSpan);
                    
                    // 执行渐显和清晰化效果
                    setTimeout(() => {
                        answerSpan.style.opacity = '1';
                        answerSpan.style.filter = 'blur(0)';
                    }, 500);
                }
            })
            .catch(error => console.error('Error:', error));
        }
    </script>
</body>
</html>
```

## server.js
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

## package.json
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^5.1.0"
  }
}
``` 