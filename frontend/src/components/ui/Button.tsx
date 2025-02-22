const btnType = {
    primary : 'btn--primary' ,
    secondary : 'btn--secondary' ,
    outline : 'btn--outline' , 
    danger : 'btn--danger' ,
    red : ''
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>  
    variant?: 'primary' | 'secondary' | 'red' | 'danger' | 'outline';
    className?: string;
}

function Button({
    children ,
    onClick ,
    variant = 'primary' ,
    className ,
    ...rest
}: ButtonProps) {
    return <button
    onClick={onClick}
    className={`btn ${btnType[variant]} ${className}`}
    {...rest}>
        {children}
    </button>
}

export default Button ;