import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import BackButton from "./BackButton"
import Socials from "./Socials"

type AuthCardProps = {
    children : React.ReactNode ,
    cardTitle : string,
    backButtonHref : string ,
    backButtonLabel : string ,
    showSocials?: boolean
}

export const AuthCard = ({
    children,
    cardTitle ,
    backButtonHref ,
    backButtonLabel,
    showSocials,
} : AuthCardProps) => {

    return (
        <Card className="max-w-screen-md mx-auto">
            <CardHeader>
                <CardTitle className="text-xl text-center">{cardTitle}</CardTitle>
            </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
                {showSocials &&  (
                    <CardFooter>
                       <Socials />
                    </CardFooter>
                )}
                <CardFooter>
                    <BackButton href={backButtonHref} label={backButtonLabel} />
                </CardFooter>
        </Card>
    )
}