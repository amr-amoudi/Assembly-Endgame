
interface LetterKeysInterface {
    children: string;
    eventHandler: (string: string) => void;
    isRight: boolean;
    isClicked: boolean;
    isDisabled: boolean;
}

export default function LetterButtons({children, eventHandler, isDisabled, isClicked, isRight}: LetterKeysInterface) {
    return (
        <button disabled={isClicked || isDisabled} onClick={() => eventHandler(children)}
                className={`w-11 h-11 text-black bg-[#FCBA29] 
                       border-2 border-[#d7d7d7] custom-font font-bold 
                       text-lg flex items-center justify-center rounded-md 
                       cursor-pointer uppercase select-none 
                       ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                       ${!isClicked ?  "" : isRight ? 'opacity-50 cursor-not-allowed bg-green-500' : "opacity-50 cursor-not-allowed bg-red-800"}
                       `
        }>
            {children}
        </button>
    )
}