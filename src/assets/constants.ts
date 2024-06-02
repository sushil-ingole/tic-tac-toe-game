export const STATUS_MESSAGES = {
    NEXT_PLAYER: (player: string) => `Next player : ${player}`,
    WINNER: (player: string) => `Winner : ${player}`,
    DRAW: "Draw",
};

// Button texts
export const BUTTON_TEXTS = {
    PLAY_WITH_HUMAN: "Play with Human",
    PLAY_WITH_BOT: "Play with Bot",
    RESTART: "Restart",
    PLAYER1: "X",
    PLAYER2: "O"
};

// Other constants
export const GAME_TITLE = "Tic Tac Toe";

export const winAllCSSConfig: Map<string, { gridRow: string, top: string, height: string }> = new Map(
    [
        ["012", { gridRow: "1", top: "5%", height: "7vh" }],
        ["345", { gridRow: "2", top: "7%", height: "7vh" }],
        ["678", { gridRow: "3", top: "16%", height: "7vh" }],
        ["036", { gridRow: "1", gridColumn: "1", left: "5%", top: "0%", height: "30vh", width: "7vh" }],
        ["147", { gridRow: "1", gridColumn: "2", left: "7%", top: "0%", height: "30vh", width: "7vh" }],
        ["258", { gridRow: "1", gridColumn: "3", left: "16%", top: "0%", height: "30vh", width: "7vh" }],
        ["048", { gridRow: "1", top: "38%", left: "-14%", height: "7vh", width: "129%", rotate: "45deg" }],
        ["246", { gridRow: "1", top: "38%", right: "-18.5%", height: "7vh", width: "129%", rotate: "135deg" }]
    ]
);


