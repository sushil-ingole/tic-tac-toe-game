import { MouseEventHandler } from "react";

interface ISquare {
    value: string;
    index: number;
    onSquareClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Square({ value, index, onSquareClick }: ISquare) {

    return (
        <button className={`square box-${index}`} onClick={onSquareClick}>{value}</button>
    )
}

