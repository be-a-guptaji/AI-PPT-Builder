import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";

type IndexProps = {
    children: React.ReactNode;
    className?: string;
    discription: string;
    loading?: boolean;
    onClick: () => void;
    open: boolean;
    handleOpen: () => void;
};

const AlertDialogBox = ({
    children,
    className,
    discription,
    loading = false,
    onClick,
    open,
    handleOpen,
}: IndexProps) => {
    return (
        <AlertDialog open={open} onOpenChange={handleOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {discription}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer transition-all duration-200">
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant={"destructive"}
                        className={`${className} cursor-pointer`}
                        onClick={onClick}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Loading
                            </>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogBox;
