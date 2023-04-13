"use client"
import { useState, useEffect } from 'react';
import BoardItem from './BoardItem'
import BoardForm from './BoardForm';
import BoardSearch from './BoardSearch';
import BoardSetting from './BoardSetting';
import { useRouter, usePathname } from 'next/navigation';
import BoardSettingBar from './BoardSettingBar';

const BoardsList = ({
  isSearch,
  isAdd,
  onCloseSearch,
  OnCloseAdd,
} : {
  isSearch: boolean,
  isAdd: boolean,
  onCloseSearch: Function,
  OnCloseAdd: Function,
}) => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [search, setSearch] = useState<string>('a');
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  const [openSetting, setOpenSetting] = useState<BoardType>();

  const router = useRouter();
  const path = usePathname();
  const boardId = path.split('/')[path.split('/').length - 1];

  const fetchBoards = async () => {
    const res = await fetch('/api/boards', {cache: 'no-cache', next: {revalidate: 2}});
    const data: BoardType[] = await res.json();
    return data;
  };

  useEffect(() => {
    fetchBoards().then(data => {
      setBoards(data);
      console.log(data)
    });
  }, []);

  const submitBoardForm = (e: string) => {
    const newBoard: BoardType = {
      id: `${Date.now()}`, name: e, creator: 'unknown',
      background: {
        isImage: false,
        image: '',
        color: {
          isGradient: true,
          gradient: {
            from: '#99000',
            to: '#000099'
          }
        }
      }
    }
    setBoards([newBoard, ...boards])
  }
  // const submitBoardSearch = (e: string) => { alert(e) }

  // handle update only name
  const handleUpdate = (id: string, newName: string) => {
    setBoards(prev => ( prev.map( board => board.id === id ? {...board, name: newName} : board) ));
  }

  const handleOpenSetting = (data: BoardType) => {
    setOpenSetting(data);
    setTimeout(() => {
      setIsOpenSetting(true);
    }, 0);
  }

  const handleCloseSetting = () => {
    setIsOpenSetting(false);
  }

  const handleCloseSearch = () => {
    setTimeout(() => {
      setSearch('');
    }, 0);
    onCloseSearch(true);
  }

  const handleCloseAdd = () => {
    OnCloseAdd(true);
    setTimeout(() => {
      setSearch('');
    }, 0);
  }

  // update whole board properties from setting
  const handleUpdateFromSetting = (data: BoardType) => {
    setBoards(prev => ( prev.map( board => board.id === data.id ? data : board) ));
    setIsOpenSetting(false);
  }

  return (
    <>
      {
        isAdd && 
        <BoardForm onExit={handleCloseAdd} onSubmit={submitBoardForm} />
      }
      {
        isSearch && 
        <BoardSearch onExit={handleCloseSearch} onSearch={setSearch} searchValue={search} />
      }
      <div className='grid grid-cols-1 space-y-0 bg-white-50/10 dark:bg-slate-950/70 py-2'>
          {
              boards.filter(board => board.name.toLowerCase().match(search.toLowerCase()))
              // boards
              .map(board => (
                  <div key={board.id} onDoubleClick={() => router.push(`/board/${board.id}`)} className={boardId === board.id ? 'is-active' : ''}>
                    <BoardItem data={board} onUpdate={handleUpdate} onOpenSetting={handleOpenSetting} active={boardId}/>
                  </div>
              ))
          }
      </div>
      {isOpenSetting && <BoardSettingBar data={openSetting} onUpdate={handleUpdateFromSetting} onClose={handleCloseSetting}/>}
    </>
  )
}

export default BoardsList