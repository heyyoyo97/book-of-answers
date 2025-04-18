'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AuroraBackground } from '@/components/ui/aurora-background'

export default function Home() {
    // 全局状态
    const [flipping, setFlipping] = useState(false)
    const [currentHue] = useState(105)        // 当前色相值（绿色）
    const [currentLightness, setCurrentLightness] = useState(95)   // 当前亮度值（初始很浅）
    const [interval, setIntervalId] = useState<NodeJS.Timeout | null>(null)

    // 获取下一页的颜色：随着翻页逐渐加深颜色
    const getNextPageColor = () => {
        setCurrentLightness(prev => Math.max(70, prev - 2))  // 每次降低2%亮度，最低70%
        return `hsl(${currentHue}, 40%, ${currentLightness}%)`
    }

    // 翻页函数：处理页面的创建和动画
    const flipPage = () => {
        const book = document.getElementById('book')
        if (!book) return
        
        // 首次翻页时初始化书本
        if (book.children.length === 0) {
            setCurrentLightness(95)  // 重置亮度
            
            // 创建第一页
            const firstPage = document.createElement('div')
            firstPage.className = 'page'
            const firstPageColor = getNextPageColor()
            firstPage.style.backgroundColor = firstPageColor
            book.appendChild(firstPage)
            
            // 创建最后一页（保持翻转状态）
            const lastPage = document.createElement('div')
            lastPage.className = 'page'
            lastPage.style.backgroundColor = firstPageColor
            lastPage.style.transform = 'rotateY(180deg)'
            book.appendChild(lastPage)
        }

        // 创建新页面
        const newPage = document.createElement('div')
        newPage.className = 'page'
        newPage.style.transform = 'rotateY(180deg)'  // 初始状态为翻转
        
        // 设置新页面颜色
        const newPageColor = getNextPageColor()
        newPage.style.backgroundColor = newPageColor
        
        // 更新最后一页颜色（保持正反面颜色一致）
        const lastPage = book.lastElementChild
        if (lastPage instanceof HTMLElement) {
            lastPage.style.backgroundColor = newPageColor
        }
        
        // 插入新页面并执行翻转动画
        book.insertBefore(newPage, book.lastElementChild)
        setTimeout(() => {
            newPage.style.transform = 'rotateY(0deg)'
        }, 50)

        // 维护页面数量（保持最多3页）
        if (book.children.length > 3) {
            const firstChild = book.firstElementChild
            if (firstChild) {
                book.removeChild(firstChild)
            }
        }
    }

    // 显示答案：调用API获取并显示答案
    const showAnswer = async () => {
        try {
            const response = await fetch('https://tools.mgtv100.com/external/v1/pear/answersBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: "你的问题" })
            })
            const data = await response.json()
            const answer = data.data.title_zh
            const pages = document.getElementsByClassName('page')
            
            if (pages.length >= 2) {
                // 在倒数第二页显示答案
                const answerPage = pages[pages.length - 2]
                if (answerPage instanceof HTMLElement) {
                    const answerSpan = document.createElement('span')
                    answerSpan.className = 'answer-text'
                    answerSpan.innerText = answer
                    answerPage.innerHTML = ''
                    answerPage.appendChild(answerSpan)
                    
                    // 执行渐显和清晰化效果
                    setTimeout(() => {
                        answerSpan.style.opacity = '1'
                        answerSpan.style.filter = 'blur(0)'
                    }, 500)
                }
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // 控制翻页开始/停止
    const toggleFlipping = () => {
        if (!flipping) {
            setCurrentLightness(95)  // 重置亮度
            setFlipping(true)
            const id = setInterval(flipPage, 500)  // 每500ms翻一页
            setIntervalId(id)
        } else {
            setFlipping(false)
            if (interval) {
                clearInterval(interval)
            }
            showAnswer()  // 显示答案
        }
    }

    // 清理定时器
    useEffect(() => {
        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    }, [interval])

    return (
        <div className="container">
            <div className="book" id="book"></div>
            <button onClick={toggleFlipping}>
                {flipping ? '停止' : '开始'}
            </button>
        </div>
    )
} 