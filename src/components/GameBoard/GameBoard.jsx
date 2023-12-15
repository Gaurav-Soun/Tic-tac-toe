import { useState } from "react";
import styles from './GameBoard.module.css';

const GameBoard = () => {
    const startBoard = Array(9).fill("");
    const [board, setBoard] = useState(startBoard);
    const [move, setMove] = useState('');
    const [winner, setWinner] = useState('');
    const [winBlocks, setWinBlocks] = useState([]);

    const moveHandler = (index) => {
        if (board[index] === "" && winner === "") {
            const newBoard = [...board];
            newBoard[index] = move;
            setBoard(newBoard);
    
            setMove(move === 'X' ? 'O' : 'X');
            checkWinner(newBoard, move);
        }
    
        console.log('clicked', index);
    };
    

    const resetHandler = () => {
        setBoard(startBoard);
        setWinner('');
        setMove('X');
        setWinBlocks([]);
    };
    console.log(board);

    const checkWinner = (newBoard, player) => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const condition of winConditions) {
            let tie = true;
            const [a, b, c] = condition;
            if (newBoard[a] !== "" && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
                setWinner('Winner is ' + player);
                setWinBlocks([a,b,c]);
                tie = false;

            }
            }
         if(tie && !newBoard.includes(" ")){
                setWinner("Tie")
        };
    };

    return (
        <>
            <div className={styles.board}>
                {board.map((block, index) => (
                    <div key={index} onClick={() => moveHandler(index)} 
                    className={winBlocks.includes(index) ? styles.win : ""}>{block}</div>
                ))}
            </div>
            <div className={styles.reset}>
                <button onClick={resetHandler}>Reset</button>
            </div>
            <div className={styles.winMsg}>{winner}</div>
            
        </>
    );
};

export default GameBoard;
