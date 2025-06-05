

interface LetterGuessPlaceHolderInterface {
    children: string;
    isShown: boolean;
    isLost: boolean;
}

export default function LetterGuessPlaceHolder({children, isShown, isLost}: LetterGuessPlaceHolderInterface) {
    return (
        <div className={`w-10 h-10 bg-[#323232] flex 
        items-center border-b-2 border-[#f9f4da] justify-center`}>
            {(isLost || isShown) && <span className={`text-lg 
            ${isLost && !isShown? 'text-[#ec5d49]' : 'text-[#f9f4da]'}
            custom-font font-extrabold`}>{children}</span>
            }
        </div>
    );
}