'use client'
import { useActionState, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css'
import { signup } from '@/app/actions/auth';
import { TriangleAlert } from 'lucide-react';

export default function UserAuthRegisterFlow() {

    const [state, action, isPending] = useActionState(signup, undefined);

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");

    const fnameErrorRef: any = useRef(null);
    const lnameErrorRef: any = useRef(null);
    const emailErrorRef: any = useRef(null);
    const passwordErrorRef: any = useRef(null);

    const emailRef: any = useRef(null);
    const passwordRef: any = useRef(null);
    const formRef: any = useRef(null);
    const buttonRef: any = useRef(null);

    useEffect(() => {
        fnameErrorRef.current.classList.remove(styles.errorContentFull)
        lnameErrorRef.current.classList.remove(styles.errorContentFull)
        emailErrorRef.current.classList.remove(styles.errorContentFull)
        passwordErrorRef.current.classList.remove(styles.errorContentFullPassword)
        setTimeout(() => {
            if (state?.errors?.firstName && state?.errors?.firstName.length > 0) {
                console.log(state?.errors?.firstName)
                fnameErrorRef.current.classList.add(styles.errorContentFull)
            }
            if (state?.errors?.lastName) {
                lnameErrorRef.current.classList.add(styles.errorContentFull)
            }
            if (state?.errors?.email) {
                emailErrorRef.current.classList.add(styles.errorContentFull)
            }
            if (state?.errors?.password) {
                passwordErrorRef.current.classList.add(styles.errorContentFullPassword)
            }
        }, 1000)

    }, [state])

    return (
        <div>
            <form ref={formRef} action={action}>
                <div className={styles.nameContainer}>
                    <input type="text" className={styles.input} name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstname(e.target.value)} />
                    <input type="text" className={styles.input} name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div ref={fnameErrorRef} className={styles.errorContainer}><TriangleAlert width={20} height={20} /> {state?.errors.firstName}</div>
                <div ref={lnameErrorRef} className={styles.errorContainer}><TriangleAlert width={20} height={20} /> {state?.errors.lastName}</div>
                <input ref={emailRef} disabled={isPending} type="email" id="email" name="email" placeholder="Email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                <div ref={emailErrorRef} className={styles.errorContainer}><TriangleAlert width={20} height={20} /> {state?.errors.email}</div>
                <input disabled={isPending} ref={passwordRef} id="password" name="password" type="password" placeholder="Password" className={styles.input} />
                <div ref={passwordErrorRef} className={styles.errorContainer}><TriangleAlert width={20} height={20} style={{ minWidth: '20px' }} />  {state?.errors?.password && (
                    <div>
                        <p>Password must:</p>
                        <ul>
                            {state.errors.password.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}</div>
                <button ref={buttonRef} className={styles.button}>Create account</button>
            </form>
        </div>
    )
}