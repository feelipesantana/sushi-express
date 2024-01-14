import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from "@/services/api";
import { toast, Toaster } from "sonner"
import { useNavigate } from "react-router-dom";

const signUpSchema = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type SignUpSchema = z.infer<typeof signUpSchema>
export function SignUp() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
    })

    async function handleRegisterRestaurant(data: SignUpSchema) {
        console.log(data)

        try {
            await api.post('/restaurants', {
                restaurantName: data.restaurantName,
                managerName: data.managerName,
                email: data.email,
                phone: data.phone
            })

            toast.success('Registered Restaurant', {
                description: '',
                action: {
                    label: 'Login',
                    onClick: () => {
                        navigate(`/sign-in?email=${data.email}`)
                    },
                },
            })


        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className="lg:p-8">
            <Toaster />
            <a href="/sign-in"
                className={twMerge(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md-top-8')}
            >
                Login in
            </a>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Create Free an account
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Become a partner <span className="font-semibold">sushi.express </span>
                        and begin your sales!
                    </p>
                    <div className="">
                        <form onSubmit={handleSubmit(handleRegisterRestaurant)}>
                            <div className="mt-8 space-y-6 ">
                                <div className="flex flex-col items-start gap-2 ">
                                    <Label htmlFor="name">Business's Name</Label>
                                    <Input id="restaurantName" type="text" autoCorrect="off" {...register('restaurantName')} />
                                </div>
                                <div className="flex flex-col items-start gap-2 ">
                                    <Label htmlFor="managerName">Your name</Label>
                                    <Input id="name" type="text" autoCorrect="off" {...register('managerName')} />
                                </div>
                                <div className="flex flex-col items-start gap-2 ">
                                    <Label htmlFor="email">Your email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="email"
                                        autoCorrect="off"
                                        {...register('email')}
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-2 ">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        placeholder="(99) 99999-9999"
                                        type="tel"
                                        {...register('phone')}
                                    />
                                </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    Finish Register
                                </Button>
                            </div>

                        </form>
                    </div>
                </div >
            </div >

        </div >
    )
}