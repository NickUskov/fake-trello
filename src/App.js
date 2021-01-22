import React from 'react'

import './App.css';

function App() {
  const [boards, setBoards] = React.useState([
    {id:1, title: 'Todo', items: [{id:1, title: 'learn React'}]},
    {id:3, title: 'Todo3', items: [{id:3, title: 'learn Redux'}]},
    {id:2, title: 'Todo2', items: [{id:2, title: 'learn Mobx'}]},
  ])

  const [currentBoard, setCurrentBoard] = React.useState(null)
  const [currentItem, setCurrentItem] = React.useState(null)

  //HANDLERS
  const dragOverHadler = (e, board, item) => {
    e.preventDefault()
    if(e.target.className === 'item'){
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  function dragDrop(e, board, item) {
    console.log(item)
    console.log(board)
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex,1)
    const dropIndex = currentBoard.items.indexOf(item)
    board.items.splice(dropIndex + 1,0, currentItem)
    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }

  function dropBoardHandler(event, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex,1)
    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))

  }

  return (
    <div className="app">
      {boards?.map((board) => {
        return (
         <div
           onDragOver={event => dragOverHadler(event)}
           onDrop={event => dropBoardHandler(event, board)}
           className="board">
          <div className="board__title">{board.title}</div>
           {board?.items.map(item =>
            <div
              onDragOver={e => dragOverHadler(e, board, item)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={e => dragStartHandler(e, board, item)}
              onDragEnd={e => dragEndHandler(e)}
              onDrop={e => dragDrop(e, board, item)}
              draggable={true}
              className="item">
              {item.title}
            </div>
           )}
         </div>
        )
      })}
    </div>
  );
}

export default App;
