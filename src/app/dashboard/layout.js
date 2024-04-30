import {Button} from "@/components/ui/button";

export default function layout({ children }) {
    return (
        <div className="flex flex-col max-w-screen-2xl mx-auto">
            <div className="border-b-2 p-2 flex flex-row justify-between">
                <div className="py-3">
                    <h1 className="text-2xl">
                        Dashboard Auto-Land
                    </h1>
                </div>
                <div className="flex items-center">
                    <Button>Wyloguj</Button>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}