import { auth } from "@/server/auth";
import Logo from "./logo";
import { UserButton } from "./user-button";
import { Button } from "../ui/button";
import Link from "next/link";
import {LogIn} from 'lucide-react'


export default async function Nav() {
    const session = await auth()

    
    return (
        <header 
        className="py-8">
            <nav>
                <ul className="flex items-center justify-between">
                    <li><Logo /></li>
                    {!session ? (
                        <li>
                            <Button asChild>
                                <Link
                                className="flex gap-2 "
                                href={"/auth/login"}><LogIn size={16}/><span>Login</span></Link>
                            </Button>
                        </li>
                    ) : (
                        <li><UserButton expires={session?.expires} user={session?.user}/></li>
                    )}
                </ul>
            </nav>
        </header>
    )
}