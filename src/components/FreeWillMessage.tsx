
interface FreeWillMessageInterface {
    children: string;
    isWon: boolean;
    isLost: boolean;
    display: boolean;
}


export default function FreeWillMessage({children, isWon, isLost, display}: FreeWillMessageInterface) {
    function getFarewellText() {
        if(isLost) {
            return (
                <>
                    <h1>Game Over!</h1>
                    <p className={'m-0 text-base font-normal'}>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }else if(isWon) {
            return (
                <>
                    <h1>You Won</h1>
                    <p>Well done! 🎉</p>
                </>
            )
        }else {
            return <h1>{children}</h1>
        }
    }

    return (
        <div className={`h-[60px]
                ${display ? 'opacity-100' : 'opacity-0'} w-full
                max-w-[350px]
                flex items-center justify-center 
                rounded-lg shadow-lg my-5 custom-font 
                font-bold italic text-[#f9f4da] ${isWon ? 'bg-[#10a95b]' : isLost ? 'bg-[#ba2a2a]' : 'bg-[#7a5ea7]'} text-lg flex-col`}>
            {getFarewellText()}
        </div>
    );

}