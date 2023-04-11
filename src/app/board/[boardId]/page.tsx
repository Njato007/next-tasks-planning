'use client'
import Card from '@/components/Card';
import React, {useState, useEffect} from 'react'
type PageProps = {
    params: {
        boardId: string,
    }
}

function page({ params: { boardId } } : PageProps) {


    const [board, setBoard] = useState<BoardType>();

    const fetchBoard = async () => {
        const res = await fetch(`/api/boards?id=${boardId}`);
        const data: BoardType = await res.json();
        return data;
    }

    useEffect(() => {
        fetchBoard().then(data => {
            setBoard(data);
            const mainPage = document.getElementById('main-page');
            if (mainPage) {
                mainPage.style.background = ``;
                mainPage.style.backgroundImage = ``;
                const { isImage } = data.background;
                if (!isImage) {
                    const { isGradient } = data.background.color;
                    if (!isGradient) {
                        const { simple } = data.background.color;
                        mainPage.style.background = `${simple}`
                    } else {
                        const {gradient} = data.background.color;
                        const linearGradient = `linear-gradient(to right, ${gradient?.from}, ${gradient?.to})`;
                        mainPage.style.background = linearGradient;
                    }
                }
            }
        });



    }, [boardId])


    return (
      <div className={`flex p-5 gap-6 w-full h-full bg-transparent border-l border-slate-200 dark:border-slate-700 top-0 left-0 bottom-0 right-0`}>
          <Card />
          <Card />
          <Card />

      </div>
    )
}
  
export default page