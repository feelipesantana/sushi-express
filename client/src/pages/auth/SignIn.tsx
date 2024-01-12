import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, redirect, useNavigate, useNavigation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/services/api'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from '@/components/ui/toaster'
import { useMutation } from '@tanstack/react-query'
import { signIn } from '@/api/sign-in'

const singFormSchema = z.object({
    email: z.string().min(1).email()
})

type SignInForm = z.infer<typeof singFormSchema>
export function SignIn() {
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignInForm>()

    const { mutateAsync: authenticate } = useMutation({
        mutationFn: signIn
    })
    const handleSubmitForm = async (data: SignInForm) => {
        console.log(data.email)
        const email = data.email

        try {
            await authenticate({ email })
            toast({
                title: "Sent Email",
                description: "We sent a link to authenticate by your email!",

            })
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className='p-8 '>
            <Toaster />

            <Button variant={'ghost'} asChild className='absolute right-8 top-8'>
                <Link to="/sing-up">New Local</Link>
            </Button>

            <div className='flex w-[350px] flex-col justify-center gap-10'>
                <div className='flex flex-col gap-2 text-center'>
                    <h1 className='text-2xl font-semibold tracking-tight'>Access Dashboard</h1>
                    <p className='text-sm text-muted-foreground'>Take care of your sales from the partner dashboard</p>
                </div>
                <form className='space-y-4' onSubmit={handleSubmit(handleSubmitForm)}>
                    <div className='space-y-2'>
                        <label className=''>Your email:</label>
                        <Input type="email" placeholder='' className='' {...register("email")} />
                    </div>
                    <Button disabled={isSubmitting} className='w-full' type='submit' >Access</Button>
                </form>
            </div>
        </div>
    )
}