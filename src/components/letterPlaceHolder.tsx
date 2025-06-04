
export default function LetterPlaceHolder({children}: {children : React.ReactNode}) {
    return (
        <div className={'w-10 h-10 bg-[#323232] flex items-center border-b-2 border-[#-[#f9f4da]] justify-center'}>
            <span className={'text-lg text-[#f9f4da] custom-font font-extrabold'}>{children}</span>
        </div>
    );
}